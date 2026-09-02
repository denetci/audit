# GitHub Kullanım Notu

Bu klasor su GitHub deposuna baglandi:

```text
https://github.com/denetci/audit.git
```

## Ilk Gonderme

PyCharm Terminal'de bu klasorde calistir:

```powershell
cd C:\Users\ramazan.orman\Documents\Codex\2026-08-28\i-denetim-ba-kanl-olarak-y\ic_denetim
git add .
git commit -m "İlk iç denetim uygulaması"
git push -u origin main
```

Git kullanici bilgisi istenirse bir kez sunlari tanimla:

```powershell
git config --global user.name "Ramazan Orman"
git config --global user.email "github hesabındaki mail adresin"
```

## Her Guncellemeden Sonra

```powershell
git add .
git commit -m "Guncelleme"
git push
```

## Baska Bilgisayarda Devam Etme

```powershell
git clone https://github.com/denetci/audit.git
cd audit
python app.py
```

Mevcut bilgisayarda GitHub'daki son hali almak icin:

```powershell
git pull
```

## Onemli

Git komutlarini ust klasorde degil, `ic_denetim` klasorunun icinde calistir.
