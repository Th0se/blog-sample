/** @format */

import Link from 'next/link';
import { FunctionComponent } from 'react';

const Header: FunctionComponent = () => {
    return (
        <header className='text-center p-4 bg-base-200'>
            <div className='grid grid-rows-4 lg:flex gap-1 lg:gap-10 lg:items-center'>
                <Link
                    href='/'
                    className='link link-secondary link-hover font-bold text-3xl'
                >
                    Bean Mortar
                </Link>
                <Link
                    href='/categories'
                    className='link link-secondary link-hover'
                >
                    Categories
                </Link>
                <Link
                    href='/about'
                    className='link link-secondary link-hover'
                >
                    About
                </Link>
                <Link
                    href='/authenticate'
                    className='link link-secondary link-hover'
                >
                    Authenticate
                </Link>
            </div>
        </header>
    );
};

export default Header;
