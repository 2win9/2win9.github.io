import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import settings from './src/config/site.json' with { type: 'json' };
import rehypeBase from './scripts/rehype-base.mjs';

const githubPages = process.env.GITHUB_PAGES === 'true';
const [owner = '', repository = ''] = (process.env.GITHUB_REPOSITORY || '').split('/');
const customSite = process.env.SITE_URL || settings.siteUrl;
const site = customSite || (githubPages && owner
  ? `https://${owner}.github.io`
  : 'https://2win9.github.io');
const base = process.env.BASE_PATH ?? (
  githubPages && !customSite && repository.toLowerCase() !== `${owner.toLowerCase()}.github.io`
    ? `/${repository}`
    : '/'
);

export default defineConfig({
  site,
  base,
  output: 'static',
  trailingSlash: 'always',
  vite: { server: { allowedHosts: ['terminal.local'] } },
  integrations: [sitemap()],
  markdown: {
    shikiConfig: { theme: 'github-light' },
    processor: unified({ rehypePlugins: [[rehypeBase, { base }]] }),
  },
});
