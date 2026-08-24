/**
 * Post-build SEO step.
 *
 * GitHub Pages has no SPA rewrite: a request for /portfolio/blogs has no matching
 * file, so Pages answers with 404.html and an HTTP 404 status. Humans never notice
 * (the SPA boots and renders), but Googlebot sees 404 and drops the URL, which is
 * why every non-root entry in the sitemap failed in Search Console.
 *
 * Fix: write a real index.html at each client route so Pages returns 200, and
 * generate sitemap.xml from the same post list the app renders from.
 */
import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = join(ROOT, 'dist')
const ORIGIN = 'https://sreekar2403.github.io'
const BASE = '/portfolio/'
const SITE = ORIGIN + BASE

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/**
 * Evaluate src/data/localBlogs.js in plain Node so slugs and dates keep a single
 * source of truth. The only Vite-ism in that file is import.meta.env.BASE_URL.
 */
async function loadPosts() {
  const src = readFileSync(join(ROOT, 'src/data/localBlogs.js'), 'utf8')
    .replace(/import\.meta\.env\.BASE_URL/g, JSON.stringify(BASE))
  const url = 'data:text/javascript;base64,' + Buffer.from(src, 'utf8').toString('base64')
  const { LOCAL_BLOG_POSTS } = await import(url)
  if (!Array.isArray(LOCAL_BLOG_POSTS) || LOCAL_BLOG_POSTS.length === 0) {
    throw new Error('build-seo: LOCAL_BLOG_POSTS is empty — refusing to emit an empty sitemap')
  }
  return LOCAL_BLOG_POSTS
}

/** Replace the shell's per-page metadata with this route's. */
function renderHtml(shell, route) {
  const head = [
    `<title>${esc(route.title)}</title>`,
    `<meta name="description" content="${esc(route.description)}" />`,
    `<link rel="canonical" href="${esc(route.url)}" />`,
    `<meta property="og:type" content="${route.image ? 'article' : 'website'}" />`,
    `<meta property="og:url" content="${esc(route.url)}" />`,
    `<meta property="og:title" content="${esc(route.title)}" />`,
    `<meta property="og:description" content="${esc(route.description)}" />`,
    route.image ? `<meta property="og:image" content="${esc(route.image)}" />` : null,
  ].filter(Boolean)

  return shell
    .replace(/[ \t]*<title>[\s\S]*?<\/title>\r?\n?/i, '')
    .replace(/[ \t]*<meta\s+name="description"[^>]*>\r?\n?/i, '')
    .replace(/[ \t]*<meta\s+property="og:(?:title|description|type|url|image)"[^>]*>\r?\n?/gi, '')
    .replace('</head>', `  ${head.join('\n    ')}\n  </head>`)
}

function writeRoute(shell, route) {
  const dir = route.path ? join(DIST, route.path) : DIST
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'index.html'), renderHtml(shell, route), 'utf8')
}

function renderSitemap(routes) {
  const urls = routes
    .map(
      (r) =>
        `  <url>\n` +
        `    <loc>${esc(r.url)}</loc>\n` +
        `    <lastmod>${r.lastmod}</lastmod>\n` +
        `    <priority>${r.priority}</priority>\n` +
        `  </url>`
    )
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

const posts = await loadPosts()
const newest = posts.map((p) => p.date).sort().at(-1)

const routes = [
  {
    path: '',
    url: SITE,
    title: 'PVSM Sreekar — ML Engineer & AI Architect',
    description:
      'PVSM Sreekar — Lead Machine Learning Engineer specializing in MLOps, LLM fine-tuning, and scalable AI systems. Currently at Freshworks.',
    lastmod: newest,
    priority: '1.0',
  },
  {
    path: 'blogs',
    url: `${SITE}blogs/`,
    title: 'Blog — PVSM Sreekar',
    description:
      'Field reports on running and evaluating local LLMs and agentic coding tools on consumer hardware.',
    lastmod: newest,
    priority: '0.8',
  },
  ...posts.map((post) => ({
    path: `blog/${post.id}`,
    url: `${SITE}blog/${post.id}/`,
    title: `${post.title} — PVSM Sreekar`,
    description: post.subtitle,
    image: post.coverImage ? ORIGIN + post.coverImage : null,
    lastmod: post.date,
    priority: '0.7',
  })),
]

const shell = readFileSync(join(DIST, 'index.html'), 'utf8')
for (const route of routes) writeRoute(shell, route)

// Unknown paths still fall back to the SPA shell, but with a 404 status — correct.
copyFileSync(join(DIST, 'index.html'), join(DIST, '404.html'))

writeFileSync(join(DIST, 'sitemap.xml'), renderSitemap(routes), 'utf8')

console.log(`build-seo: ${routes.length} routes, sitemap.xml written`)
