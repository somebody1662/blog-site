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
  // 站点地址：当前线上部署为 Cloudflare Workers 静态资源域名；
  // 将来绑定自定义域名后，把这里改为正式域名并重新构建即可。
  site: 'https://blog-site.sport17697287.workers.dev',
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
