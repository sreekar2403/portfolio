# Editorial Minimal Redesign — Design Spec

Date: 2026-09-27
Branch: `redesign/editorial-minimal`
Reference: https://www.soumendrak.com/
Scope: Full restyle (approved)

## 1. Goal
Replace heavy animated portfolio homepage with calm editorial layout inspired by reference, plus rewrite AI-sounding copy into human first-person tone. Keep all real content (career, projects, blogs, contact) and existing routes.

## 2. What reference does
- Split hero: headline + CTAs left, lede + bio + person card right
- Experience: `From platform architecture to production.` + 3 role cards
- Selected work: 1 featured project with screenshot + 2 writing cards + more link
- Contact: big serif headline + email/LinkedIn links, no form
- Style: off-white paper, hairlines, serif headlines, mono eyebrows, `↗ ↓` markers, no loader/cursor/blobs

## 3. Implementation (Approach A)
- New `src/components/minimal/MinimalHome.jsx` composition:
  - `MinimalNav.jsx` — sticky, name left, 5 text links right
  - `MinimalHero.jsx` — eyebrow, H1 `ML systems, built for production.`, 2 CTAs, lede/bio, photo card
  - `MinimalExperience.jsx` — 3 cards from CAREER condensed
  - `MinimalWork.jsx` — FEATURED FRIDAY + Hive + latest local blog + All writing link
  - `MinimalContact.jsx` — headline, email/LinkedIn/GitHub, footer
- New `src/data/content.human.js` — human-tone strings derived from constants/projects/localBlogs
- New `src/minimal.css` — flat `#fafaf8`, ink `#1a1a18`, hairline `#e7e5e0`, Georgia serif + Inter + JetBrains Mono eyebrow
- `src/App.jsx` — HomePage renders MinimalHome only. Blog routes `/blogs`, `/blog/:slug` unchanged. Old sections kept in repo but unused (cleanup follow-up).
- No GSAP, Lenis, LoadingScreen, CustomCursor, noise, magnetic buttons on homepage.

## 4. Writing style rules applied
- First person, concrete, no hype: replace disruptive/cutting-edge/future AI/redefine with what was built, numbers, and trade-offs.
- Example: Before `Building end-to-end MLOps architectures and fine-tuning disruptive LLMs that redefine scalable SaaS intelligence.` After `I lead ML at Freshworks. I work on triage, replies, evaluation, and inference — the parts that have to work every day in production.`

## 5. Verification
- `npm run lint` clean for new files
- `npm run build` succeeds, dist + 404.html generated
- Manual: `/`, `/#experience`, `/#work`, `/#contact`, `/blogs`, `/blog/:slug` navigate

## 6. Self-review
- No TBD. Scope is single homepage rebuild + copy rewrite.
- Old heavy components intentionally left (not deleted) to keep diff reviewable; follow-up can delete or keep behind flag.
- No contradictions: minimal homepage does not depend on GSAP/Lenis.
