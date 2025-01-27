/** @format */

import { FunctionComponent } from 'react';
import { NavLink, Outlet, useLoaderData, Link } from '@remix-run/react';
import { LoaderFunctionArgs, ActionFunctionArgs } from '@remix-run/node';

import Header from './common/Header';
import {
    formAuthenticationCheck,
    formStrategy,
} from '../utilities/authentication.server';

/*
    Check if user is authenticated. 
    This is needed to decide the rendered page.
    */
const loader = async ({ request }: LoaderFunctionArgs) => {
    try {
        const response = await formAuthenticationCheck(request);
        if (!response) {
            return null;
        }
        if (response.status === 401) {
            return response;
        } else if (response.status === 200) {
            const cloneResponse = response.clone();
            const jsonData = await cloneResponse.json();
            return jsonData;
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

/*
    Handle logout.
*/
const action = async ({ request }: ActionFunctionArgs) => {
    try {
        const response = await formStrategy.authenticate(request);
        return response;
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

const Authenticate: FunctionComponent = () => {
    const loaderData = useLoaderData<typeof loader>();
    if (loaderData.authenticated) {
        return (
            <div>
                <Header />
                <main>
                    <div>
                        <h1>Account</h1>
                    </div>
                    <div className='items-center flex flex-col gap-4'>
                        <div>
                            <p className='text-info'>
                                You are authenticated as a {loaderData.role}
                            </p>
                        </div>
                        {loaderData.role === 'maintainer' ? (
                            <div className='border-accent p-4 grid gap-2 mb-4 bg-accent-content'>
                                <h2 className='pb-[1.5rem]'>Blog management</h2>
                                <Link
                                    to='/maintainer/post/create'
                                    className='btn btn-primary btn-outline'
                                >
                                    Create a post
                                </Link>
                                <button className='btn btn-primary btn-outline'>
                                    Manage posts
                                </button>
                                <button className='btn btn-primary btn-outline'>
                                    Manage comments
                                </button>
                            </div>
                        ) : null}
                        <form method='post'>
                            <input
                                type='hidden'
                                name='actionType'
                                value='logout'
                            />
                            <button
                                type='submit'
                                className='btn btn-warning btn-outline'
                            >
                                Logout
                            </button>
                        </form>
                    </div>
                </main>
            </div>
        );
    } else {
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
                    <Outlet />
                </main>
            </div>
        );
    }
};

export default Authenticate;
export { loader, action };
