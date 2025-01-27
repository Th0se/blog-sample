/** @format */

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const createPost = async (request: Request) => {
    const form = await request.formData();
    const title = form.get('title');
    const content = form.get('content');

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
        },
    });

    const response = new Response(
        JSON.stringify({ message: `Post ${post.title} created` }),
        {
            status: 303,
            statusText: 'Created',
            headers: {
                Location: `/post/${post.id}`,
            },
        }
    );

    return response;
};

export default prisma;
export { createPost };
