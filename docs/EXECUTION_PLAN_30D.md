# GradeUp Website Revamp — 30 Day Execution Plan

## Sprint Structure
- **Week 1:** Positioning + Hero + CTA system + Trust layer
- **Week 2:** Package-led services + metric-first case studies + contact conversion
- **Week 3:** SEO landing pages + schema + internal linking
- **Week 4:** A/B tests + analytics review + polish

## Board Columns
Backlog → Todo → In Progress → Review → Done

## P0 Milestones
1. Hero value proposition rewritten for founders
2. Dual CTA pattern implemented
3. Trust strip added under hero
4. Service packaging converted to 3 productized offers
5. Case studies converted to metric-first cards
6. Homepage hierarchy aligned to conversion flow
7. Contact form reduced and SLA message added

## Done Criteria (per task)
- Deployed in staging
- Mobile + desktop QA passed
- No console/runtime errors
- Copy approved

## Weekly Cadence
- Monday: scope + priorities
- Wednesday: mid-sprint review
- Friday: demo + KPI snapshot

## Action-3 Closure QA Snapshot (2026-02-25)

### P0 Closure Matrix
| P0 | Status | Evidence |
|---|---|---|
| Hero value proposition rewritten for founders | Done | `src/components/blocks/Hero.tsx` (founder-centric headline/subtitle), commit `eda4d78` |
| Dual CTA pattern implemented | Done | `src/components/blocks/Hero.tsx` (primary + secondary CTA), commit `eda4d78` |
| Trust strip added under hero | Done | `src/components/blocks/TrustStrip.tsx`, `app/page.tsx` section order, commit `eda4d78` |
| Service packaging converted to 3 productized offers | Done | `src/components/blocks/Services.tsx` (MVP Sprint / Scale Pod / Rescue & Stabilize), commit `50c0e66` |
| Case studies converted to metric-first cards | Done | `src/components/blocks/FeaturedWorks.tsx` (`Outcomes` metrics-first cards), commit `50c0e66` |
| Homepage hierarchy aligned to conversion flow | In Review | `app/page.tsx` flow: Hero → TrustStrip → Services → FeaturedWorks → Process → Testimonials → FAQ → Contact; commits `eda4d78`, `50c0e66`, `82acf95` |
| Contact form reduced and SLA message added | Done | `src/components/blocks/Contact.tsx` (short form + “reply within 24 hours”), commit `82acf95` |

### Validation Notes
- Build: ✅ `npm run build` passed (Next.js 16.1.1).
- Lint (out-of-scope): ⚠️ known repo lint issues remain; not fixed in Action-3 scope:
  - `react-hooks/set-state-in-effect` in `src/components/blocks/Hero.tsx`
  - 2 unused-var warnings in `src/components/projects/ProjectsClient.tsx`
