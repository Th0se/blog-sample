/** @format */

import { FunctionComponent } from 'react';
import { Outlet } from '@remix-run/react';
import Header from './common/Header';

const test: FunctionComponent = () => {
    return (
        <div>
            <Header />
            <main className='bg-base'>
                <p>Hahaha</p>
                <Outlet />
            </main>
        </div>
    );
};

export default test;
