/** @format */

// Library imports.
import type { FunctionComponent } from 'react';
import { useState } from 'react';
import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { json } from '@remix-run/node';

// Common components imports.
import Editor from './common/Editor';

// Utilities imports.
import { updatePost, retrievePost } from '../utilities/db.server';

const loader = async ({ request, params }: LoaderFunctionArgs) => {
    try {
        const id = params.id as string;

        const exist = await retrievePost(request, { id });

        if (exist.status === 404) {
            return json({
                found: false,
            });
        } else if (exist.status === 200) {
            return json({
                found: true,
                post: await exist.json(),
            });
        }
    } catch (error) {
        const response = new Response(
            JSON.stringify({ message: 'Error during post update', error }),
            { status: 400, statusText: 'Error' }
        );

        return response;
    }
};

const action = async ({ request, params }: ActionFunctionArgs) => {
    try {
        const id = params.id as string;
        const response = await updatePost(request, { id });

        return response;
    } catch (error) {
        const response = new Response(
            JSON.stringify({ message: 'Error during post update', error }),
            { status: 400, statusText: 'Error' }
        );

        return response;
    }
};

const EditPost: FunctionComponent = () => {
    const loaderData = useLoaderData<typeof loader>();
    const [title, setTitle] = useState(
        loaderData.found ? loaderData.post.title : ''
    );
    const [content, setContent] = useState(
        loaderData.found ? loaderData.post.value : ''
    );

    if (!loaderData.found) {
        return (
            <div>
                <p className='text-center'>Post not found</p>
            </div>
        );
    } else {
        return (
            <div className='lg:grid lg:grid-cols-5'>
                <div className='grid gap-4 lg:col-start-2 lg:col-span-3'>
                    <input
                        type='text'
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        className='w-full input input-bordered border-accent focus:border-accent focus:border-[3px]'
                    />
                    <Editor
                        content={content}
                        setContent={setContent}
                    />
                    <form method='post'>
                        <input
                            type='hidden'
                            name='title'
                            value={title}
                        />
                        <input
                            type='hidden'
                            name='value'
                            value={content}
                        />
                        <button
                            type='submit'
                            className='btn btn-primary w-full'
                        >
                            Update
                        </button>
                    </form>
                </div>
            </div>
        );
    }
};

export { loader, action };
export default EditPost;
