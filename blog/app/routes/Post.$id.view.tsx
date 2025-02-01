/** @format */

import { FunctionComponent } from 'react';
import { useLoaderData, Link } from '@remix-run/react';
import { json, LoaderFunctionArgs } from '@remix-run/node';

// Utilities imports.
import { retrievePost } from '../utilities/db.server';

// ToDo: use something that's not deprecated.
const loader = async ({ request, params }: LoaderFunctionArgs) => {
    try {
        const id = params.id as string;

        const response = await retrievePost(request, { id });

        if (response.status === 404) {
            return json({
                found: false,
            });
        } else if (response.status === 200) {
            return json({
                found: true,
                post: await response.json(),
            });
        }
    } catch (error) {
        const response = new Response(
            JSON.stringify({ message: 'Error during post retrieval', error }),
            {
                status: 500,
                statusText: 'Error',
            }
        );

        return response;
    }
};

const Post: FunctionComponent = () => {
    const data = useLoaderData<typeof loader>();

    if (!data.found) {
        return (
            <div>
                <p className='text-center'>Post not found</p>
            </div>
        );
    } else {
        return (
            <div className='lg:grid lg:grid-cols-5'>
                <div className='lg:col-start-2 lg:col-span-3'>
                    <h1 className='text-start'>{data.post.title}</h1>
                    <div className='border-y border-solid border-accent py-2'>
                        <p className='text-start'>{data.post.posted}</p>
                        <div className='grid'>
                            <Link
                                to={`/post/${data.post.id}/comments`}
                                className='link link-primary'
                            >
                                Comments
                            </Link>
                            <Link
                                to={`/categories/${data.post.category}`}
                                className='link link-secondary'
                            >
                                #{data.post.category}
                            </Link>
                        </div>
                    </div>
                    <div
                        dangerouslySetInnerHTML={{ __html: data.post.value }}
                        className='pt-[1rem] post-content'
                    ></div>
                </div>
            </div>
        );
    }
};

export default Post;
export { loader };
