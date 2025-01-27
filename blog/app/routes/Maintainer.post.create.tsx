/** @format */

// Library imports.
import { useState, FunctionComponent } from 'react';
import { ActionFunctionArgs } from '@remix-run/node';
import { useActionData } from '@remix-run/react';

// Utilities imports.
import { createPost } from '../utilities/db.server';

// Common components imports.
import Editor from './common/Editor';

// Submit the form.
const action = async ({ request }: ActionFunctionArgs) => {
    try {
        const response = await createPost(request);
        return response;
    } catch (error) {
        const response = new Response(
            JSON.stringify({ message: 'Error during post creation', error }),
            { status: 400, statusText: 'Error' }
        );

        return response;
    }
};

const Create: FunctionComponent = () => {
    const [content, setContent] = useState<string>(
        '<p>Block the text to style it.</p>'
    );
    const [title, setTitle] = useState<string>('');
    const actionData = useActionData<typeof action>();

    return (
        <div className='grid gap-4'>
            <div>
                <input
                    type='text'
                    placeholder='Title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className='w-full input input-bordered border-accent focus:border-accent focus:border-[3px]'
                />
            </div>
            <Editor
                content={content}
                setContent={setContent}
            />
            <form method='post'>
                <input
                    type='hidden'
                    name='content'
                    value={content}
                />
                <input
                    type='hidden'
                    name='title'
                    value={title}
                />
                <button
                    type='submit'
                    className='btn btn-primary btn-outline w-full'
                >
                    Create
                </button>
            </form>
            <div className='text-center'>
                {actionData ? JSON.parse(actionData).message : ''}
            </div>
        </div>
    );
};

export default Create;
export { action };
