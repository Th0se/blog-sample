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
        console.log(error);
        return Response.json(
            { message: 'Error during registration', error },
            { status: 400, statusText: 'Error' }
        );
    }
};

const Register: FunctionComponent = () => {
    const actionData = useActionData<typeof action>();

    return (
        <div>
            <div>
                <h2>Register</h2>
                <form method='post'>
                    <input
                        type='hidden'
                        name='actionType'
                        value='register'
                    />
                    <label>
                        Email
                        <input
                            type='email'
                            name='email'
                        />
                    </label>
                    <label>
                        Password
                        <input
                            type='password'
                            name='password'
                        />
                    </label>
                    <label>
                        Confirm password
                        <input
                            type='password'
                            name='passwordConfirm'
                        />
                    </label>
                    <button type='submit'>Register</button>
                </form>
            </div>
            <div>
                <p>{actionData}</p>
            </div>
        </div>
    );
};

export default Register;
export { action };
