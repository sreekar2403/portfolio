# Legacy React components

These are the pre-redesign homepage section components (GSAP/Lenis era:
`HeroSection`, `AboutSection`, `WhatIDoSection`, `TechStackSection`,
`CareerSection`, `WorkSection`, `BlogSection`, `TestimonialsSection`,
`ResearchSection`, `EducationSection`, `ContactSection`, plus shared pieces
like `Navbar`, `LoadingScreen`, `CustomCursor`, `MagneticButton`,
`ProjectCoverflow`, and backgrounds).

Moved here from `src/components/` on the `redesign/portavia-style` branch so
the new theme ships without dead code. Nothing in `src/` imports them.

## To restore

```bash
git mv legacy/react-components/*.jsx src/components/
```

Then point `src/App.jsx` back at the old `HomePage` composition. Full history
is preserved through the rename, so `git log --follow` still works.
