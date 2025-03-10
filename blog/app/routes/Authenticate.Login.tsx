/** @format */

// import from React and Remix
import { FunctionComponent } from 'react';
import { useActionData } from '@remix-run/react';
import type { ActionFunctionArgs } from '@remix-run/node';

// import from utilities
import { formStrategy } from '../utilities/authentication.server';

const action = async ({ request }: ActionFunctionArgs) => {
    try {
        const response = await formStrategy.authenticate(request);
        return response;
    } catch (error) {
        return Response.json(
            { message: 'Error during login', error },
            { status: 500, statusText: 'Error' }
        );
    }
};

const Login: FunctionComponent = () => {
    const actionData = useActionData<typeof action>();

    return (
        <div>
            <div className='flex flex-col items-center py-4'>
                <form
                    method='post'
                    className='grid gap-4'
                >
                    <input
                        type='hidden'
                        name='actionType'
                        value='login'
                    />
                    <label className='input input-bordered flex items-center gap-4 w-[20rem] md:w-[40rem] xl:w-[55rem]'>
                        <span className='text-info'>Email</span>
                        <input
                            type='email'
                            name='email'
                        />
                    </label>
                    <label className='input input-bordered flex items-center gap-4 w-[20rem] md:w-[40rem] xl:w-[55rem]'>
                        <span className='text-info'>Password</span>
                        <input
                            type='password'
                            name='password'
                        />
                    </label>
                    <button
                        type='submit'
                        className='btn btn-primary'
                    >
                        Login
                    </button>
                </form>
            </div>
            <div className='flex flex-col items-center py-4'>
                <p className='text-error'>
                    {actionData ? JSON.parse(actionData).message : null}
                </p>
            </div>
        </div>
    );
};

export default Login;
export { action };
