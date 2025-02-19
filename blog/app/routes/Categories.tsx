/** @format */

// Library imports
import { Outlet } from '@remix-run/react';

// Type imporsts
import type { FunctionComponent } from 'react';

import Header from './common/Header';

const Categories: FunctionComponent = () => {
    return (
        <div>
            <Header />
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default Categories;
