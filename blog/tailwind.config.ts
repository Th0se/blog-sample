/** @format */

import type { Config } from 'tailwindcss';
import daisyUI from 'daisyui';

export default {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx,css}',
    ],
    theme: {
        extend: {
            colors: {
                background: 'var(--background)',
                foreground: 'var(--foreground)',
            },
        },
    },
    plugins: [daisyUI],
    daisyui: {
        themes: [
            'dark',
            'light',
            'fantasy',
            'luxury',
            'coffee',
            'dim',
            'sunset',
            'acid',
            'night',
        ],
    },
} satisfies Config;
