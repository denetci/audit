# Sunucu ve Coolify Kurulumu

Bu notlar, uygulamayi arkadasin sunucusunda calistirmak ve GitHub push sonrasi otomatik guncellemek icindir.

## 1. GitHub Webhook

GitHub reposunda su adimlari izle:

1. `https://github.com/denetci/audit` reposunu ac.
2. `Settings` sekmesine gir.
3. Sol menuden `Webhooks` sec.
4. `Add webhook` dugmesine bas.
5. Alanlari su sekilde doldur:
   - `Payload URL`: Arkadasinin verdigi Coolify webhook adresi
   - `Content type`: `application/json`
   - `Secret`: Arkadasinin verdigi secret degeri
   - `SSL verification`: `Enable SSL verification`
   - `Which events?`: `Just the push event`
   - `Active`: isaretli
6. `Add webhook` dugmesine bas.

Bu ayardan sonra sen `git push origin main` yaptiginda Coolify sunucudaki uygulamayi otomatik yeniden deploy edebilir.

## 2. Coolify Ortam Degiskenleri

Coolify tarafinda uygulamaya su environment degerleri verilmeli:

```text
IDB_HOST=0.0.0.0
IDB_PORT=8000
IDB_DB_PATH=/data/ic_denetim.db
IDB_OPEN_BROWSER=0
IDB_ADMIN_PASSWORD=buraya-guclu-bir-parola-yaz
IDB_OWNER_EMAIL=ramazan.orman@tarimorman.gov.tr
```

`IDB_ADMIN_PASSWORD` ilk ana yonetici hesabinin parolasidir. Ilk calistirmadan once verilirse `ramazan.orman` kullanicisi bu parolayla olusur. Veritabani daha once olustuysa bu degisken mevcut parolayi otomatik degistirmez.

Parolami unuttum taleplerinin mail olarak gidebilmesi icin kurum SMTP bilgileri de tanimlanabilir:

```text
IDB_SMTP_HOST=smtp-sunucu-adresi
IDB_SMTP_PORT=587
IDB_SMTP_USER=smtp-kullanici
IDB_SMTP_PASSWORD=smtp-parola
IDB_MAIL_FROM=icdenetim@tarimorman.gov.tr
```

SMTP bilgileri girilmezse parola yenileme talebi islem gecmisine kaydedilir; ana yonetici kullaniciya Yonetim panelinden yeni parola verebilir.

## 3. Kalici SQLite Volume

SQLite dosyasi container icinde kaybolmamali. Coolify tarafinda kalici volume tanimlanmali:

```text
/data
```

Veritabani dosyasi burada duracak:

```text
/data/ic_denetim.db
```

Bu dosya silinmedigi surece kullanicilarin ekledigi denetim, olur, izin, personel, izleme ve rapor linki kayitlari korunur.

## 4. Mevcut Veritabani Tasima

Senin bilgisayarindaki mevcut SQLite dosyasi:

```text
C:\Users\ramazan.orman\Documents\Codex\2026-08-28\i-denetim-ba-kanl-olarak-y\ic_denetim\ic_denetim.db
```

Canliya gecmeden once bu dosya bir defaya mahsus sunucudaki `/data/ic_denetim.db` konumuna kopyalanabilir.

## 5. Kontrol Adresleri

Uygulama:

```text
http://sunucu-adresi:8000/
```

Saglik kontrolu:

```text
http://sunucu-adresi:8000/health
```

`/health` adresi `{"ok": true}` donuyorsa uygulama calisiyor demektir.

## 6. Kod ve Veri Ayrimi

- Kod, HTML, CSS ve JavaScript GitHub'a gider.
- Kullanici verileri `ic_denetim.db` icinde kalir.
- `ic_denetim.db` GitHub'a gonderilmez.
- Canli sistemde herkes ayni sunucu adresinden girerse ayni SQLite verisini gorur.

## 7. Ilk Giris ve Kullanici Acma

1. Canli uygulama acildiginda kullanici adi `ramazan.orman` ile gir.
2. Parola olarak Coolify'da verilen `IDB_ADMIN_PASSWORD` degerini kullan.
3. Sol menuden `Yonetim` ekranina gir.
4. Uygulamayi kullanacak kisiler icin `Kullanici` yetkisiyle hesap olustur.
5. Gerekirse kendi parolani `Parola Degistir` alanindan guncelle.
6. Duzenli araliklarla `Veritabani Yedegi Indir` dugmesiyle `/data/ic_denetim.db` dosyasinin yedegini al.
