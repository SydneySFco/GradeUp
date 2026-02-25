# Analytics Baseline (GradeUp)

## Core KPIs
- Hero primary CTA click-through rate
- Hero secondary CTA click-through rate
- Contact form submit success rate
- Contact form submit error rate

## Events Implemented
- `hero_headline_variant_view`
- `hero_primary_cta_click`
- `hero_secondary_cta_click`
- `contact_form_submit_success`
- `contact_form_submit_error`

## Event Transport
`src/lib/analytics.ts`
- Pushes events to `window.dataLayer` when available
- Sends GA4 events when `window.gtag` exists

## Weekly Review Checklist
1. Compare hero CTA variant A/B click rates
2. Track contact success/error trend
3. Check mobile vs desktop CTA behavior
4. Feed findings into copy and UI iteration

## Trust Strip Proof Notes (Action-2)
- Trust strip logos under `public/trust/logos/*` are neutral placeholder brands (non-licensed real trademarks).
- Displayed trust metrics are based on aggregated internal delivery records from the rolling last 12 months.
- Public UI copy intentionally states source context to keep claims readable and auditable.
