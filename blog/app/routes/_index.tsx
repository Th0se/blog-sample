/** @format */

// Library imports.
import { useLoaderData, Link } from '@remix-run/react';
import type { FunctionComponent } from 'react';
import { json } from '@remix-run/node';

// Common components imports.
import Header from './common/Header';

// Import styles.
import './styles/Post.css';

// Utilities imports.
import { latestPost } from '../utilities/db.server';

const loader = async () => {
    try {
        const response = await latestPost();

        if (response.status === 200) {
            return json({
                found: true,
                post: await response.json(),
            });
        } else {
            return json({
                found: false,
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

const Index: FunctionComponent = () => {
    const data = useLoaderData<typeof loader>();

    if (!data.found) {
        return (
            <div>
                <Header />
                <main>
                    <p className='text-center'>Post not found</p>
                </main>
            </div>
        );
    } else {
        return (
            <div>
                <Header />
                <main className='lg:grid lg:grid-cols-5'>
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
                            dangerouslySetInnerHTML={{
                                __html: data.post.value,
                            }}
                            className='pt-[1rem] post-content'
                        ></div>
                    </div>
                </main>
            </div>
        );
    }
};

export default Index;
export { loader };
