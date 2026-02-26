# GradeUp – Open Gaps

> Son güncelleme (UTC): 2026-02-26 09:04
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
| Run A/B test for primary CTA copy | Open (In-Review’dan kapanış bekliyor) | `scripts/update_github_issue_statuses.mjs` içinde bu issue için `status:In-Review` + not: “awaiting live data” | Canlı trafikten yeterli örneklem topla, CTA CTR farkı için kapanış kararı ver (Done veya devam) |
| Run A/B test for hero headline variant A vs B | Open (In-Review’dan kapanış bekliyor) | `scripts/update_github_issue_statuses.mjs` içinde `status:In-Review` + not: “awaiting live data” | Varyant performansını ölç, kazanan varyantı sabitle, issue’yu Done’a çek |
| Analytics baseline event doğrulaması | In-Progress | `docs/ANALYTICS_BASELINE.md` event listesi mevcut (`hero_*`, `contact_form_*`) | Eventlerin canlıda aktığına dair kanıtı (ölçüm ekranı/log) ekle |
| Issue status panel senkronu | Open | Senkron komutu tanımlı: `scripts/update_github_issue_statuses.mjs` | Token ile komutu çalıştır, issue body + label güncellemelerinin güncel çıktısını kaydet |
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
