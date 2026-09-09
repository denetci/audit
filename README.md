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
- `SUNUCU_KURULUM.md`: Coolify, webhook ve canli SQLite kurulumu notlari.

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
- Her denetim icin tek bir `bulut.tarimorman.gov.tr` klasor linki kaydedilir.
- Kullanici bu linkten ilgili denetimin olur, yazi, rapor ve eklerini bulutta gorur veya indirir.

## Izleme faaliyetleri

- Denetimler islem menusunden `Izleme Surecine Al` secilince izleme ekraninda gorunur.
- Izleme ekraninda denetim yili, ilgili birim, denetim adi, sorumlu denetci, bulgu sayilari, son tarih ve durum izlenir.
- Izleme sonuclari tablosu yuklenebilir, indirilebilir, silinebilir veya adlandirilabilir.
- Raporlama ekraninda yil bazli ve tum yillardan devreden acik bulgular grafiklerle gosterilir.

## Personel modulu

- Sol menude Personel basligi altinda Denetciler ve Idari Personel alt modulleri vardir.
- Ana yonetici Personel ekranindan yeni kayit ekleyebilir, kayit silebilir ve tablo basliklarindan siralama yapabilir.
- Personel profil sayfasinda bilgiler duzenlenebilir ve kaydedilir.
- Denetciler icin aktif denetim, aktif izleme, egitim ve sertifika alanlari bulunur.
- Idari personel icin gorev ve gorev yaptigi alan bilgileri tutulur.

## Izin Takip modulu

- Sol menude ayri bir Izin Takip modulu olarak acilir.
- Personel izinleri ve gorev durumu alt basliklari vardir; izin turleri kayit satirinda ayrica gosterilir.
- Gorev Durumu ekraninda personelin gorev yeri, goreve baslama tarihi, donus durumu ve yillik gorev gecmisi tutulur.
- Izin personel listesi Personel modulundeki Denetciler ve Idari Personel kayitlarindan otomatik olusur.
- Izin kaydi ve izin hakki ekranlarinda personel secilince unvan ve birim bilgisi otomatik gelir.
- Izin ekraninda bugun izinde olan personel ve baslama tarihi yaklasan izinler ozet kartlarda gosterilir.
- Izin kayitlari yil, izin turu, durum ve arama metniyle filtrelenebilir.
- Personele yil bazinda izin hakki ve devreden izin tanimlanabilir.
- Kullanilan yillik izin ve kalan izin bakiyesi otomatik hesaplanir.
- Yeni izin kaydi ekleme, kaydi duzenleme, kaydi iptal etme ve silme islemleri desteklenir.
- Personel izin haklari degistirilebilir veya silinebilir.

Ek paket kurulumu gerekmez. Standart Python yeterlidir.

## Ortak veri / SQLite

- Uygulama calistiginda `ic_denetim.db` adinda SQLite veritabani olusturulur.
- Ilk acilista Ramazan ORMAN icin otomatik ana yonetici hesabi olusur: kullanici adi `ramazan.orman`.
- Canli sunucuda ilk calistirmadan once `IDB_ADMIN_PASSWORD` degeri verilerek admin parolasi belirlenmelidir.
- Denetimler, olurlar, izleme kayitlari, izinler, personel bilgileri ve belge/link kayitlari bu veritabanina ayri kayitlar halinde yazilir.
- Canli sunucuda `IDB_DB_PATH` ile veritabani yolu kalici volume'a alinabilir.
- Canli sunucuda tum kullanicilar ayni `ic_denetim.db` dosyasini kullandigi icin ayni verileri gorur.
- Farkli kullanicilar farkli modullerde islem yaptiginda tum veri paketi ezilmez; tarayici sadece degisen kayitlari sunucuya gonderir.
- Silinen kayitlar da veritabanina ayrica bildirilir, bu nedenle baska kullanicinin yeni ekledigi kayitlar toplu kayit sirasinda kaybolmaz.
- Ayni kaydi iki kullanici ayni anda degistirirse son kaydeden kullanicinin degisikligi gecerli olur.
- `ic_denetim.db` GitHub'a gonderilmez; her ortam kendi veritabani dosyasini kullanir.
- Canli sunucuda bu dosyanin yedegi duzenli alinmalidir.

## Yonetim paneli

- Ana yonetici sol menudeki `Yonetim` ekranindan kullanici olusturabilir.
- Ana yonetici hesabi Ramazan ORMAN'a aittir; silinemez, pasife alinamaz ve yetkisi dusurulemez.
- `Yonetici` yetkisi yedek alabilir ve yonetim ekranini gorebilir; kullanici rol/durum/parola/silme islemleri sadece ana yonetici tarafindan yapilir.
- Normal `Kullanici` yetkisi uygulamada kayit ekleyebilir ve duzenleyebilir.
- `Sadece Goruntuleme` yetkisi kayitlari gorebilir ama veritabanina degisiklik kaydedemez.
- Kullanici olustururken e-posta zorunludur.
- Giris ekranindaki `Parolami unuttum` alani e-posta ile talep alir; SMTP ayari varsa talep ana yonetici mailine gonderilir.
- `Veritabani Yedegi Indir` dugmesi mevcut SQLite dosyasinin anlik kopyasini indirir.
- Yonetici kendi parolasini `Parola Degistir` alanindan guncelleyebilir.
- Oturum acma, kullanici olusturma, veri kaydetme ve yedek alma islemleri islem gecmisine yazilir.
- Yerel gelistirme icin `ramazan.orman` hesabinin varsayilan parolasi `admin123` olur; canlida bu parola kullanilmamali, `IDB_ADMIN_PASSWORD` ile degistirilmelidir.

## Mevcut tarayici verilerini SQLite'a aktarma

Canliya gecmeden once veriler eski tarayici hafizasinda kaldiysa:

1. Uygulamayi verilerin gorundugu bilgisayarda ac.
2. Ust kisimdaki `Yerel Verileri SQLite'a Aktar` dugmesine bas.
3. Onay ver.
4. Sayfayi yenile ve kayitlarin gorundugunu kontrol et.

Bu islem o tarayicidaki denetim, olur, izleme, izin, personel ve belge/link kayitlarini ortak SQLite veritabanina yazar.


## Modül yetkileri

Ana yönetici, Yönetim > Kullanıcılar > Modül Yetkileri bölümünden her kullanıcı için
Erişim yok / Görüntüleme / Görüntüleme ve değişiklik seçip kullanıcının Kaydet düğmesine basar.
Personel İzinleri ve Görev Durumu birbirinden bağımsızdır. Yeni hesaplar erişimsiz oluşturulur;
mevcut hesaplar ilk geçişte önceki rollerine göre görüntüleme/değişiklik varsayılanlarını korur.
Yetki değişiklikleri işlem geçmişine yazılır. Kullanıcı ve yedek yönetimi ana yöneticiye özeldir.

Yetkiler hem arayüzde hem API'de denetlenir. Görev/izin seçicileri için yalnızca temel personel
rehberi (ad, unvan, grup, birim) paylaşılır; personel profil ayrıntıları gönderilmez.
İzin yetkisi bulunmayan görev kullanıcısı izin/rapor bilgilerini göremez. Rapor ve izleme
modülleri ihtiyaç duydukları temel denetim başlıklarını alır; kayıtları değiştirmek ayrı yetki ister.
Henüz uygulanmamış Eğitimler, Belgelerim, Takvim ve Bildirimler bağlantıları gizlidir;
bu alanlar işlev kazandığında izin listesine ve API denetimine eklenmelidir.

Geçmiş yıl izin, izin hakkı ve görev kayıtları sunucuda salt okunurdur (ana yönetici dahil).
Diğer koleksiyonların geçmiş yılları, modül düzenleme yetkisi varsa değiştirilebilir.
Mevcut SQLite veritabanına permissions sütunu otomatik eklenir; kayıtlar silinmez.
Dağıtımda app.py, authorization.py, seed_records.json ve static/ dosyaları birlikte gönderilmeli, Python
sunucusu yeniden başlatılmalıdır. Yalnızca arayüz dosyalarını göndermek yeterli değildir.

Test: `python -m unittest discover -s tests -v` (geçici, bağımsız SQLite veritabanı kullanır).

Başlangıç denetim ve personel verileri artık herkese açık JavaScript içinde değildir; seed_records.json yalnızca ilk veritabanı kurulumunda sunucu tarafından okunur.
