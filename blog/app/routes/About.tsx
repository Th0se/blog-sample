/** @format */

import { FunctionComponent } from 'react';
import Header from './common/Header';
import { Outlet, NavLink } from '@remix-run/react';

const About: FunctionComponent = () => {
    return (
        <div>
            <Header />
            <main className='bg-base p-2'>
                <div>
                    <h1 className='text-center text-[2rem] md:text-[4rem] lg:text-[5rem]'>
                        About
                    </h1>
                </div>
                <div>
                    <div className='lg:grid lg:grid-cols-5'>
                        <div
                            role='tablist'
                            className='tab_list'
                        >
                            <NavLink
                                to='/about/BeanMortar'
                                role='tab'
                                className={({ isActive }) =>
                                    !isActive ? 'tab' : 'tab active_tab'
                                }
                            >
                                Bean Mortar
                            </NavLink>
                            <NavLink
                                to='/about/me'
                                role='tab'
                                className={({ isActive }) =>
                                    !isActive ? 'tab' : 'tab active_tab'
                                }
                            >
                                Me
                            </NavLink>
                        </div>
                    </div>

                    <div className='lg:grid lg:grid-cols-3'>
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default About;
