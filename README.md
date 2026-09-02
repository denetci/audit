# Ic Denetim Paneli

Bu klasor PyCharm ile acilabilecek basit bir web arayuzu projesidir..

## PyCharm'da calistirma

1. PyCharm'i ac.
2. `File > Open` ile `ic_denetim` klasorunu sec.
3. PyCharm eski bir Python yolu hatasi verirse interpreter olarak sunu sec:
   `.venv\Scripts\python.exe`
4. Sol taraftan `app.py` dosyasini ac.
5. `Run app.py` tusuna bas.
6. Tarayici otomatik acilir. Acilmazsa su adresi ac:
   `http://127.0.0.1:8000/`

## Dosyalar

- `app.py`: Web sayfasini yerel sunucuda calistirir.
- `static/index.html`: Ic denetim panelinin HTML iskeleti.
- `static/style.css`: Renkler, yerlesim ve tum gorsel tasarim.
- `static/script.js`: Arama, yil secimi, denetim islemleri ve olurlar arsivi.

## Denetim programlari

- 2026 denetim programi varsayilan olarak yukludur.
- 2025 denetim programi `2025 Program Cizelgesi Muhurlu.doc` belgesinden aktarilmistir.
- Ust bardaki yil secimi denetim listesini ve denetim turu kutularini secilen yila gore filtreler.

## Olurlar modulu

- Olur numaralari her yil icin 1'den baslar.
- Olur yukle ekraninda secilen yila gore sonraki numara otomatik verilir.
- Olurlar yil, olur no, durum ve arama metniyle filtrelenebilir.
- Bu prototipte secilen dosyanin adi kayda eklenir; kalici dosya yukleme icin sonraki adimda backend kayit yapisi eklenebilir.

## Rapor arsivi

- Arsiv, ust bardaki secili yila gore tum denetimleri listeler.
- Iptal edilen denetimler arsivde gorunur, farkli renkle isaretlenir.
- Secilen denetime su belge turleri yuklenebilir: Olur, Idareye Bildirim Yazisi, Denetim Ekibi Bildirim Yazisi, Rapor, Raporun Onay Oluru, Raporun Idareye Bildirim Yazisi.
- Belgeler icin dosya yuklenebilir veya `bulut.tarimorman.gov.tr` baglantisi kaydedilebilir.
- Ek belgeler desteklenir.

## Izleme faaliyetleri

- Denetimler islem menusunden `Izleme Surecine Al` secilince izleme ekraninda gorunur.
- Izleme ekraninda denetim yili, ilgili birim, denetim adi, sorumlu denetci, bulgu sayilari, son tarih ve durum izlenir.
- Izleme sonuclari tablosu yuklenebilir, indirilebilir, silinebilir veya adlandirilabilir.
- Raporlama ekraninda yil bazli ve tum yillardan devreden acik bulgular grafiklerle gosterilir.

## Personel modulu

- Sol menude Personel basligi altinda Denetciler ve Idari Personel alt modulleri vardir.
- Personel profil sayfasinda bilgiler duzenlenebilir ve kaydedilir.
- Denetciler icin aktif denetim, aktif izleme, egitim ve sertifika alanlari bulunur.
- Idari personel icin gorev ve gorev yaptigi alan bilgileri tutulur.

## Izin Takip modulu

- Sol menude ayri bir Izin Takip modulu olarak acilir.
- Tum izinler, personel izinleri, yillik izin, mazeret izni, rapor, ucretsiz izin, gorev izni ve izin bakiyeleri alt basliklari vardir.
- Izin kayitlari yil, izin turu, durum ve arama metniyle filtrelenebilir.
- Personele yil bazinda izin hakki ve devreden izin tanimlanabilir.
- Kullanilan yillik izin ve kalan izin bakiyesi otomatik hesaplanir.
- Yeni izin kaydi ekleme, kaydi duzenleme, kaydi iptal etme ve silme islemleri desteklenir.
- Personel izin haklari degistirilebilir veya silinebilir.

Ek paket kurulumu gerekmez. Standart Python yeterlidir.
