/** @format */

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const createPost = async (request: Request) => {
    const form = await request.formData();
    const title = form.get('title');
    const content = form.get('content');
    const category = form.get('category');

    if (
        typeof title !== 'string' ||
        title.length === 0 ||
        typeof content !== 'string' ||
        content.length === 0
    ) {
        const response = new Response(
            JSON.stringify({ message: 'Incomplete form' }),
            {
                status: 400,
                statusText: 'Bad Request',
            }
        );

        return response;
    } else if (title.length > 100) {
        const response = new Response(
            JSON.stringify({ message: 'Title too long' }),
            {
                status: 400,
                statusText: 'Bad Request',
            }
        );

        return response;
    }

    const existing = await prisma.post.findUnique({
        where: {
            title: title as string,
        },
    });

    if (existing) {
        const response = new Response(
            JSON.stringify({ message: 'Post already exists' }),
            {
                status: 409,
                statusText: 'Conflict',
            }
        );

        return response;
    }

    const post = await prisma.post.create({
        data: {
            title: title as string,
            value: content as string,
            category: category as string,
        },
    });

    const response = new Response(
        JSON.stringify({ message: `Post ${post.title} created` }),
        {
            status: 303,
            statusText: 'Created',
            headers: {
                Location: `/post/${post.id}/view`,
            },
        }
    );

    return response;
};

const retrievePost = async (request: Request, data: { id: string }) => {
    const postId = data.id;
    const post = await prisma.post.findUnique({
        where: {
            id: postId,
        },
    });

    if (!post) {
        const response = new Response(
            JSON.stringify({ message: 'Post does not exist' }),
            {
                status: 404,
                statusText: 'Not Found',
            }
        );

        return response;
    } else {
        const response = new Response(JSON.stringify(post), {
            status: 200,
            statusText: 'OK',
        });

        return response;
    }
};

const latestPost = async () => {
    const latest = await prisma.post.findFirst({
        orderBy: {
            posted: 'desc',
        },
    });

    const response = new Response(JSON.stringify(latest), {
        status: 200,
        statusText: 'OK',
    });

    return response;
};

const countPost = async () => {
    const count = await prisma.post.count();

    const response = new Response(JSON.stringify(count), {
        status: 200,
        statusText: 'OK',
    });

    return response;
};

const gatherPost = async (request: Request, data: { page: number }) => {
    const number = data.page * 12 - 12;

    const gathered = await prisma.post.findMany({
        orderBy: {
            posted: 'desc',
        },
        skip: number,
        take: 12,
    });

    const response = new Response(JSON.stringify(gathered), {
        status: 200,
        statusText: 'OK',
    });

    return response;
};

const deletePost = async (request: Request) => {
    const form = await request.formData();
    const postId = form.get('postId') as string;
    console.log(postId);
    const post = await prisma.post.findUnique({
        where: {
            id: postId,
        },
    });

    if (!post) {
        const response = new Response(
            JSON.stringify({ message: 'Post does not exist' }),
            {
                status: 404,
                statusText: 'Not Found',
            }
        );

        return response;
    } else {
        await prisma.post.delete({
            where: {
                id: postId,
            },
        });

        const response = new Response(
            JSON.stringify({ message: `Post ${post.title} deleted` }),
            {
                status: 410,
                statusText: 'Gone',
                headers: {
                    Location: `/maintainer/post/manage/1`,
                },
            }
        );

        return response;
    }
};

export default prisma;
export {
    createPost,
    retrievePost,
    latestPost,
    gatherPost,
    countPost,
    deletePost,
};
