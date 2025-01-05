/** @format */

import { Authenticator } from 'remix-auth';
import { createCookieSessionStorage } from '@remix-run/node';
import { FormStrategy } from 'remix-auth-form';
import * as argon from 'argon2';
import prisma from './db.server';

const { getSession, commitSession, destroySession } =
    createCookieSessionStorage({
        cookie: {
            name: 'session',
            secure: true,
            httpOnly: true,
            path: '/',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 3,
            secrets: [process.env.session_secret as string],
        },
    });

const authenticator = new Authenticator();

// Authenticate with email and password.
const formStrategy = new FormStrategy(async ({ form, request }) => {
    const actionType = form.get('actionType');
    const email = form.get('email');
    const password = form.get('password');
    const passwordConfirm = form.get('passwordConfirm');
    const cookie = request.headers.get('Cookie');
    const session = await getSession(cookie);

    if (!actionType || !email || !password) {
        const response = new Response(
            JSON.stringify({ message: 'Invalid request' }),
            {
                status: 400,
                statusText: 'Bad Request',
            }
        );

        return response;
    }

    if (actionType === 'login') {
        const user = await prisma.user.findUnique({
            where: {
                email: email as string,
            },
        });

        if (!user) {
            const response = new Response(
                JSON.stringify({ message: 'User does not exist' }),
                {
                    status: 404,
                    statusText: 'Not Found',
                }
            );

            return response;
        }

        const isCorrect = await argon.verify(user.password, password as string);

        if (!isCorrect) {
            const response = new Response(
                JSON.stringify({ message: 'Incorrect password' }),
                {
                    status: 401,
                    statusText: 'Unauthorized',
                }
            );

            return response;
        } else {
            // Create a session.
            session.set('user', user.id);

            const response = new Response(
                JSON.stringify({ message: 'Login successful' }),
                {
                    headers: {
                        'Set-Cookie': await commitSession(session),
                        Location: '/',
                    },
                    status: 302,
                    statusText: 'Redirect',
                }
            );

            return response;
        }
    } else if (actionType === 'register') {
        if (!passwordConfirm || password !== passwordConfirm) {
            const response = new Response(
                JSON.stringify({ message: 'Passwords do not match' }),
                {
                    status: 400,
                    statusText: 'Bad Request',
                }
            );

            return response;
        }

        const existing = await prisma.user.findUnique({
            where: { email: email as string },
        });

        if (existing) {
            const response = new Response(
                JSON.stringify({ message: 'User already exists' }),
                {
                    status: 409,
                    statusText: 'Conflict',
                }
            );

            return response;
        } else {
            const user = await prisma.user.create({
                data: {
                    email: email as string,
                    password: await argon.hash(password as string),
                },
            });

            // Create a session.
            session.set('user', user.id);

            const response = new Response(
                JSON.stringify({ message: 'Registration successful' }),
                {
                    headers: {
                        'Set-Cookie': await commitSession(session),
                        Location: '/',
                    },
                    status: 302,
                    statusText: 'Redirect',
                }
            );

            return response;
        }
    }
});

const formAuthenticationCheck = async (request: Request) => {
    const cookie = request.headers.get('Cookie');
    const session = await getSession(cookie);
    if (!session.has('user')) {
        const response = new Response(
            JSON.stringify({ authenticated: false }),
            {
                status: 401,
                statusText: 'Unauthorized',
            }
        );
        return response;
    } else {
        const user = await prisma.user.findUnique({
            where: { id: session.get('user') as string },
        });
        if (!user) {
            const response = new Response(
                JSON.stringify({ authenticated: false }),
                {
                    status: 401,
                    statusText: 'Unauthorized',
                }
            );
            return response;
        } else {
            const response = new Response(
                JSON.stringify({ authenticated: true }),
                {
                    status: 200,
                    statusText: 'OK',
                }
            );
            return response;
        }
    }
};

authenticator.use(formStrategy, 'formStrategy');

export { formStrategy, formAuthenticationCheck };
