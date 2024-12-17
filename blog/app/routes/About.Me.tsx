/** @format */

import { FunctionComponent } from 'react';

const Me: FunctionComponent = () => {
    return (
        <div className='p-2 grid gap-2 lg:col-start-2'>
            <p>
                I am a web developer with experience in creating websites and
                web-based projects since 2022. While not yet a full-time
                professional, I am open for freelance opportunities.
            </p>
            <div className='grid md:grid-cols-2'>
                <div>
                    <p>Languages I use:</p>
                    <ul className='list-disc list-inside'>
                        <li>HTML</li>
                        <li>CSS</li>
                        <li>JavaScript</li>
                        <li>TypeScript</li>
                    </ul>
                </div>
                <div>
                    <p>Technologies I work with:</p>
                    <ul className='list-disc list-inside'>
                        <li>React</li>
                        <li>Vite</li>
                        <li>Remix</li>
                        <li>Tailwind</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Me;
