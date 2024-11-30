/** @format */

import '../authenticate.css';
import Link from 'next/link';
import { FunctionComponent } from 'react';

const Register: FunctionComponent = () => {
    return (
        <div className='grid justify-center'>
            <h1 className='text-accent text-center mt-2'>Register</h1>
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
                    <label
                        htmlFor='password'
                        className='authentication_input'
                    >
                        Password:
                        <input
                            type='password'
                            name='password'
                            id='password'
                            className='col-start-3 col-span-3'
                        />
                    </label>
                    <label
                        htmlFor='password'
                        className='form-control'
                    >
                        <div className='label'>
                            <span className='label-text text-info'>
                                Confirm your password
                            </span>
                        </div>
                        <input
                            type='password'
                            name='password'
                            id='password'
                            className='input input-bordered'
                        />
                    </label>
                </form>
                <button className='btn btn-primary mt-2'>Register</button>
            </div>
            <div className='grid grid-cols-2 items-center justify-center mt-2'>
                <Link
                    href='/authenticate'
                    className='link link-primary link-hover'
                >
                    I have an account
                </Link>
                <Link
                    href='/authenticate/recovery'
                    className='link link-primary link-hover text-right'
                >
                    Account recovery
                </Link>
            </div>
        </div>
    );
};

export default Register;
