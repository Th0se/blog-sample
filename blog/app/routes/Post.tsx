/** @format */

import { FunctionComponent } from 'react';
import { Outlet } from '@remix-run/react';

import Header from './common/Header';

import './styles/Post.css';

const Post: FunctionComponent = () => {
    return (
        <div>
            <Header />
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default Post;
