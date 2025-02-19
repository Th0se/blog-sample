/** @format */

// Library imports
import { useLoaderData, Link } from '@remix-run/react';
import { json } from '@remix-run/node';

// Type imports
import type { LoaderFunctionArgs, ActionFunctionArgs } from '@remix-run/node';
import type { FunctionComponent } from 'react';
import type post from './types/post';

// Utility imports
import { gatherPost, countPost, deletePost } from '../utilities/db.server';

/* 
    Get the total number of all posts.
    Get at maximum 12 posts for the current page.
*/
const loader = async ({ request, params }: LoaderFunctionArgs) => {
    try {
        const total = await countPost();
        const count = await total.json();

        const page = params.page as string;
        const posts = await gatherPost(request, { page: Number(page) });
        const gatheredPost = await posts.json();

        return json({
            gatheredPost,
            count,
            page,
        });
    } catch (error) {
        const response = new Response(
            JSON.stringify({ message: 'Error during post retrieval', error }),
            {
                status: 400,
                statusText: 'Error',
            }
        );

        return response;
    }
};

// Handle deletion.
const action = async ({ request }: ActionFunctionArgs) => {
    const cloneRequest = request.clone();
    const formData = await cloneRequest.formData();

    try {
        const actionType = formData.get('actionType') as string;
        switch (actionType) {
            case 'delete': {
                const response = await deletePost(request);

                return response;
            }
        }
    } catch (error) {
        const response = new Response(
            JSON.stringify({ message: 'Error during operation', error }),
            {
                status: 400,
                statusText: 'Error',
            }
        );

        return response;
    }
};

const ManagePost: FunctionComponent = () => {
    const loaderData = useLoaderData<typeof loader>();
    const posts = loaderData.gatheredPost;
    const total = loaderData.count;
    const page = loaderData.page;
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
            <p className='text-info text-center pt-[1.5rem] pb-[2rem]'>{`Displaying ${posts.length} of ${total}`}</p>
            <div className='pb-[1rem]'>
                {!lastPage() && !firstPage() ? (
                    <div className='grid grid-cols-2 gap-[1rem]'>
                        <Link
                            to={`/maintainer/post/manage/${Number(page) - 1}`}
                            className='text-end link link-secondary'
                        >
                            Previous page
                        </Link>
                        <Link
                            to={`/maintainer/post/manage/${Number(page) + 1}`}
                            className='link link-secondary'
                        >
                            Next page
                        </Link>
                    </div>
                ) : !lastPage() ? (
                    <div className='grid grid-cols-2 gap-[1rem]'>
                        <Link
                            to={`/maintainer/post/manage/${Number(page) + 1}`}
                            className='col-start-2 link link-secondary'
                        >
                            Next page
                        </Link>
                    </div>
                ) : !firstPage() ? (
                    <div className='grid grid-cols-2 gap-[1rem]'>
                        <Link
                            to={`/maintainer/post/manage/${Number(page) - 1}`}
                            className='text-end link link-secondary'
                        >
                            Previous page
                        </Link>
                    </div>
                ) : null}
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[0.75rem]'>
                {posts.map((post: post) => {
                    return (
                        <div
                            key={post.id}
                            className='grid justify-center card bg-accent-content border-accent border-2 border-solid'
                        >
                            <div className='grid grid-rows-3 card-body'>
                                <p className='card-title'>{post.title}</p>
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

                                <div className='card-actions'>
                                    <Link
                                        to={`/maintainer/post/${post.id}/edit`}
                                        className='btn btn-primary'
                                    >
                                        Edit
                                    </Link>
                                    <form method='post'>
                                        <input
                                            type='hidden'
                                            name='postId'
                                            value={post.id}
                                        />
                                        <input
                                            type='hidden'
                                            name='actionType'
                                            value='delete'
                                        />
                                        <button
                                            type='submit'
                                            className='btn btn-warning'
                                        >
                                            Delete
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ManagePost;
export { loader, action };
