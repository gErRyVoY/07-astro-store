// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import netlify from '@astrojs/netlify';
import auth from 'auth-astro';


import db from '@astrojs/db';


import react from '@astrojs/react';


// https://astro.build/config
export default defineConfig({
    vite: {
        plugins: [tailwindcss()]
    },
    output: 'server',
    adapter: netlify(),
    integrations: [auth(), db(), react()]
});