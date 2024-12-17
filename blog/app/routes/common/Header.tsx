/** @format */

import { FunctionComponent } from 'react';
import { NavLink, Link } from '@remix-run/react';

const Header: FunctionComponent = () => {
    return (
        <header className='text-center p-4 bg-base-200'>
            <div className='grid grid-rows-4 lg:flex gap-1 lg:gap-10 lg:items-center'>
                <Link
                    to='/'
                    className='link link-secondary link-hover font-bold text-3xl'
                >
                    Bean Mortar
                </Link>
                <NavLink
                    to='/categories'
                    className={({ isActive }) =>
                        !isActive
                            ? 'link link-secondary link-hover'
                            : 'link link-accent link-hover'
                    }
                >
                    Categories
                </NavLink>
                <NavLink
                    to='/about'
                    className={({ isActive }) =>
                        !isActive
                            ? 'link link-secondary link-hover'
                            : 'link link-accent link-hover'
                    }
                >
                    About
                </NavLink>
                <NavLink
                    to='/authenticate'
                    className={({ isActive }) =>
                        !isActive
                            ? 'link link-secondary link-hover'
                            : 'link link-accent link-hover'
                    }
                >
                    Authenticate
                </NavLink>
            </div>
        </header>
    );
};

export default Header;
