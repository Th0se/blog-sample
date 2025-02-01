/** @format */

// Library imports
import { useLoaderData } from '@remix-run/react';
import { json } from '@remix-run/node';

// Type imports
import type { LoaderFunctionArgs, ActionFunctionArgs } from '@remix-run/node';
import type { FunctionComponent } from 'react';

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

    return (
        <div>
            <h2>Manage Posts</h2>
            <p className='text-info text-center'>{`Displaying ${posts.length} of ${total}`}</p>
            <div>
                {posts.map((post) => {
                    return (
                        <div key={post.id}>
                            <p>{post.title}</p>
                            <p>{post.posted}</p>
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
                    );
                })}
            </div>
        </div>
    );
};

export default ManagePost;
export { loader, action };
