/** @format */

import { FunctionComponent } from 'react';
import './authenticate.css';
import { signIn } from '@/app/auth';

const Authenticate: FunctionComponent = () => {
    const handleGitHubLogin = async () => {
        'use server';
        await signIn('github');
    };
    return (
        <div className='grid justify-center'>
            <h1 className='text-accent text-center mt-2'>Authenticate</h1>
            <div className='grid gap-2'>
                <form className='grid gap-2'>
                    <label
                        htmlFor='email'
                        className='authentication_input'
                    >
                        Email:
                        <input
                            type='email'
                            name='email'
                            id='email'
                            placeholder='Email@address.com'
                            className='col-start-3 col-span-3'
                        />
                    </label>
                </form>
                <button className='btn btn-primary mt-2'>Authenticate</button>
            </div>
            <div className='grid grid-cols-2 items-center justify-center mt-2'>
                <button
                    onClick={handleGitHubLogin}
                    className='btn btn-primary col-span-2'
                >
                    Github
                </button>
            </div>
        </div>
    );
};

export default Authenticate;
