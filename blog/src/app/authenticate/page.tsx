/** @format */

import { FunctionComponent } from 'react';
import Link from 'next/link';
import './authenticate.css';

const Authenticate: FunctionComponent = () => {
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
                </form>
                <button className='btn btn-primary mt-2'>Authenticate</button>
            </div>
            <div className='grid grid-cols-2 items-center justify-center mt-2'>
                <Link
                    href='/authenticate/register'
                    className='link link-primary link-hover'
                >
                    Register
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

export default Authenticate;
