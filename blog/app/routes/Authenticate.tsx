/** @format */

import { FunctionComponent } from 'react';
import { NavLink, Outlet } from '@remix-run/react';
import { LoaderFunctionArgs } from '@remix-run/node';

import Header from './common/Header';
import { formAuthenticationCheck } from '../utilities/authentication.server';

const loader = async ({ request }: LoaderFunctionArgs) => {
    /*
    Check if user is authenticated. 
    If not, return null. 
    If so, redirect to home because authenticated user has no business in the authentication page.
    */
    try {
        const response = await formAuthenticationCheck(request);
        if (response.status === 401) {
            return null;
        } else if (response.status === 200) {
            const final = new Response(
                JSON.stringify({ authenticated: true }),
                {
                    headers: {
                        location: '/',
                    },
                    status: 302,
                    statusText: 'Redirect',
                }
            );
            return final;
        }
    } catch (error) {
        console.log(error);
        return Response.json(
            { message: 'Error during authentication', error },
            { status: 500, statusText: 'Error' }
        );
    }
};

const Authenticate: FunctionComponent = () => {
    return (
        <div>
            <Header />
            <main>
                <div>
                    <h1>Authenticate</h1>
                </div>
                <div>
                    <div className='lg:grid lg:grid-cols-5'>
                        <div
                            role='tablist'
                            className='tab_list'
                        >
                            <NavLink
                                to='/authenticate/login'
                                role='tab'
                                className={({ isActive }) =>
                                    !isActive ? 'tab' : 'tab active_tab'
                                }
                            >
                                Login
                            </NavLink>
                            <NavLink
                                to='/authenticate/register'
                                role='tab'
                                className={({ isActive }) =>
                                    !isActive ? 'tab' : 'tab active_tab'
                                }
                            >
                                Register
                            </NavLink>
                        </div>
                    </div>
                </div>
                <div className='lg:grid lg:grid-cols-3'>
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Authenticate;
export { loader };
