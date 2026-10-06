// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';

// Keystatic 后台路由是服务端渲染，仅在本地开发（npm run dev）时启用；
// 生产构建（npm run build）时禁用，保持纯静态输出、无需 server adapter。
const keystaticEnabled = process.env.KEYSTATIC !== 'false';

// https://astro.build/config
export default defineConfig({
  site: 'https://blog-site.pages.dev',
  integrations: [
    react(),
    mdx(),
    sitemap(),
    ...(keystaticEnabled ? [keystatic()] : []),
  ],

  fonts: [
      {
          provider: fontProviders.local(),
          name: 'Atkinson',
          cssVariable: '--font-atkinson',
          fallbacks: ['sans-serif'],
          options: {
              variants: [
                  {
                      src: ['./src/assets/fonts/atkinson-regular.woff'],
                      weight: 400,
                      style: 'normal',
                      display: 'swap',
                  },
                  {
                      src: ['./src/assets/fonts/atkinson-bold.woff'],
                      weight: 700,
                      style: 'normal',
                      display: 'swap',
                  },
              ],
          },
      },
	],

  vite: {
    plugins: [tailwindcss()],
  },
});
