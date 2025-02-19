/** @format */

import { FunctionComponent } from 'react';
import { Outlet, NavLink } from '@remix-run/react';

const Post: FunctionComponent = () => {
    return (
        <div>
            <div className='lg:grid lg:grid-cols-5'>
                <div
                    role='tablist'
                    className='tab_list'
                >
                    <NavLink
                        to='/maintainer/post/create'
                        role='tab'
                        className={({ isActive }) =>
                            !isActive ? 'tab' : 'tab active_tab'
                        }
                    >
                        Create a post
                    </NavLink>
                    <NavLink
                        to='/maintainer/post/manage/1'
                        role='tab'
                        className={({ isActive }) =>
                            !isActive ? 'tab' : 'tab active_tab'
                        }
                    >
                        Manage posts
                    </NavLink>
                </div>
            </div>
            <Outlet />
        </div>
    );
};

export default Post;
