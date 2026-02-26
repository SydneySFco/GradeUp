# GradeUp – Ralph Loop Operating Model

Bu doküman, GradeUp teslimatının **eksik kalmayacak şekilde iteratif** ilerlemesi ve Steve üzerinden **otonom yürütülebilir** bir operasyon modeli tanımlar.

## 1) Amaç ve Kapsam

- Amaç: GradeUp backlog’unu görünür, ölçülebilir ve kapanış odaklı bir döngüyle bitirmek.
- Kapsam: Planlama → Uygulama → Validasyon → Issue senkronizasyonu → Kapanış.
- Kural: Her döngüde küçük, atomik ve geri alınabilir değişiklikler.

## 2) Ralph Loop Akışı

Her run aşağıdaki sırayı izler:

1. **Scan**
   - `docs/OPEN_GAPS.md` ve issue durumlarını oku.
   - In-Review / Blocked / Open kalemleri sırala.
2. **Select**
   - En yüksek etkili 1 hedef seç (tek iterasyon hedefi).
3. **Build**
   - Hedef için minimum kapsamlı değişiklik yap.
4. **Validate**
   - Build/lint/analytics/issue-sync kapılarını çalıştır.
5. **Sync**
   - Kontrol panelini ve açık gap listesini güncelle.
6. **Close or Escalate**
   - Geçtiyse iterasyonu kapat.
   - Blok varsa eskalasyon formatıyla yükselt.

## 3) Kural Seti

### 3.1 Max iteration per run
- **Varsayılan:** 1 run içinde maksimum **2 iterasyon**.
- **Önerilen:** Operasyonel stabilite için 1 iterasyon/run.
- Neden: İzlenebilirlik, düşük risk, temiz geri dönüş.

### 3.2 Exit condition (run sonlandırma)
Run aşağıdaki durumlarda sonlanır:

- Aktif iterasyonun DoD’i sağlandı ve validation gate’ler geçti.
- Veya blocker oluştu ve eskalasyon kaydı açıldı.
- Veya max iteration sınırına ulaşıldı.

### 3.3 Blocker escalation format
Aşağıdaki şablon zorunludur:

```md
[BLOCKER]
Iteration: Iteration-XXX
Tarih (UTC): YYYY-MM-DD HH:mm
Sahip: Steve
Kategori: Teknik | Erişim | Ürün Kararı | Dış Bağımlılık
Etkisi: Hangi çıktıyı durduruyor?
Kanıt: Komut çıktısı / log / issue linki
İstenen Karar: Kimden, ne kararı gerekiyor?
Geçici Çözüm: Varsa workaround
Sonraki Kontrol: YYYY-MM-DD HH:mm UTC
```

### 3.4 Commit policy (küçük atomik commit)
- Tek commit = tek mantıksal değişiklik.
- Mesaj formatı:
  - `docs(loop): ...`
  - `feat(area): ...`
  - `fix(area): ...`
- Commit öncesi minimum:
  - `npm run build` başarılı olmalı.
  - Değişen dosyalar panel + gap ile senkron olmalı.

## 4) Operasyon Ritim Önerisi

- Günlük en az 1 loop run.
- Her run sonunda:
  - `docs/DELIVERY_CONTROL_PANEL.md` güncelle
  - `docs/OPEN_GAPS.md` güncelle
  - Gerekirse issue status sync çalıştır

## 5) Standart Komut Seti

```bash
# Build gate
npm run build

# (Opsiyonel) Lint gate
npm run lint

# Issue sync gate (token varsa)
node scripts/update_github_issue_statuses.mjs --owner "SydneySFco" --repo "GradeUp"
```

## 6) İlk Aktif Iterasyonu Başlatma Planı (Iteration-001)

### Hedef
In-Review kalan deney işlerini kapatacak canlı veri toplama + karar mekanizmasını devreye almak.

### Dosya/Komut Seviyesi Adımlar
1. `docs/OPEN_GAPS.md`
   - In-Review issue’lar için karar kriterlerini netleştir.
2. `docs/DELIVERY_CONTROL_PANEL.md`
   - Iteration-001 aktif durumunu güncelle.
3. Analytics doğrulama
   - Event isimlerini `docs/ANALYTICS_BASELINE.md` ile çapraz kontrol et.
4. Build
   - `npm run build`
5. (Token mevcutsa) Issue sync
   - `node scripts/update_github_issue_statuses.mjs --owner "SydneySFco" --repo "GradeUp"`
6. Sonuç güncelleme
   - Panelde “Last Completed Iteration” alanını güncelle.

---

Bu modelin kaynak çalışma yüzeyi: `docs/DELIVERY_CONTROL_PANEL.md` + `docs/OPEN_GAPS.md`.
