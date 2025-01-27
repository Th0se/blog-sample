/** @format */

import { FunctionComponent } from 'react';
import { Outlet } from '@remix-run/react';
import { LoaderFunctionArgs } from '@remix-run/node';

// Import common components.
import Header from './common/Header';

// Import server utilities.
import { formAuthenticationCheck } from '../utilities/authentication.server';

/*
    Check if user is authenticated.
    If not, redirect to login page.
    If user is not  a maintainer, redirect to home page.
*/
const loader = async ({ request }: LoaderFunctionArgs) => {
    try {
        const response = await formAuthenticationCheck(request);
        if (!response || response.status === 401 || response.status === 400) {
            const response = new Response(
                JSON.stringify({ message: 'Unauthorized' }),
                {
                    status: 303,
                    statusText: 'redirect',
                    headers: {
                        Location: '/authenticate',
                    },
                }
            );

            return response;
        } else if (response.status === 200) {
            const jsonData = await response.json();

            if (jsonData.role === 'user') {
                const response = new Response(
                    JSON.stringify({ message: 'Forbidden' }),
                    {
                        status: 303,
                        statusText: 'redirect',
                        headers: {
                            Location: '/',
                        },
                    }
                );

                return response;
            } else {
                return null;
            }
        }
    } catch (error) {
        const response = new Response(
            JSON.stringify({ message: 'Error during authentication', error }),
            {
                status: 500,
                statusText: 'Error',
            }
        );

        return response;
    }
};

const Maintainer: FunctionComponent = () => {
    return (
        <div>
            <Header />
            <main>
                <div>
                    <h1>{`Maintainer's console`}</h1>
                </div>
                <Outlet />
            </main>
        </div>
    );
};

export default Maintainer;
export { loader };
