# PVSM Sreekar — Portfolio

Personal portfolio and blog, deployed on GitHub Pages.

## Tech Stack

- **React 19** + **Vite 7** (JavaScript)
- **Tailwind CSS 3** with custom theme
- **GSAP** + **Framer Motion** for animations
- **Lenis** for smooth scrolling
- **react-router-dom 7** with basename `/portfolio`

## Sections

Hero · About · What I Do · Tech Stack · Work · Research · Career · Education · Blog · Testimonials · Contact

## Blog Posts

Long-form write-ups on running local LLMs on consumer hardware:

- **Ornith 1.5** — 35B hybrid-MoE (gated linear + full attention) audited across six build tasks
- **Bonsai 27B** — 27B Qwen3.6 model on an 8 GB RTX 4060 laptop
- **Nemotron 3.5 Lightning** — 30B hybrid Mamba-2 model via Ollama
- **Ornith 27B** — reasoning failure analysis

## Getting Started

```bash
npm install
npm run dev
```

## Commands

```bash
npm run dev        # Vite dev server
npm run build      # Production build (also copies dist/index.html → dist/404.html for SPA routing)
npm run lint       # ESLint
npm run preview    # Preview production build
```

## Deployment

GitHub Pages — the `build` script copies `dist/index.html` to `dist/404.html` for SPA client-side routing under the `/portfolio/` base path.
