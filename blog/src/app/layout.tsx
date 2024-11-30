/** @format */

import Header from './Header';
import { FunctionComponent, ReactNode } from 'react';
import './globals.css';

const RootLayout: FunctionComponent<{ children: ReactNode }> = ({
    children,
}) => {
    const theme = 'dark';
    // Todo: Implement a function to fetch user preference from the database upon loading.
    return (
        <html lang='en'>
            <body data-theme={theme}>
                <Header />
                <main className='p-2'>{children}</main>
            </body>
        </html>
    );
};

export default RootLayout;
