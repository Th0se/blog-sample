/** @format */

import { FunctionComponent } from 'react';
import Header from './common/Header';
import { Outlet, NavLink } from '@remix-run/react';

const About: FunctionComponent = () => {
    return (
        <div>
            <Header />
            <main>
                <div>
                    <h1>About</h1>
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
