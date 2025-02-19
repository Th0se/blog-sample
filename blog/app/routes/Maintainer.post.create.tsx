/**
 * @format
 */

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
        console.log(error);
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
    const [category, setCategory] = useState<string>('plants');
    const [subCategory, setSubCategory] = useState<string>('Succulents');
    const actionData = useActionData<typeof action>();

    const handleCategoryChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        console.log(event.target.value);
        setCategory(event.target.value);
        if (event.target.value === 'Plants') {
            setSubCategory('Succulents');
        } else {
            setSubCategory('Boiled');
        }
    };

    return (
        <div className='lg:grid lg:grid-cols-5'>
            <div className='grid gap-4 lg:col-start-2 lg:col-span-3'>
                <input
                    type='text'
                    placeholder='Title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className='w-full input input-bordered border-accent focus:border-accent focus:border-[3px]'
                />
                <label className='form-control'>
                    <div className='label'>
                        <span className='label-text text-info'>
                            Select a category
                        </span>
                    </div>
                    <select
                        className='select select-bordered w-full border-accent focus:border-accent focus:border-[3px]'
                        defaultValue={category}
                        onChange={handleCategoryChange}
                    >
                        <option>Plants</option>
                        <option>Meals</option>
                    </select>
                </label>
                <label className='form-control'>
                    <div className='label'>
                        <span className='label-text text-info'>
                            Select a subcategory
                        </span>
                    </div>
                    <select
                        className='select select-bordered w-full border-accent focus:border-accent focus:border-[3px]'
                        defaultValue={subCategory}
                        onChange={(e) => {
                            setSubCategory(e.target.value);
                        }}
                    >
                        {category === 'plants' ? (
                            <>
                                <option>Succulents</option>
                                <option>Orchids</option>
                                <option>Annuals</option>
                                <option>Biennials</option>
                                <option>Vines</option>
                                <option>Herbs</option>
                            </>
                        ) : (
                            <>
                                <option>Boiled</option>
                                <option>Baked</option>
                                <option>Grilled</option>
                                <option>Roasted</option>
                                <option>Fried</option>
                                <option>Steamed</option>
                                <option>Raw</option>
                            </>
                        )}
                    </select>
                </label>
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
                    <input
                        type='hidden'
                        name='category'
                        value={subCategory}
                    />
                    <button
                        type='submit'
                        className='btn btn-primary w-full'
                    >
                        Create
                    </button>
                </form>
                <div className='text-center'>
                    {actionData ? JSON.parse(actionData).message : ''}
                </div>
            </div>
        </div>
    );
};

export default Create;
export { action };
