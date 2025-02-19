/** @format */

// Library imports

import { json, Link, useLoaderData } from '@remix-run/react';

// Type imports
import type { FunctionComponent } from 'react';
import type { LoaderFunctionArgs } from '@remix-run/node';
import type post from './types/post';

// Utilities imports
import { countCategory, gatherCategory } from '../utilities/db.server';

/* 
    Get the total number of all meals of the specified category..
    Get at maximum 12 meals for the current page.
*/
const loader = async ({ request, params }: LoaderFunctionArgs) => {
    const category = params.category as string;
    const page = params.page as string;
    try {
        const posts = await gatherCategory(request, {
            category,
            page: Number(page),
        });
        const gatheredPost = await posts.json();

        const count = await countCategory({ category });
        const total = await count.json();

        return json({ gatheredPost, total, page, category });
    } catch (error) {
        const response = new Response(
            JSON.stringify({
                message: 'Error during category retrieval',
                error,
            }),
            { status: 400, statusText: 'Error' }
        );

        return response;
    }
};

const DefaultComponent: FunctionComponent = () => {
    const { gatheredPost, total, page, category } =
        useLoaderData<typeof loader>();
    const lastPage = () => {
        if (page * 12 < total) {
            return false;
        } else {
            return true;
        }
    };
    const firstPage = () => {
        if (page > 1) {
            return false;
        } else {
            return true;
        }
    };
    return (
        <div>
            <p className='text-info text-center pt-[1.5rem] pb-[2rem]'>
                {`Displaying ${gatheredPost.length} of ${total}`}
            </p>
            <div className='pb-[1rem]'>
                {!lastPage() && !firstPage() ? (
                    <div className='grid grid-cols-2 gap-[1rem]'>
                        <Link
                            to={`/categories/meals/${category}/${
                                Number(page) - 1
                            }`}
                            className='text-end link link-secondary'
                        >
                            Previous page
                        </Link>
                        <Link
                            to={`/categories/meals/${category}/${
                                Number(page) + 1
                            }`}
                            className='link link-secondary'
                        >
                            Next page
                        </Link>
                    </div>
                ) : !lastPage() ? (
                    <div className='grid grid-cols-2 gap-[1rem]'>
                        <Link
                            to={`/categories/meals/${category}/${
                                Number(page) + 1
                            }`}
                            className='col-start-2 link link-secondary'
                        >
                            Next page
                        </Link>
                    </div>
                ) : !firstPage() ? (
                    <div className='grid grid-cols-2 gap-[1rem]'>
                        <Link
                            to={`/categories/meals/${category}/${
                                Number(page) - 1
                            }`}
                            className='text-end link link-secondary'
                        >
                            Previous page
                        </Link>
                    </div>
                ) : null}
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[0.75rem]'>
                {gatheredPost.map((post: post) => {
                    return (
                        <div
                            key={post.id}
                            className='grid justify-center card bg-accent-content border-accent border-2 border-solid'
                        >
                            <div className='grid grid-rows-2 card-body'>
                                <Link
                                    to={`/post/${post.id}/view`}
                                    className='card-title link link-primary link-hover'
                                >
                                    {post.title}
                                </Link>
                                <p>
                                    {new Intl.DateTimeFormat('en-GB', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        second: '2-digit',
                                        timeZoneName: 'short',
                                    }).format(new Date(post.posted))}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default DefaultComponent;
export { loader };
