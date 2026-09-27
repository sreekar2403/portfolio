# Portavia-Style Rebuild — Design Spec

Date: 2026-09-27
Branch: `redesign/portavia-style`
Reference: https://portavia.framer.website/ (themes, patterns, animations replicated with original code; all content is Sreekar's)
Supersedes: `redesign/editorial-minimal` (scrapped per user request)

## Design read

Developer portfolio overhaul for recruiters and collaborators, with a bold Framer-template language (condensed display type, sticky-stacking cards, accordions, count-ups), leaning toward Tailwind + Framer Motion + Antonio.

Dials: DESIGN_VARIANCE 6 / MOTION_INTENSITY 5 / VISUAL_DENSITY 3.

## Replicated from reference (patterns, not assets)

- Theme: white bg, ink #303030, accent #5E67E6, card #F5F5F5, green #0BDE66 dot. Antonio 700 display + Inter body.
- Floating pill nav (avatar + "Available for work" + green dot + purple hamburger) opening a full-screen ink overlay menu with numbered Antonio links.
- Hero: "Hi, I'm ..." + giant split Antonio headline around a portrait card with floating purple icon buttons.
- Numbered services accordion (single-open, plus-to-minus icon, height animation).
- About on gray rounded panel: bio, count-up stats, contact rows, socials, "My Story" pill (links resume).
- Featured projects as sticky-stacking full-bleed rounded cards (image + purple tag + Antonio title + excerpt + CTA).
- Testimonials as cards with initials avatars plus two stat blocks with count-ups.
- Numbered FAQ accordion, 2-col insight cards, contact section (portrait + mailto form), ink footer columns.
- Motion: load-in rises, whileInView reveals, accordions, count-ups, overlay menu, CSS float buttons. All gated by useReducedMotion. No scroll-hijack, no marquees, no fake screenshots.

## Content mapping (all Sreekar)

Hero MACHINE/LEARNING, 4 service groups from career data, stats 5+/10+/1M+, 3 real projects with screenshots, 3 existing testimonials, 6 ML FAQs, 2 latest local-model posts, mailto contact form. Blog routes kept and reskinned (Antonio headers, purple tags, article styles).

## Verification

- `npx eslint` on touched dirs: clean.
- `npm run build`: succeeds, 8 routes + sitemap.
- Notes: `npm install` was required (framer-motion was declared but never installed). Zero em/en-dashes in src preserved from prior pass.
