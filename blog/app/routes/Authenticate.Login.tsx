/** @format */

// import from React and Remix
import { FunctionComponent } from 'react';
import { useActionData } from '@remix-run/react';
import type { ActionFunctionArgs } from '@remix-run/node';

// import from utilities
import { formStrategy } from '../utilities/authentication.server';

const action = async ({ request }: ActionFunctionArgs) => {
    console.log(request);
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
            <div>
                <h2>Login</h2>
                <form method='post'>
                    <input
                        type='hidden'
                        name='actionType'
                        value='login'
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
                    <button type='submit'>Login</button>
                </form>
            </div>
            <div>
                <p>{actionData}</p>
            </div>
        </div>
    );
};

export default Login;
export { action };
