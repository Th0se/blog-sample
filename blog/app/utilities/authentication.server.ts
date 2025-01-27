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
        if (actionType !== 'logout') {
            const response = new Response(
                JSON.stringify({ message: 'Incomplete form' }),
                {
                    status: 400,
                    statusText: 'Bad Request',
                }
            );

            return response;
        } else {
            const response = new Response(
                JSON.stringify({ message: 'Logout successful' }),
                {
                    headers: {
                        'Set-Cookie': await destroySession(session),
                        Location: '/',
                    },
                    status: 302,
                    statusText: 'Found',
                }
            );

            return response;
        }
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
            session.set('role', user.role);

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
        // Validate email and password.
        const validate = (() => {
            const emailRegex =
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            const isValidEmail = (email: string) => {
                return emailRegex.test(email);
            };

            const isPasswordSecure = (password: string): boolean | string => {
                // At least 12 characters (modern standard for strong passwords)
                const minLength = 12;

                // Regular expression checks for key components of password security
                const hasUppercase = /[A-Z]/.test(password); // At least one uppercase letter
                const hasLowercase = /[a-z]/.test(password); // At least one lowercase letter
                const hasDigit = /\d/.test(password); // At least one number
                const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>_\-[\]\\/`~]/.test(
                    password
                );
                // Special characters set
                const hasNoSpaces = !/\s/.test(password); // Should not include spaces

                // Password must not use easily guessable patterns
                const isCommonPassword =
                    /1234|password|qwerty|1111|letmein/i.test(password);
                const hasSequentialChars = /(abc|def|ghi|123|987|xyz)/i.test(
                    password
                );
                if (password.length < minLength) {
                    return 'Password must be at least 12 characters';
                }
                if (!hasUppercase) {
                    return 'Password must contain at least one uppercase letter';
                }
                if (!hasLowercase) {
                    return 'Password must contain at least one lowercase letter';
                }
                if (!hasDigit) {
                    return 'Password must include at least a number';
                }
                if (!hasSpecialChar) {
                    return 'Password must include at least a special character';
                }
                if (!hasNoSpaces) {
                    return 'Password must not include spaces';
                }
                if (isCommonPassword) {
                    return 'Password is too common';
                }
                if (hasSequentialChars) {
                    return 'Password is too sequential';
                }

                return true;
            };

            return { isValidEmail, isPasswordSecure };
        })();

        // Reject invalid email and password.
        if (!validate.isValidEmail(email as string)) {
            const response = new Response(
                JSON.stringify({ message: 'Invalid email' }),
                {
                    status: 400,
                    statusText: 'Bad Request',
                }
            );

            return response;
        } else if (validate.isPasswordSecure(password as string) !== true) {
            const response = new Response(
                JSON.stringify({
                    message: validate.isPasswordSecure(password as string),
                }),
                {
                    status: 400,
                    statusText: 'Bad Request',
                }
            );

            return response;
        }

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
                    role: 'user',
                },
            });

            // Create a session.
            session.set('user', user.id);
            session.set('role', user.role);

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

// Check if a user is authenticated with email and password.
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
    }

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
    }

    if (session.get('role') !== user.role) {
        const response = new Response(
            JSON.stringify({ authenticated: false }),
            {
                status: 400,
                statusText: 'Bad Request',
            }
        );
        return response;
    } else if (session.get('role') === 'maintainer') {
        const response = new Response(
            JSON.stringify({ authenticated: true, role: 'maintainer' }),
            {
                status: 200,
                statusText: 'OK',
            }
        );
        return response;
    } else if (session.get('role') === 'user') {
        const response = new Response(
            JSON.stringify({ authenticated: true, role: 'user' }),
            {
                status: 200,
                statusText: 'OK',
            }
        );
        return response;
    }
};

authenticator.use(formStrategy, 'formStrategy');

export { formStrategy, formAuthenticationCheck };
