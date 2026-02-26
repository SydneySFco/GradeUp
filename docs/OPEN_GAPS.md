# GradeUp – Open Gaps

> Son güncelleme (UTC): 2026-02-26 09:07
> Referans: `docs/DELIVERY_CONTROL_PANEL.md`, `scripts/update_github_issue_statuses.mjs`

Bu doküman kalan işleri issue-bazlı ve kanıt/evidence odaklı takip eder.

## Durum Anahtarı
- **Open**: Başlanmadı veya net kapanış kanıtı yok
- **In-Progress**: Aktif çalışılıyor
- **Blocked**: Dış bağımlılık/karar engeli var
- **Done**: Kapanış kanıtı mevcut

## Gap Listesi

| Issue / İş | Durum | Kanıt (Evidence) | Eksik / Sonraki Adım |
|---|---|---|---|
| Run A/B test for primary CTA copy (#19) | Blocked | Kod + tracking hazır: `src/components/blocks/Hero.tsx` (`hero_cta_variant`, `hero_primary_cta_click`), taşıma: `src/lib/analytics.ts`, issue mapping: `scripts/update_github_issue_statuses.mjs` → `status:Blocked` | Canlı trafikte minimum örneklem eşiği dolunca CTR kararını ver, kazanan copy’yi sabitle ve Done’a çek |
| Run A/B test for hero headline variant A vs B (#18) | Blocked | Kod + tracking hazır: `src/components/blocks/Hero.tsx` (`hero_headline_variant`, `hero_headline_variant_view`), baseline: `docs/ANALYTICS_BASELINE.md`, issue mapping: `scripts/update_github_issue_statuses.mjs` → `status:Blocked` | Canlı trafikte minimum örneklem eşiği dolunca kazanan headline’ı sabitle ve Done’a çek |
| Analytics baseline event doğrulaması | In-Progress | Event sözlüğü: `docs/ANALYTICS_BASELINE.md`; event transport: `src/lib/analytics.ts`; event tetik noktaları: `Hero.tsx`, `Contact.tsx` | Eventlerin canlıda aktığına dair ölçüm ekranı/log kanıtı ekle |
| Issue status panel senkronu | Done | Komut çalıştırıldı: `node scripts/update_github_issue_statuses.mjs --owner "SydneySFco" --repo "GradeUp"` (env export ile), #18/#19 Blocked olarak güncellendi | Sonraki iterasyonda sadece canlı veri sonrası Done geçişi için tekrar çalıştır |
| Lint uyarılarının temizlenmesi (opsiyonel kalite kapanışı) | Open | `docs/EXECUTION_PLAN_30D.md` Validation Notes: `src/components/projects/ProjectsClient.tsx` içinde 2 unused-var uyarısı | Kapsam uygunsa uyarıları temizle; değilse teknik borç kaydı aç |

## In-Review Odaklı Net Kapanış Kriteri (öneri)

A/B test issue’larının Done’a çekilmesi için minimum:
1. En az 7 gün canlı veri veya anlamlı örneklem eşiği.
2. Karar metriği: Primary CTA CTR / Headline variant CTR.
3. Karar çıktısı:
   - Kazanan varyant uygulandıysa **Done**,
   - Veri yetersizse açık gerekçe ile **Blocked** veya süre uzatmalı **In-Progress**.

## Iteration-001 Planı (başlatma)

**Hedef:** In-Review kalan 2 issue’nun kapanış yolunu netleştirip operasyonu ölçülebilir hale getirmek.

### Adım adım (dosya/komut seviyesi)
1. `docs/DELIVERY_CONTROL_PANEL.md` içinde Iteration-001 alanlarını aktif tut.
2. `docs/ANALYTICS_BASELINE.md` ile event sözlüğünü doğrula.
3. Build gate çalıştır:
   ```bash
   npm run build
   ```
4. (Token varsa) Issue sync:
   ```bash
   node scripts/update_github_issue_statuses.mjs --owner "SydneySFco" --repo "GradeUp"
   ```
5. Sonuçları bu dosyada ilgili satırların “Kanıt” kolonuna ekle.
6. Kriterler sağlanırsa ilgili issue satırını **Done** yap ve panelde Last Completed Iteration güncelle.
