const DATA_VERSION = "2026-08-31-actions-v1";
const APPROVAL_DATA_VERSION = "2026-08-31-approvals-v1";
const LEAVE_DATA_VERSION = "2026-08-31-leave-v1";
const LEAVE_RIGHT_DATA_VERSION = "2026-08-31-leave-right-v1";
const REPORT_DOCUMENT_DATA_VERSION = "2026-08-31-report-documents-v1";
const API_STATE_URL = "/api/state";

const defaultAudits = [
  {
    no: 1,
    start: "2026-02-02",
    end: "2026-06-26",
    unit: "Eğitim ve Yayın Dairesi Başkanlığı (EYDB)",
    scope: "Yayım ve Eğitim ile Yayın ve Tanıtım Hizmetleri Faaliyetleri Süreci",
    type: "Sistem/Uygunluk",
    team: ["Mesut EKMEKÇİ", "Öznur YAVUZ"],
    supervisor: "M. Ramiz DİLLİ",
    status: "Planlandı",
  },
  {
    no: 2,
    start: "2026-02-02",
    end: "2026-06-26",
    unit: "Tütün ve Alkol Dairesi Başkanlığı (TADAB)",
    scope: "Tütün/Alkol İşlemleri ve Denetimi Faaliyetleri Süreci",
    type: "Sistem/Uygunluk",
    team: ["Selin YÖRÜK"],
    supervisor: "Mustafa BEGEN",
    status: "Planlandı",
  },
  {
    no: 3,
    start: "2026-06-01",
    end: "2026-11-27",
    unit: "Bilgi Teknolojileri Genel Müdürlüğü",
    scope:
      "Bilgi ve İletişim Güvenliği Rehberi kapsamında Bilgi ve İletişim Güvenliği Süreci",
    type: "Bilgi Teknolojileri",
    team: ["Çiğdem ÖZGEL"],
    supervisor: "Ramazan ORMAN",
    status: "Planlandı",
  },
  {
    no: 4,
    start: "2026-07-06",
    end: "2026-10-30",
    unit: "Van İl Tarım ve Orman Müdürlüğü",
    scope: "İç Kontrol Sistemi",
    type: "Sistem",
    team: ["Mesut EKMEKÇİ"],
    supervisor: "Mecbure ASLAN",
    status: "Planlandı",
  },
  {
    no: 5,
    start: "2026-07-06",
    end: "2026-10-30",
    unit: "Rize İl Tarım ve Orman Müdürlüğü",
    scope: "İç Kontrol Sistemi",
    type: "Sistem",
    team: ["Mesut EKMEKÇİ"],
    supervisor: "Mecbure ASLAN",
    status: "Planlandı",
  },
  {
    no: 6,
    start: "2026-07-06",
    end: "2026-10-30",
    unit: "Artvin İl Tarım ve Orman Müdürlüğü",
    scope: "İç Kontrol Sistemi",
    type: "Sistem",
    team: ["Dr. Handan ERKAN ŞAHİN"],
    supervisor: "Mecbure ASLAN",
    status: "Planlandı",
  },
  {
    no: 7,
    start: "2026-07-06",
    end: "2026-10-30",
    unit: "Kırıkkale İl Tarım ve Orman Müdürlüğü",
    scope: "İç Kontrol Sistemi",
    type: "Sistem",
    team: ["Setenay Beril TEKİN"],
    supervisor: "Mecbure ASLAN",
    status: "Planlandı",
  },
  {
    no: 8,
    start: "2026-07-06",
    end: "2026-10-30",
    unit: "Kars İl Tarım ve Orman Müdürlüğü",
    scope: "İç Kontrol Sistemi",
    type: "Sistem",
    team: ["Serkan DOĞAN"],
    supervisor: "Mecbure ASLAN",
    status: "Planlandı",
  },
  {
    no: 9,
    start: "2026-07-06",
    end: "2026-10-30",
    unit: "Iğdır İl Tarım ve Orman Müdürlüğü",
    scope: "İç Kontrol Sistemi",
    type: "Sistem",
    team: ["Öznur YAVUZ"],
    supervisor: "Mecbure ASLAN",
    status: "Planlandı",
  },
  {
    no: 10,
    start: "2026-07-06",
    end: "2026-10-30",
    unit: "Erzincan İl Tarım ve Orman Müdürlüğü",
    scope: "İç Kontrol Sistemi",
    type: "Sistem",
    team: ["Setenay Beril TEKİN"],
    supervisor: "Mecbure ASLAN",
    status: "Planlandı",
  },
  {
    no: 11,
    start: "2026-07-06",
    end: "2026-10-30",
    unit: "Karabük İl Tarım ve Orman Müdürlüğü",
    scope: "İç Kontrol Sistemi",
    type: "Sistem",
    team: ["Serkan DOĞAN"],
    supervisor: "Mecbure ASLAN",
    status: "Planlandı",
  },
  {
    no: 12,
    start: "2026-07-06",
    end: "2026-10-30",
    unit: "Kastamonu İl Tarım ve Orman Müdürlüğü",
    scope: "İç Kontrol Sistemi",
    type: "Sistem",
    team: ["Öznur YAVUZ"],
    supervisor: "Mecbure ASLAN",
    status: "Planlandı",
  },
  {
    no: 13,
    start: "2026-07-06",
    end: "2026-10-30",
    unit: "Kırşehir İl Tarım ve Orman Müdürlüğü",
    scope: "İç Kontrol Sistemi",
    type: "Sistem",
    team: ["Dr. Handan ERKAN ŞAHİN"],
    supervisor: "Mecbure ASLAN",
    status: "Planlandı",
  },
  {
    no: 14,
    start: "2026-07-06",
    end: "2026-10-30",
    unit: "Çankırı İl Tarım ve Orman Müdürlüğü",
    scope: "İç Kontrol Sistemi",
    type: "Sistem",
    team: ["Dr. Şerife SERTKAYA"],
    supervisor: "Mecbure ASLAN",
    status: "Planlandı",
  },
  {
    no: 15,
    start: "2026-07-06",
    end: "2026-10-30",
    unit: "Erzurum İl Tarım ve Orman Müdürlüğü",
    scope: "İç Kontrol Sistemi",
    type: "Sistem",
    team: ["Dr. Şerife SERTKAYA"],
    supervisor: "Mecbure ASLAN",
    status: "Planlandı",
  },
  {
    no: 16,
    start: "2026-08-31",
    end: "2026-12-04",
    unit: "Avrupa Birliği ve Dış İlişkiler Genel Müdürlüğü (ABDGM)",
    scope: "IPA Kurumsal Kapasite Geliştirme İş ve İşlemleri Süreci",
    type: "Sistem/Uygunluk",
    team: ["Dr. Selçuk OLUM"],
    supervisor: "Esra DARGA",
    status: "Planlandı",
  },
  {
    no: 17,
    start: "2026-08-17",
    end: "2026-12-04",
    unit: "Tarım Reformu Genel Müdürlüğü (TRGM)",
    scope: "IPARD Yönetim Otoritesi İş ve İşlemleri Süreci",
    type: "Sistem/Uygunluk",
    team: ["Setenay Beril TEKİN"],
    supervisor: "Esra DARGA",
    status: "Planlandı",
  },
  {
    no: 18,
    start: "2026-07-06",
    end: "2026-10-30",
    unit: "Tarımsal Araştırmalar ve Politikalar Genel Müdürlüğü (TAGEM)",
    scope: "Biyoçeşitlilik ve Genetik Kaynakların Korunması Süreci",
    type: "Sistem/Uygunluk",
    team: ["Selin YÖRÜK"],
    supervisor: "Mustafa BEGEN",
    status: "Planlandı",
  },
  {
    no: 19,
    start: "2025-02-02",
    end: "2026-10-30",
    unit: "Tarımsal Araştırmalar ve Politikalar Genel Müdürlüğü (TAGEM) ve bağlı Enstitüler",
    scope: "TAGEM'e bağlı Enstitü Müdürlüklerinin Etkinlikleri ve Çalışmalarının Değerlendirilmesi",
    type: "Performans",
    team: [
      "Mehmet KURU",
      "Şehmuz AYYILDIZ",
      "Semih EROĞLU",
      "Ramazan ORMAN",
      "Haydar SÜNER",
      "Dr. Alpay ALTUNTAŞ",
    ],
    supervisor: "Şehmuz AYYILDIZ, Semih EROĞLU, Ramazan ORMAN",
    status: "Planlandı",
  },
  {
    no: 20,
    start: "2026-02-02",
    end: "2026-06-26",
    unit: "Şeker Dairesi Başkanlığı",
    scope: "Risk Esaslı Denetim Planlaması Süreci",
    type: "Danışmanlık",
    team: ["Mecbure ASLAN", "Dr. Handan ERKAN ŞAHİN"],
    supervisor: "Dr. Emir Sadettin KABAKÇI",
    status: "Planlandı",
  },
  {
    no: 21,
    start: "2026-03-09",
    end: "2026-06-26",
    unit: "Hayvancılık Genel Müdürlüğü (HAYGEM)",
    scope: "Küçükbaş Hayvan Desteği Süreci (Kuzu/Oğlak)",
    type: "Danışmanlık",
    team: ["Lütfi KORKUT", "Dr. Yavuz YENER"],
    supervisor: "Esra DARGA",
    status: "Planlandı",
  },
  {
    no: 22,
    start: "2026-07-06",
    end: "2026-10-30",
    unit: "Hayvancılık Genel Müdürlüğü (HAYGEM)",
    scope: "Büyükbaş Hayvan Desteği Süreci (Buzağı/Malak)",
    type: "Danışmanlık",
    team: ["Lütfi KORKUT", "Dr. Yavuz YENER"],
    supervisor: "Esra DARGA",
    status: "Planlandı",
  },
  {
    no: 23,
    start: "2026-02-02",
    end: "2026-03-13",
    unit: "Hayvancılık Genel Müdürlüğü (HAYGEM)",
    scope: "Veteriner Yol Kontrol ve Denetim İstasyonları Süreci",
    type: "Danışmanlık",
    team: ["Lütfi KORKUT", "Dr. Yavuz YENER"],
    supervisor: "Esra DARGA",
    status: "Planlandı",
  },
  {
    no: 24,
    start: "2026-02-02",
    end: "2026-06-26",
    unit: "Strateji Geliştirme Başkanlığı (SGB)",
    scope: "Kurumsal Risk Yönetimi Süreci",
    type: "Danışmanlık",
    team: ["Mecbure ASLAN", "Dr. Handan ERKAN ŞAHİN"],
    supervisor: "Dr. Emir Sadettin KABAKÇI",
    status: "Planlandı",
  },
  {
    no: 25,
    start: "2026-02-02",
    end: "2026-06-26",
    unit: "Tarımsal Araştırmalar ve Politikalar Genel Müdürlüğü (TAGEM)",
    scope: "Araştırma yönetiminde Proje Değerlendirme Grubu (PDG) Toplantıları Süreci",
    type: "Danışmanlık",
    team: ["Dr. Şerife SERTKAYA", "Setenay Beril TEKİN"],
    supervisor: "Serkan DOĞAN",
    status: "Planlandı",
  },
  {
    no: 26,
    start: "2026-02-04",
    end: "2026-12-04",
    unit: "Tarımsal Desteklemeler Başvuru Süreci",
    scope: "İlgili tüm birimler",
    type: "Danışmanlık",
    team: ["Dr. Hakan VELİOĞLU", "Dr. Selçuk OLUM"],
    supervisor: "Esra DARGA",
    status: "Planlandı",
  },
  {
    no: 27,
    start: "2026-05-18",
    end: "2026-05-29",
    unit: "İç Denetim Başkanlığı",
    scope: "İzleme Sonuçları Takip Raporu 1 (01/01/2026-30/06/2026)",
    type: "Yönetim Faaliyetleri",
    team: ["Koordinasyon: Ramazan ORMAN", "İç Denetçi: Çiğdem ÖZGEL"],
    supervisor: "Ramazan ORMAN",
    status: "Planlandı",
  },
  {
    no: 28,
    start: "2026-11-30",
    end: "2026-12-11",
    unit: "İç Denetim Başkanlığı",
    scope: "İzleme Sonuçları Takip Raporu 2 (01/07/2026-30/11/2026)",
    type: "Yönetim Faaliyetleri",
    team: ["Koordinasyon: Ramazan ORMAN", "İç Denetçi: Çiğdem ÖZGEL"],
    supervisor: "Ramazan ORMAN",
    status: "Planlandı",
  },
  {
    no: 29,
    start: "2026-12-07",
    end: "2026-12-25",
    unit: "İç Denetim Başkanlığı",
    scope: "2026 Yılı Dönemsel Gözden Geçirme Raporu",
    type: "Yönetim Faaliyetleri",
    team: ["Çiğdem ÖZGEL", "Semih EROĞLU (Denetim Gözetim Sorumlusu)"],
    supervisor: "Semih EROĞLU",
    status: "Planlandı",
  },
  {
    no: 30,
    start: "2027-01-25",
    end: "2027-02-05",
    unit: "İç Denetim Başkanlığı",
    scope: "2026 Yılı Dönemsel Rapor",
    type: "Yönetim Faaliyetleri",
    team: ["Esra DARGA"],
    supervisor: "Esra DARGA",
    status: "Planlandı",
  },
  {
    no: 31,
    start: "2026-12-14",
    end: "2027-01-15",
    unit: "İç Denetim Başkanlığı",
    scope: "2026 Yılına ait Birim Faaliyet Raporu",
    type: "Yönetim Faaliyetleri",
    team: ["Setenay Beril TEKİN"],
    supervisor: "Setenay Beril TEKİN",
    status: "Planlandı",
  },
  {
    no: 32,
    start: "2026-12-07",
    end: "2026-12-25",
    unit: "İç Denetim Başkanlığı",
    scope: "2026 Yılı Yönerge Gözden Geçirme Çalışması",
    type: "Yönetim Faaliyetleri",
    team: ["Koordinasyon: Öznur YAVUZ", "Görevlendirme: Tüm İç Denetçiler"],
    supervisor: "Öznur YAVUZ",
    status: "Planlandı",
  },
  {
    no: 33,
    start: "2026-12-07",
    end: "2026-12-25",
    unit: "İç Denetim Başkanlığı",
    scope: "2026 Kalite Güvence ve Geliştirme Programı Gözden Geçirme",
    type: "Yönetim Faaliyetleri",
    team: ["Koordinasyon: Öznur YAVUZ", "Görevlendirme: Tüm İç Denetçiler"],
    supervisor: "Öznur YAVUZ",
    status: "Planlandı",
  },
  {
    no: 34,
    start: "2026-11-16",
    end: "2026-12-31",
    unit: "İç Denetim Başkanlığı",
    scope: "2027 Yılı Plan ve Program Hazırlıkları",
    type: "Yönetim Faaliyetleri",
    team: ["Esra DARGA - Koordinatör", "Dr. Hakan VELİOĞLU - Koordinatör"],
    supervisor: "Esra DARGA, Dr. Hakan VELİOĞLU",
    status: "Planlandı",
  },
];

const defaultApprovals = [
  {
    year: "2026",
    no: 1,
    date: "2026-01-12",
    subject: "2026 yılı iç denetim programı oluru",
    related: "2026 Program Çizelgesi",
    status: "Yüklendi",
    fileName: "2026 Program Çizelgesi 12.01.2026.doc",
    cloudUrl: "",
    note: "Yıllık program başlangıç oluru",
  },
  {
    year: "2026",
    no: 2,
    date: "2026-02-02",
    subject: "EYDB denetimi görevlendirme oluru",
    related: "Eğitim ve Yayın Dairesi Başkanlığı denetimi",
    status: "Beklemede",
    fileName: "",
    cloudUrl: "",
    note: "",
  },
  {
    year: "2026",
    no: 3,
    date: "2026-02-02",
    subject: "TADAB denetimi görevlendirme oluru",
    related: "Tütün ve Alkol Dairesi Başkanlığı denetimi",
    status: "Beklemede",
    fileName: "",
    cloudUrl: "",
    note: "",
  },
  {
    year: "2026",
    no: 4,
    date: "2026-03-09",
    subject: "Danışmanlık faaliyeti görevlendirme oluru",
    related: "HAYGEM Küçükbaş Hayvan Desteği Süreci",
    status: "Beklemede",
    fileName: "",
    cloudUrl: "",
    note: "",
  },
];

const defaultAudits2025 = [
  {
    year: "2025",
    no: 1,
    start: "2025-02-21",
    end: "2025-06-27",
    unit: "Destek Hizmetleri Dairesi Başkanlığı",
    scope: "Genel Evrak süreci",
    type: "Sistem/Uygunluk",
    team: ["Çiğdem ÖZGEL", "Dr. Selçuk OLUM"],
    supervisor: "Ramazan ORMAN",
    status: "Planlandı",
  },
  {
    year: "2025",
    no: 2,
    start: "2025-02-21",
    end: "2025-11-28",
    unit: "Döner Sermaye İş ve İşlemleri",
    scope: "Döner sermaye iş ve işlemleri süreci",
    type: "Mali",
    team: ["Erdal ÖZYÜN", "Dr. Kerim ÜSTÜN", "Metin SÜERDEM"],
    supervisor: "Dr. Emir Sadettin KABAKÇI",
    status: "Planlandı",
  },
  {
    year: "2025",
    no: 3,
    start: "2025-09-22",
    end: "2025-11-28",
    unit: "Bilgi Teknolojileri Genel Müdürlüğü",
    scope:
      "Bilgi ve İletişim Güvenliği Rehberi kapsamında Bilgi ve İletişim Güvenliği Süreci",
    type: "Bilgi Teknolojileri",
    team: ["Dr. Selçuk OLUM", "Dr. Yavuz YENER"],
    supervisor: "Dr. Hakan VELİOĞLU",
    status: "Planlandı",
  },
  {
    year: "2025",
    no: 4,
    start: "2025-02-10",
    end: "2025-12-05",
    unit: "Gıda ve Kontrol Genel Müdürlüğü",
    scope: "Veteriner Sınır Kontrol Noktaları İş ve İşlemleri",
    type: "Sistem/Uygunluk",
    team: ["Lütfi KORKUT", "Dr. Yavuz YENER", "Dr. Hakan VELİOĞLU"],
    supervisor: "Esra DARGA",
    status: "Planlandı",
  },
  {
    year: "2025",
    no: 5,
    start: "2025-02-10",
    end: "2025-09-19",
    unit: "Edirne Kapıkule Veteriner Sınır Kontrol Noktası Müdürlüğü",
    scope: "Veteriner Sınır Kontrol Noktası Müdürlükleri İş ve İşlemleri",
    type: "Sistem/Uygunluk",
    team: ["Lütfi KORKUT", "Dr. Yavuz YENER", "Dr. Hakan VELİOĞLU"],
    supervisor: "Esra DARGA",
    status: "Planlandı",
  },
  {
    year: "2025",
    no: 6,
    start: "2025-02-10",
    end: "2025-09-19",
    unit: "Edirne İpsala Sınır Kapısı Veteriner Sınır Kontrol Noktası Müdürlüğü",
    scope: "Veteriner Sınır Kontrol Noktası Müdürlükleri İş ve İşlemleri",
    type: "Sistem/Uygunluk",
    team: ["Lütfi KORKUT", "Dr. Yavuz YENER", "Dr. Hakan VELİOĞLU"],
    supervisor: "Esra DARGA",
    status: "Planlandı",
  },
  {
    year: "2025",
    no: 7,
    start: "2025-02-10",
    end: "2025-09-19",
    unit: "İstanbul Pendik Veteriner Sınır Kontrol Noktası Müdürlüğü",
    scope: "Veteriner Sınır Kontrol Noktası Müdürlükleri İş ve İşlemleri",
    type: "Sistem/Uygunluk",
    team: ["Lütfi KORKUT", "Dr. Yavuz YENER", "Dr. Hakan VELİOĞLU"],
    supervisor: "Esra DARGA",
    status: "Planlandı",
  },
  {
    year: "2025",
    no: 8,
    start: "2025-02-10",
    end: "2025-09-19",
    unit: "İstanbul Ambarlı Veteriner Sınır Kontrol Noktası Müdürlüğü",
    scope: "Veteriner Sınır Kontrol Noktası Müdürlükleri İş ve İşlemleri",
    type: "Sistem/Uygunluk",
    team: ["Lütfi KORKUT", "Dr. Yavuz YENER", "Dr. Hakan VELİOĞLU"],
    supervisor: "Esra DARGA",
    status: "Planlandı",
  },
  {
    year: "2025",
    no: 9,
    start: "2025-02-10",
    end: "2025-09-19",
    unit: "İstanbul Sabiha Gökçen Havalimanı Veteriner Sınır Kontrol Noktası Müdürlüğü",
    scope: "Veteriner Sınır Kontrol Noktası Müdürlükleri İş ve İşlemleri",
    type: "Sistem/Uygunluk",
    team: ["Lütfi KORKUT", "Dr. Yavuz YENER", "Dr. Hakan VELİOĞLU"],
    supervisor: "Esra DARGA",
    status: "Planlandı",
  },
  {
    year: "2025",
    no: 10,
    start: "2025-02-10",
    end: "2025-09-19",
    unit: "İstanbul Havalimanı Veteriner Sınır Kontrol Noktası Müdürlüğü",
    scope: "Veteriner Sınır Kontrol Noktası Müdürlükleri İş ve İşlemleri",
    type: "Sistem/Uygunluk",
    team: ["Lütfi KORKUT", "Dr. Yavuz YENER", "Dr. Hakan VELİOĞLU"],
    supervisor: "Esra DARGA",
    status: "Planlandı",
  },
  {
    year: "2025",
    no: 11,
    start: "2025-02-10",
    end: "2025-09-19",
    unit: "Mersin Veteriner Sınır Kontrol Noktası Müdürlüğü",
    scope: "Veteriner Sınır Kontrol Noktası Müdürlükleri İş ve İşlemleri",
    type: "Sistem/Uygunluk",
    team: ["Lütfi KORKUT", "Dr. Yavuz YENER", "Dr. Hakan VELİOĞLU"],
    supervisor: "Esra DARGA",
    status: "Planlandı",
  },
  {
    year: "2025",
    no: 12,
    start: "2025-02-10",
    end: "2025-09-19",
    unit: "Şırnak Habur Veteriner Sınır Kontrol Noktası Müdürlüğü",
    scope: "Veteriner Sınır Kontrol Noktası Müdürlükleri İş ve İşlemleri",
    type: "Sistem/Uygunluk",
    team: ["Lütfi KORKUT", "Dr. Yavuz YENER", "Dr. Hakan VELİOĞLU"],
    supervisor: "Esra DARGA",
    status: "Planlandı",
  },
  {
    year: "2025",
    no: 13,
    start: "2025-07-07",
    end: "2025-11-28",
    unit: "İzmir Veteriner Sınır Kontrol Noktası Müdürlüğü",
    scope: "Veteriner Sınır Kontrol Noktası Müdürlükleri İş ve İşlemleri",
    type: "Sistem/Uygunluk",
    team: ["Mustafa BEGEN"],
    supervisor: "M. Ramiz DİLLİ",
    status: "Planlandı",
  },
  {
    year: "2025",
    no: 14,
    start: "2025-07-07",
    end: "2025-11-28",
    unit: "İzmir Adnan Menderes Havalimanı Sınır Kontrol Noktası Müdürlüğü",
    scope: "Veteriner Sınır Kontrol Noktası Müdürlükleri İş ve İşlemleri",
    type: "Sistem/Uygunluk",
    team: ["Mustafa BEGEN"],
    supervisor: "M. Ramiz DİLLİ",
    status: "Planlandı",
  },
  {
    year: "2025",
    no: 15,
    start: "2025-07-07",
    end: "2025-11-28",
    unit: "Kocaeli Derince Limanı Veteriner Sınır Kontrol Noktası Müdürlüğü",
    scope: "Veteriner Sınır Kontrol Noktası Müdürlükleri İş ve İşlemleri",
    type: "Sistem/Uygunluk",
    team: ["Çiğdem ÖZGEL", "Erdal ÖZYÜN"],
    supervisor: "Mustafa BEGEN",
    status: "Planlandı",
  },
  {
    year: "2025",
    no: 16,
    start: "2025-07-07",
    end: "2025-11-28",
    unit: "Artvin Sarp Veteriner Sınır Kontrol Noktası Müdürlüğü",
    scope: "Veteriner Sınır Kontrol Noktası Müdürlükleri İş ve İşlemleri",
    type: "Sistem/Uygunluk",
    team: ["Mustafa BEGEN"],
    supervisor: "M. Ramiz DİLLİ",
    status: "Planlandı",
  },
  {
    year: "2025",
    no: 17,
    start: "2025-07-07",
    end: "2025-11-28",
    unit: "Antalya Havalimanı Veteriner Sınır Kontrol Noktası Müdürlüğü",
    scope: "Veteriner Sınır Kontrol Noktası Müdürlükleri İş ve İşlemleri",
    type: "Sistem/Uygunluk",
    team: ["Dr. Alpay ALTUNTAŞ"],
    supervisor: "Mustafa BEGEN",
    status: "Planlandı",
  },
  {
    year: "2025",
    no: 18,
    start: "2025-07-07",
    end: "2025-11-28",
    unit: "Balıkesir Bandırma Limanı Veteriner Sınır Kontrol Noktası Müdürlüğü",
    scope: "Veteriner Sınır Kontrol Noktası Müdürlükleri İş ve İşlemleri",
    type: "Sistem/Uygunluk",
    team: ["Setenay Beril TEKİN"],
    supervisor: "Mustafa BEGEN",
    status: "Planlandı",
  },
  {
    year: "2025",
    no: 19,
    start: "2025-07-07",
    end: "2025-11-28",
    unit: "Tekirdağ Limanı Veteriner Sınır Kontrol Noktası Müdürlüğü",
    scope: "Veteriner Sınır Kontrol Noktası Müdürlükleri İş ve İşlemleri",
    type: "Sistem/Uygunluk",
    team: ["Selin YÖRÜK"],
    supervisor: "Mustafa BEGEN",
    status: "Planlandı",
  },
  {
    year: "2025",
    no: 20,
    start: "2025-07-07",
    end: "2025-11-28",
    unit: "Samsun Limanı Veteriner Sınır Kontrol Noktası Müdürlüğü",
    scope: "Veteriner Sınır Kontrol Noktası Müdürlükleri İş ve İşlemleri",
    type: "Sistem/Uygunluk",
    team: ["Çiğdem ÖZGEL", "Mehmet KURU"],
    supervisor: "Mustafa BEGEN",
    status: "Planlandı",
  },
  {
    year: "2025",
    no: 21,
    start: "2025-07-07",
    end: "2025-11-28",
    unit: "Trabzon Limanı Veteriner Sınır Kontrol Noktası Müdürlüğü",
    scope: "Veteriner Sınır Kontrol Noktası Müdürlükleri İş ve İşlemleri",
    type: "Sistem/Uygunluk",
    team: ["Dr. Şerife SERTKAYA"],
    supervisor: "Mustafa BEGEN",
    status: "Planlandı",
  },
  {
    year: "2025",
    no: 22,
    start: "2025-07-07",
    end: "2025-11-28",
    unit: "Zonguldak Limanı Veteriner Sınır Kontrol Noktası Müdürlüğü",
    scope: "Veteriner Sınır Kontrol Noktası Müdürlükleri İş ve İşlemleri",
    type: "Sistem/Uygunluk",
    team: ["Dr. Şerife SERTKAYA"],
    supervisor: "Mustafa BEGEN",
    status: "Planlandı",
  },
  {
    year: "2025",
    no: 23,
    start: "2025-07-07",
    end: "2025-11-28",
    unit: "Ağrı Gürbulak Veteriner Sınır Kontrol Noktası Müdürlüğü",
    scope: "Veteriner Sınır Kontrol Noktası Müdürlükleri İş ve İşlemleri",
    type: "Sistem/Uygunluk",
    team: ["Haydar SÜNER", "Mehmet KURU"],
    supervisor: "Mustafa BEGEN",
    status: "Planlandı",
  },
  {
    year: "2025",
    no: 24,
    start: "2025-07-07",
    end: "2025-11-28",
    unit: "Iğdır Dilucu Sınır Kapısı Veteriner Sınır Kontrol Noktası Müdürlüğü",
    scope: "Veteriner Sınır Kontrol Noktası Müdürlükleri İş ve İşlemleri",
    type: "Sistem/Uygunluk",
    team: ["Haydar SÜNER", "Mehmet KURU"],
    supervisor: "Mustafa BEGEN",
    status: "Planlandı",
  },
  {
    year: "2025",
    no: 25,
    start: "2025-07-07",
    end: "2025-09-19",
    unit: "Ankara Esenboğa Havalimanı Veteriner Sınır Kontrol Noktası Müdürlüğü",
    scope: "Veteriner Sınır Kontrol Noktası Müdürlükleri İş ve İşlemleri",
    type: "Sistem/Uygunluk",
    team: ["Setenay Beril TEKİN"],
    supervisor: "Mustafa BEGEN",
    status: "Planlandı",
  },
  {
    year: "2025",
    no: 26,
    start: "2025-02-10",
    end: "2025-06-27",
    unit: "Mersin İl Tarım ve Orman Müdürlüğü",
    scope: "İç Kontrol Faaliyetleri",
    type: "Sistem",
    team: ["Öznur YAVUZ", "Serkan DOĞAN"],
    supervisor: "Mecbure ASLAN",
    status: "Planlandı",
  },
  {
    year: "2025",
    no: 27,
    start: "2025-02-10",
    end: "2025-06-27",
    unit: "Afyon İl Tarım ve Orman Müdürlüğü",
    scope: "İç Kontrol Faaliyetleri",
    type: "Sistem",
    team: ["Dr. Handan ERKAN ŞAHİN"],
    supervisor: "Mecbure ASLAN",
    status: "Planlandı",
  },
  {
    year: "2025",
    no: 28,
    start: "2025-02-10",
    end: "2025-06-27",
    unit: "Sinop İl Tarım ve Orman Müdürlüğü",
    scope: "İç Kontrol Faaliyetleri",
    type: "Sistem",
    team: ["Serkan DOĞAN"],
    supervisor: "Mecbure ASLAN",
    status: "Planlandı",
  },
  {
    year: "2025",
    no: 29,
    start: "2025-02-10",
    end: "2025-06-27",
    unit: "Trabzon İl Tarım ve Orman Müdürlüğü",
    scope: "İç Kontrol Faaliyetleri",
    type: "Sistem",
    team: ["Mesut EKMEKÇİ"],
    supervisor: "Mecbure ASLAN",
    status: "Planlandı",
  },
  {
    year: "2025",
    no: 30,
    start: "2025-07-07",
    end: "2025-11-28",
    unit: "Manisa İl Tarım ve Orman Müdürlüğü",
    scope: "İç Kontrol Faaliyetleri",
    type: "Sistem",
    team: ["Öznur YAVUZ"],
    supervisor: "Mecbure ASLAN",
    status: "Planlandı",
  },
  {
    year: "2025",
    no: 31,
    start: "2025-07-07",
    end: "2025-11-28",
    unit: "Uşak İl Tarım ve Orman Müdürlüğü",
    scope: "İç Kontrol Faaliyetleri",
    type: "Sistem",
    team: ["Dr. Handan ERKAN ŞAHİN"],
    supervisor: "Mecbure ASLAN",
    status: "Planlandı",
  },
  {
    year: "2025",
    no: 32,
    start: "2025-07-07",
    end: "2025-11-28",
    unit: "Denizli İl Tarım ve Orman Müdürlüğü",
    scope: "İç Kontrol Faaliyetleri",
    type: "Sistem",
    team: ["Serkan DOĞAN"],
    supervisor: "Mecbure ASLAN",
    status: "Planlandı",
  },
  {
    year: "2025",
    no: 33,
    start: "2025-02-10",
    end: "2025-06-27",
    unit: "Isparta İl Tarım ve Orman Müdürlüğü",
    scope: "İç Kontrol Faaliyetleri",
    type: "Sistem",
    team: ["Mesut EKMEKÇİ"],
    supervisor: "Mecbure ASLAN",
    status: "Planlandı",
  },
  {
    year: "2025",
    no: 34,
    start: "2025-07-07",
    end: "2025-11-28",
    unit: "Batman İl Tarım ve Orman Müdürlüğü",
    scope: "İç Kontrol Faaliyetleri",
    type: "Sistem",
    team: ["Dr. Alpay ALTUNTAŞ"],
    supervisor: "Mecbure ASLAN",
    status: "Planlandı",
  },
  {
    year: "2025",
    no: 35,
    start: "2025-07-07",
    end: "2025-11-28",
    unit: "Mardin İl Tarım ve Orman Müdürlüğü",
    scope: "İç Kontrol Faaliyetleri",
    type: "Sistem",
    team: ["Serkan DOĞAN"],
    supervisor: "Mecbure ASLAN",
    status: "Planlandı",
  },
  {
    year: "2025",
    no: 36,
    start: "2025-07-07",
    end: "2025-11-28",
    unit: "Sivas Tarım ve Orman Müdürlüğü",
    scope: "İç Kontrol Faaliyetleri",
    type: "Sistem",
    team: ["Mesut EKMEKÇİ"],
    supervisor: "Mecbure ASLAN",
    status: "Planlandı",
  },
  {
    year: "2025",
    no: 37,
    start: "2025-02-10",
    end: "2025-06-27",
    unit: "Tokat İl Tarım ve Orman Müdürlüğü",
    scope: "İç Kontrol Faaliyetleri",
    type: "Sistem",
    team: ["Dr. Handan ERKAN ŞAHİN", "Dr. Alpay ALTUNTAŞ"],
    supervisor: "Mecbure ASLAN",
    status: "Planlandı",
  },
  {
    year: "2025",
    no: 38,
    start: "2025-07-07",
    end: "2025-11-28",
    unit: "Çorum İl Tarım ve Orman Müdürlüğü",
    scope: "İç Kontrol Faaliyetleri",
    type: "Sistem",
    team: ["Dr. Handan ERKAN ŞAHİN"],
    supervisor: "Mecbure ASLAN",
    status: "Planlandı",
  },
  {
    year: "2025",
    no: 39,
    start: "2025-02-10",
    end: "2025-06-27",
    unit: "Nevşehir İl Tarım ve Orman Müdürlüğü",
    scope: "İç Kontrol Faaliyetleri",
    type: "Sistem",
    team: ["Serkan DOĞAN"],
    supervisor: "Mecbure ASLAN",
    status: "Planlandı",
  },
  {
    year: "2025",
    no: 40,
    start: "2025-02-10",
    end: "2025-06-27",
    unit: "Kocaeli İl Tarım ve Orman Müdürlüğü",
    scope: "İç Kontrol Faaliyetleri",
    type: "Sistem",
    team: ["Öznur YAVUZ", "Mesut EKMEKÇİ"],
    supervisor: "Mecbure ASLAN",
    status: "Planlandı",
  },
  {
    year: "2025",
    no: 41,
    start: "2025-02-10",
    end: "2025-06-27",
    unit: "Ordu İl Tarım ve Orman Müdürlüğü",
    scope: "İç Kontrol Faaliyetleri",
    type: "Sistem",
    team: ["Dr. Alpay ALTUNTAŞ"],
    supervisor: "Mecbure ASLAN",
    status: "Planlandı",
  },
  {
    year: "2025",
    no: 42,
    start: "2025-07-07",
    end: "2025-11-28",
    unit: "Malatya İl Tarım ve Orman Müdürlüğü",
    scope: "İç Kontrol Faaliyetleri",
    type: "Sistem",
    team: ["Dr. Handan ERKAN ŞAHİN", "Mesut EKMEKÇİ"],
    supervisor: "Mecbure ASLAN",
    status: "Planlandı",
  },
  {
    year: "2025",
    no: 43,
    start: "2025-07-07",
    end: "2025-11-28",
    unit: "Düzce İl Tarım ve Orman Müdürlüğü",
    scope: "İç Kontrol Faaliyetleri",
    type: "Sistem",
    team: ["Öznur YAVUZ"],
    supervisor: "Mecbure ASLAN",
    status: "Planlandı",
  },
  {
    year: "2025",
    no: 44,
    start: "2025-02-10",
    end: "2025-06-27",
    unit: "Sakarya İl Tarım ve Orman Müdürlüğü",
    scope: "İç Kontrol Faaliyetleri",
    type: "Sistem",
    team: ["Öznur YAVUZ", "Dr. Alpay ALTUNTAŞ"],
    supervisor: "Mecbure ASLAN",
    status: "Planlandı",
  },
  {
    year: "2025",
    no: 45,
    start: "2025-07-07",
    end: "2025-11-28",
    unit: "Antalya İl Tarım ve Orman Müdürlüğü",
    scope: "İç Kontrol Faaliyetleri",
    type: "Sistem",
    team: ["Dr. Alpay ALTUNTAŞ"],
    supervisor: "Mecbure ASLAN",
    status: "Planlandı",
  },
  {
    year: "2025",
    no: 46,
    start: "2025-02-14",
    end: "2025-09-30",
    unit: "Tarımsal Araştırmalar ve Politikalar Genel Müdürlüğü",
    scope: "Kamu-Özel Sektör İşbirliği Projeleri Süreci",
    type: "Sistem",
    team: ["Dr. Şerife SERTKAYA", "Şehmus AYYILDIZ"],
    supervisor: "Semih EROĞLU",
    status: "Planlandı",
  },
  {
    year: "2025",
    no: 47,
    start: "2025-07-07",
    end: "2025-11-28",
    unit: "Avrupa Birliği ve Dış İlişkiler Genel Müdürlüğü",
    scope: "IPA Kurumsal Kapasite İş ve İşlemleri Süreci",
    type: "Sistem/Uygunluk",
    team: ["Öznur YAVUZ"],
    supervisor: "Esra DARGA",
    status: "Planlandı",
  },
  {
    year: "2025",
    no: 48,
    start: "2025-07-07",
    end: "2025-11-28",
    unit: "Tarım Reformu Genel Müdürlüğü",
    scope: "IPARD Yönetim Otoritesi İş ve İşlemleri Süreci",
    type: "Sistem/Uygunluk",
    team: ["Setenay Beril TEKİN"],
    supervisor: "Esra DARGA",
    status: "Planlandı",
  },
  {
    year: "2025",
    no: 49,
    start: "2025-02-10",
    end: "2025-04-21",
    unit: "Şeker Dairesi Başkanlığı",
    scope: "Şeker Kanunu kapsamındaki inceleme ve denetim süreci",
    type: "İnceleme",
    team: ["Semih EROĞLU", "Şehmus AYYILDIZ"],
    supervisor: "Ramazan ORMAN",
    status: "Planlandı",
  },
  {
    year: "2025",
    no: 50,
    start: "2025-02-10",
    end: "2025-06-27",
    unit: "Gıda ve Kontrol Genel Müdürlüğü",
    scope: "Bitki Koruma Ürünleri Üretim Yeri ve Bayi Kontrol Süreci",
    type: "Sistem/Uygunluk",
    team: ["Selin YÖRÜK"],
    supervisor: "Mustafa BEGEN",
    status: "Planlandı",
  },
  {
    year: "2025",
    no: 51,
    start: "2025-02-10",
    end: "2025-04-11",
    unit: "Tarım Reformu Genel Müdürlüğü",
    scope:
      "Tarım Bilgi Sistemi uygulamaları ülke modeli fizibilite çalışması kapsamında üretilen zirai meteorolojik fenolojik gözlem istasyonları",
    type: "Danışmanlık",
    team: ["Selin YÖRÜK"],
    supervisor: "M. Ramiz DİLLİ",
    status: "Planlandı",
  },
  {
    year: "2025",
    no: 52,
    start: "2025-04-14",
    end: "2025-09-30",
    unit: "Tarımsal Araştırmalar ve Politikalar Genel Müdürlüğü (TAGEM)",
    scope: "TAGEM'in organizasyonel yapısı ve süreçlerin değerlendirilmesi",
    type: "Danışmanlık",
    team: ["Selin YÖRÜK", "Semih EROĞLU"],
    supervisor: "Şehmus AYYILDIZ",
    status: "Planlandı",
  },
  {
    year: "2025",
    no: 53,
    start: "2025-02-10",
    end: "2025-06-20",
    unit: "Gıda ve Kontrol Genel Müdürlüğü",
    scope:
      "Özel Gıda Kontrol Laboratuvarlarıyla ilgili iş ve işlemler (yetkilendirme, denetim vb. süreçler)",
    type: "İnceleme",
    team: ["Setenay Beril TEKİN", "M. Ramiz DİLLİ"],
    supervisor: "Esra DARGA",
    status: "Planlandı",
  },
  {
    year: "2025",
    no: 54,
    start: "2025-01-01",
    end: "2025-12-31",
    unit: "Tüm Birimler",
    scope: "İhtiyat inceleme görevleri",
    type: "İnceleme",
    team: ["Dr. Kerim ÜSTÜN", "Metin SÜERDEM"],
    supervisor: "M. Ramiz DİLLİ",
    status: "Planlandı",
  },
];

const defaultLeaves = [];

const defaultLeaveRights = [];

const defaultDutyRecords = [];

const reportArchiveLinkType = "Rapor Arşivi Bulut Linki";
const ACTIVE_VIEW_KEY = "ic-denetim-active-view";

const defaultPersonnelRecords = [
  { no: 1, name: "Erdal ÖZYÖN", title: "Başkan", extension: "8801", group: "Denetçiler" },
  { no: 2, name: "Esra DARGA", title: "Başkan Yardımcısı", extension: "8772", group: "Denetçiler" },
  { no: 3, name: "Dr. Hakan VELİOĞLU", title: "Başkan Yardımcısı", extension: "8788", group: "Denetçiler" },
  { no: 4, name: "Ramazan ORMAN", title: "Başkan Yardımcısı", extension: "8769", group: "Denetçiler" },
  { no: 5, name: "Dr. Alpay ALTUNTAŞ", title: "İç Denetçi", extension: "2707", group: "Denetçiler" },
  { no: 6, name: "Bahadır TOPAL", title: "İç Denetçi", extension: "8765", group: "Denetçiler" },
  { no: 7, name: "Çiğdem ÖZGEL", title: "İç Denetçi", extension: "8767", group: "Denetçiler" },
  { no: 8, name: "Dr. Deniz Savaş SARI", title: "İç Denetçi", extension: "2730", group: "Denetçiler" },
  { no: 9, name: "Dr. Emir Sadettin KABAKÇI", title: "İç Denetçi", extension: "2726", group: "Denetçiler" },
  { no: 10, name: "Dr. Handan Erkan ŞAHİN", title: "İç Denetçi", extension: "2709", group: "Denetçiler" },
  { no: 11, name: "Dr. Hasan Alper ELEKON", title: "İç Denetçi", extension: "2761", group: "Denetçiler" },
  { no: 12, name: "Haydar SÜNER", title: "İç Denetçi", extension: "2702", group: "Denetçiler" },
  { no: 13, name: "Lütfi KORKUT", title: "İç Denetçi", extension: "2729", group: "Denetçiler" },
  { no: 14, name: "Mecbure ASLAN", title: "İç Denetçi", extension: "2710", group: "Denetçiler" },
  { no: 15, name: "Mehmet KURU", title: "İç Denetçi", extension: "2728", group: "Denetçiler" },
  { no: 16, name: "Mesut EKMEKÇİ", title: "İç Denetçi", extension: "2715", group: "Denetçiler" },
  { no: 17, name: "Muhammet Ramiz DİLLİ", title: "İç Denetçi", extension: "8760", group: "Denetçiler" },
  { no: 18, name: "Mustafa BEGEN", title: "İç Denetçi", extension: "8768", group: "Denetçiler" },
  { no: 19, name: "Öznur YAVUZ", title: "İç Denetçi", extension: "2763", group: "Denetçiler" },
  { no: 20, name: "Dr. Selçuk OLUM", title: "İç Denetçi", extension: "8770", group: "Denetçiler" },
  { no: 21, name: "Selin YÖRÜK", title: "İç Denetçi", extension: "2739", group: "Denetçiler" },
  { no: 22, name: "Semih EROĞLU", title: "İç Denetçi", extension: "2724", group: "Denetçiler" },
  { no: 23, name: "Serkan DOĞAN", title: "İç Denetçi", extension: "2760", group: "Denetçiler" },
  { no: 24, name: "Setenay Beril TEKİN", title: "İç Denetçi", extension: "2751", group: "Denetçiler" },
  { no: 25, name: "Şehmus AYYILDIZ", title: "İç Denetçi", extension: "2750", group: "Denetçiler" },
  { no: 26, name: "Dr. Şerife SERTKAYA", title: "İç Denetçi", extension: "2711", group: "Denetçiler" },
  { no: 27, name: "Dr. Yavuz YENER", title: "İç Denetçi", extension: "2708", group: "Denetçiler" },
  { no: 28, name: "Dr. Kerim ÜSTÜN", title: "Bakanlık Müşaviri", extension: "2756", group: "Denetçiler" },
  { no: 29, name: "Süleyman DEĞERLİ", title: "Bakanlık Müşaviri", extension: "2752", group: "Denetçiler" },
  { no: 1, name: "Emine GÖRGÜLÜ", title: "Yönetici Asistanı", extension: "8801", group: "İdari Personel" },
  { no: 2, name: "Elmas ÖZDEMİR", title: "Yönetici Asistanı", extension: "8885", group: "İdari Personel" },
  { no: 3, name: "Sibel ÇALIŞKAN", title: "Büro", extension: "2717", group: "İdari Personel" },
  { no: 4, name: "Nilüfer ALA", title: "Büro", extension: "2714", group: "İdari Personel" },
  { no: 5, name: "Kenan KOPAN", title: "Tekniker", extension: "8789", group: "İdari Personel" },
  { no: 6, name: "Mahmut Sami ÖZKAN", title: "Mühendis", extension: "8766", group: "İdari Personel" },
  { no: 7, name: "M. Kemal DEMİREL", title: "Memur", extension: "2706", group: "İdari Personel" },
  { no: 8, name: "Meryem KOYUNCU", title: "Kat Görevlisi", extension: "2734", group: "İdari Personel" },
  { no: 9, name: "Hasan YÜKSEL", title: "Kat Görevlisi", extension: "2734", group: "İdari Personel" },
  { no: 10, name: "Elmaziye AKTAŞ", title: "Kat Görevlisi", extension: "2720", group: "İdari Personel" },
  { no: 11, name: "Hümeysa YILMAZ", title: "Kat Görevlisi", extension: "2720", group: "İdari Personel" },
  { no: 12, name: "Yunus Emre KAYRA", title: "Kat Görevlisi", extension: "2720", group: "İdari Personel" },
  { no: 13, name: "İlhan ÜNAL", title: "Kat Görevlisi", extension: "2716", group: "İdari Personel" },
  { no: 14, name: "Volkan DAL", title: "Şoför", extension: "2704", group: "İdari Personel" },
  { no: 15, name: "Ayşegül YALÇIN", title: "Güvenlik", extension: "2732", group: "İdari Personel" },
];

let audits = loadAudits();
let approvals = loadApprovals();
let leaves = loadLeaves();
let dutyRecords = loadDutyRecords();
let reportDocuments = loadReportDocuments();
let personnelRecords = loadPersonnelRecords();
let leaveRights = loadLeaveRights();

const searchInput = document.querySelector("#searchInput");
const yearSelect = document.querySelector("#yearSelect");
const auditRows = document.querySelector("#auditRows");
const auditModal = document.querySelector("#auditModal");
const auditForm = document.querySelector("#auditForm");
const newAuditBtn = document.querySelector("#newAuditBtn");
const migrateLocalDataBtn = document.querySelector("#migrateLocalDataBtn");
const closeAuditModal = document.querySelector("#closeAuditModal");
const cancelAudit = document.querySelector("#cancelAudit");
const auditListTitle = document.querySelector("#auditListTitle");
const auditListSummary = document.querySelector("#auditListSummary");
const auditQuickFilter = document.querySelector("#auditQuickFilter");
const auditQuickFilterText = document.querySelector("#auditQuickFilterText");
const clearAuditQuickFilter = document.querySelector("#clearAuditQuickFilter");
const auditModalMode = document.querySelector("#auditModalMode");
const auditModalTitle = document.querySelector("#auditModalTitle");
const saveAuditBtn = document.querySelector("#saveAuditBtn");
const emptyState = document.querySelector("#emptyState");
const typeFilterButtons = Array.from(document.querySelectorAll("#auditSubnav .subnav-item"));
const statFilterCards = Array.from(document.querySelectorAll(".stat-filter"));
const auditMenuToggle = document.querySelector("#auditMenuToggle");
const auditSubnav = document.querySelector("#auditSubnav");
const dashboardNav = document.querySelector("#dashboardNav");
const approvalsNav = document.querySelector("#approvalsNav");
const reportsNav = document.querySelector("#reportsNav");
const monitoringNav = document.querySelector("#monitoringNav");
const adminNav = document.querySelector("#adminNav");
const personnelMenuToggle = document.querySelector("#personnelMenuToggle");
const personnelSubnav = document.querySelector("#personnelSubnav");
const personnelModuleButtons = Array.from(document.querySelectorAll("[data-personnel-module]"));
const leaveMenuToggle = document.querySelector("#leaveMenuToggle");
const leaveSubnav = document.querySelector("#leaveSubnav");
const leaveModuleButtons = Array.from(document.querySelectorAll("[data-leave-module]"));
const topbarSubtitle = document.querySelector("#topbarSubtitle");
const layout = document.querySelector(".layout");
const toast = document.querySelector("#toast");
const authScreen = document.querySelector("#authScreen");
const loginForm = document.querySelector("#loginForm");
const loginError = document.querySelector("#loginError");
const forgotPasswordToggle = document.querySelector("#forgotPasswordToggle");
const forgotPasswordForm = document.querySelector("#forgotPasswordForm");
const forgotPasswordError = document.querySelector("#forgotPasswordError");
const backToLogin = document.querySelector("#backToLogin");
const currentUserBox = document.querySelector("#currentUserBox");
const currentUserLabel = document.querySelector("#currentUserLabel");
const logoutBtn = document.querySelector("#logoutBtn");
const dashboardSections = Array.from(document.querySelectorAll('[data-view="dashboard"]'));
const approvalSections = Array.from(document.querySelectorAll('[data-view="approvals"]'));
const leaveSections = Array.from(document.querySelectorAll('[data-view="leave"]'));
const personnelSections = Array.from(document.querySelectorAll('[data-view="personnel"]'));
const personnelProfileSections = Array.from(document.querySelectorAll('[data-view="personnelProfile"]'));
const reportSections = Array.from(document.querySelectorAll('[data-view="reports"]'));
const monitoringSections = Array.from(document.querySelectorAll('[data-view="monitoring"]'));
const adminSections = Array.from(document.querySelectorAll('[data-view="admin"]'));
const approvalRows = document.querySelector("#approvalRows");
const approvalModal = document.querySelector("#approvalModal");
const approvalForm = document.querySelector("#approvalForm");
const newApprovalBtn = document.querySelector("#newApprovalBtn");
const closeApprovalModal = document.querySelector("#closeApprovalModal");
const cancelApproval = document.querySelector("#cancelApproval");
const approvalVisibleCount = document.querySelector("#approvalVisibleCount");
const approvalSummary = document.querySelector("#approvalSummary");
const approvalYearFilter = document.querySelector("#approvalYearFilter");
const approvalNoFilter = document.querySelector("#approvalNoFilter");
const approvalStatusFilter = document.querySelector("#approvalStatusFilter");
const approvalSearchInput = document.querySelector("#approvalSearchInput");
const clearApprovalFilters = document.querySelector("#clearApprovalFilters");
const approvalEmptyState = document.querySelector("#approvalEmptyState");
const personnelTitle = document.querySelector("#personnelTitle");
const personnelSummary = document.querySelector("#personnelSummary");
const personnelCount = document.querySelector("#personnelCount");
const personnelRows = document.querySelector("#personnelRows");
const personnelEmptyState = document.querySelector("#personnelEmptyState");
const newPersonnelBtn = document.querySelector("#newPersonnelBtn");
const personnelSortButtons = Array.from(document.querySelectorAll("[data-personnel-sort]"));
const backToPersonnelList = document.querySelector("#backToPersonnelList");
const personnelProfileForm = document.querySelector("#personnelProfileForm");
const selectedPersonnelInitials = document.querySelector("#selectedPersonnelInitials");
const selectedPersonnelGroup = document.querySelector("#selectedPersonnelGroup");
const selectedPersonnelName = document.querySelector("#selectedPersonnelName");
const selectedPersonnelMeta = document.querySelector("#selectedPersonnelMeta");
const profilePersonnelStatus = document.querySelector("#profilePersonnelStatus");
const selectedPersonnelAuditCount = document.querySelector("#selectedPersonnelAuditCount");
const selectedPersonnelMonitoringCount = document.querySelector("#selectedPersonnelMonitoringCount");
const selectedPersonnelTrainingTakenCount = document.querySelector("#selectedPersonnelTrainingTakenCount");
const selectedPersonnelTrainingGivenCount = document.querySelector("#selectedPersonnelTrainingGivenCount");
const selectedPersonnelAudits = document.querySelector("#selectedPersonnelAudits");
const selectedPersonnelMonitorings = document.querySelector("#selectedPersonnelMonitorings");
const selectedPersonnelEducation = document.querySelector("#selectedPersonnelEducation");
const auditorOnlyProfileElements = Array.from(document.querySelectorAll(".auditor-only"));
const personnelTitleField = document.querySelector("#personnelTitleField");
const personnelCertificateField = document.querySelector("#personnelCertificateField");
const personnelExpertiseField = document.querySelector("#personnelExpertiseField");
const personnelTitleLabel = document.querySelector("#personnelTitleLabel");
const personnelExpertiseLabel = document.querySelector("#personnelExpertiseLabel");
const profileEducationTitle = document.querySelector("#profileEducationTitle");
const leaveRows = document.querySelector("#leaveRows");
const leaveStats = document.querySelector(".leave-stats");
const leaveOverview = document.querySelector(".leave-overview");
const leaveRightsPanel = document.querySelector("#leaveRightsPanel");
const leaveFilters = document.querySelector(".leave-filters");
const leaveRecordsPanel = document.querySelector("#leaveRecordsPanel");
const leaveModal = document.querySelector("#leaveModal");
const leaveForm = document.querySelector("#leaveForm");
const leavePersonOptions = document.querySelector("#leavePersonOptions");
const newLeaveBtn = document.querySelector("#newLeaveBtn");
const newLeaveRightBtn = document.querySelector("#newLeaveRightBtn");
const newDutyBtn = document.querySelector("#newDutyBtn");
const dutyStatusPanel = document.querySelector("#dutyStatusPanel");
const dutyRows = document.querySelector("#dutyRows");
const dutyEmptyState = document.querySelector("#dutyEmptyState");
const dutyActiveCount = document.querySelector("#dutyActiveCount");
const dutyRecordCount = document.querySelector("#dutyRecordCount");
const dutyTotalDays = document.querySelector("#dutyTotalDays");
const dutyUpcomingLeaveCount = document.querySelector("#dutyUpcomingLeaveCount");
const dutyUpcomingLeaveNames = document.querySelector("#dutyUpcomingLeaveNames");
const dutyYearFilter = document.querySelector("#dutyYearFilter");
const dutyStatusFilter = document.querySelector("#dutyStatusFilter");
const dutySearchInput = document.querySelector("#dutySearchInput");
const clearDutyFilters = document.querySelector("#clearDutyFilters");
const dutyModal = document.querySelector("#dutyModal");
const dutyForm = document.querySelector("#dutyForm");
const dutyPersonOptions = document.querySelector("#dutyPersonOptions");
const closeDutyModal = document.querySelector("#closeDutyModal");
const cancelDuty = document.querySelector("#cancelDuty");
const dutyModalMode = document.querySelector("#dutyModalMode");
const dutyModalTitle = document.querySelector("#dutyModalTitle");
const saveDutyBtn = document.querySelector("#saveDutyBtn");
const leaveActiveSummary = document.querySelector("#leaveActiveSummary");
const leaveActiveCount = document.querySelector("#leaveActiveCount");
const leaveActiveList = document.querySelector("#leaveActiveList");
const leaveUpcomingSummary = document.querySelector("#leaveUpcomingSummary");
const leaveUpcomingCount = document.querySelector("#leaveUpcomingCount");
const leaveUpcomingList = document.querySelector("#leaveUpcomingList");
const closeLeaveModal = document.querySelector("#closeLeaveModal");
const cancelLeave = document.querySelector("#cancelLeave");
const leaveModalMode = document.querySelector("#leaveModalMode");
const leaveModalTitle = document.querySelector("#leaveModalTitle");
const saveLeaveBtn = document.querySelector("#saveLeaveBtn");
const leaveVisibleCount = document.querySelector("#leaveVisibleCount");
const leaveSummary = document.querySelector("#leaveSummary");
const leaveTotalDays = document.querySelector("#leaveTotalDays");
const leaveApprovedCount = document.querySelector("#leaveApprovedCount");
const leavePendingCount = document.querySelector("#leavePendingCount");
const leaveYearFilter = document.querySelector("#leaveYearFilter");
const leaveTypeFilter = document.querySelector("#leaveTypeFilter");
const leaveStatusFilter = document.querySelector("#leaveStatusFilter");
const leaveSearchInput = document.querySelector("#leaveSearchInput");
const clearLeaveFilters = document.querySelector("#clearLeaveFilters");
const leaveEmptyState = document.querySelector("#leaveEmptyState");
const leaveRightSearchInput = document.querySelector("#leaveRightSearchInput");
const leaveRightRows = document.querySelector("#leaveRightRows");
const leaveRightCount = document.querySelector("#leaveRightCount");
const leaveRightModal = document.querySelector("#leaveRightModal");
const leaveRightForm = document.querySelector("#leaveRightForm");
const closeLeaveRightModal = document.querySelector("#closeLeaveRightModal");
const cancelLeaveRight = document.querySelector("#cancelLeaveRight");
const leaveRightModalMode = document.querySelector("#leaveRightModalMode");
const leaveRightModalTitle = document.querySelector("#leaveRightModalTitle");
const saveLeaveRightBtn = document.querySelector("#saveLeaveRightBtn");
const reportArchiveCount = document.querySelector("#reportArchiveCount");
const reportAuditRows = document.querySelector("#reportAuditRows");
const reportArchiveEmpty = document.querySelector("#reportArchiveEmpty");
const reportArchiveSearch = document.querySelector("#reportArchiveSearch");
const reportArchiveTypeFilter = document.querySelector("#reportArchiveTypeFilter");
const reportArchiveLinkFilter = document.querySelector("#reportArchiveLinkFilter");
const monitoringRows = document.querySelector("#monitoringRows");
const monitoringCount = document.querySelector("#monitoringCount");
const monitoringEmptyState = document.querySelector("#monitoringEmptyState");
const monitoringTotalAudits = document.querySelector("#monitoringTotalAudits");
const monitoringCompletedAudits = document.querySelector("#monitoringCompletedAudits");
const monitoringTotalFindings = document.querySelector("#monitoringTotalFindings");
const monitoringCompletedFindings = document.querySelector("#monitoringCompletedFindings");
const monitoringOpenFindings = document.querySelector("#monitoringOpenFindings");
const findingChartSummary = document.querySelector("#findingChartSummary");
const findingDonutChart = document.querySelector("#findingDonutChart");
const findingDonutValue = document.querySelector("#findingDonutValue");
const monitoringYearBars = document.querySelector("#monitoringYearBars");
const monitoringScopeFilter = document.querySelector("#monitoringScopeFilter");
const monitoringStatusFilter = document.querySelector("#monitoringStatusFilter");
const monitoringSearchInput = document.querySelector("#monitoringSearchInput");
const clearMonitoringFilters = document.querySelector("#clearMonitoringFilters");
const monitoringModal = document.querySelector("#monitoringModal");
const monitoringForm = document.querySelector("#monitoringForm");
const monitoringDocumentInfo = document.querySelector("#monitoringDocumentInfo");
const monitoringSelectedFileName = document.querySelector("#monitoringSelectedFileName");
const closeMonitoringModal = document.querySelector("#closeMonitoringModal");
const cancelMonitoring = document.querySelector("#cancelMonitoring");
const documentChoiceModal = document.querySelector("#documentChoiceModal");
const closeDocumentChoiceModal = document.querySelector("#closeDocumentChoiceModal");
const documentChoiceList = document.querySelector("#documentChoiceList");
const deletedAuditsPanel = document.querySelector("#silinen-kayitlar");
const deletedAuditRows = document.querySelector("#deletedAuditRows");
const deletedAuditCount = document.querySelector("#deletedAuditCount");
const sideTotalAudits = document.querySelector("#sideTotalAudits");
const sideActiveAudits = document.querySelector("#sideActiveAudits");
const sideMonitoringAudits = document.querySelector("#sideMonitoringAudits");
const sideCancelledAudits = document.querySelector("#sideCancelledAudits");
const sideUpcomingCount = document.querySelector("#sideUpcomingCount");
const sideUpcomingAudits = document.querySelector("#sideUpcomingAudits");
const sideAuditorLoad = document.querySelector("#sideAuditorLoad");
const sideAuditorLoadCount = document.querySelector("#sideAuditorLoadCount");
const downloadDbBackup = document.querySelector("#downloadDbBackup");
const adminUserForm = document.querySelector("#adminUserForm");
const adminPasswordForm = document.querySelector("#adminPasswordForm");
const adminUsersRows = document.querySelector("#adminUsersRows");
const adminUserCount = document.querySelector("#adminUserCount");
const adminLogRows = document.querySelector("#adminLogRows");
const ownerPanelName = document.querySelector("#ownerPanelName");
const ownerPanelMeta = document.querySelector("#ownerPanelMeta");
let activeTypeFilter = "Tümü";
let activeLeaveModule = "Personel";
let activePersonnelModule = "Denetçiler";
let activeQuickFilter = null;
let selectedPersonnelKey = "";
let creatingPersonnel = false;
let personnelSort = { key: "no", direction: "asc" };
let activeModule = "dashboard";
let editingAuditNo = null;
let editingLeaveId = null;
let editingLeaveRightId = null;
let editingDutyId = null;
let editingMonitoringAudit = null;
let selectedReportAuditKey = "";
let toastTimer = null;
let sharedStateLoaded = false;
let sharedStateSaveTimer = null;
let deletedRecords = [];
let lastSharedRecordJson = {};
let currentUser = null;

const sharedCollections = [
  "audits",
  "approvals",
  "leaves",
  "leaveRights",
  "dutyRecords",
  "reportDocuments",
  "personnelRecords",
];

const typeGroups = {
  "Sistem/Uygunluk": ["Sistem", "Uygunluk", "Sistem/Uygunluk"],
  BT: ["Bilgi Teknolojileri", "BT"],
  Performans: ["Performans"],
  Danışmanlık: ["Danışmanlık"],
  İnceleme: ["İnceleme"],
  "Yönetim Faaliyetleri": ["Yönetim Faaliyetleri"],
};

function loadAudits() {
  const storedAudits = localStorage.getItem("ic-denetim-audits");

  if (!storedAudits) {
    return getDefaultAudits();
  }

  try {
    const parsed = JSON.parse(storedAudits);

    if (!Array.isArray(parsed.audits)) {
      return getDefaultAudits();
    }

    return mergeDefaultAudits(parsed.audits);
  } catch {
    return getDefaultAudits();
  }
}

function getDefaultAudits() {
  return [
    ...defaultAudits.map((audit) => ({ year: "2026", ...audit })),
    ...defaultAudits2025,
  ].map(normalizeAudit);
}

function normalizeAudit(audit) {
  return {
    ...audit,
    year: audit.year || String(audit.start || "2026").slice(0, 4),
    status: audit.status === "Tamamlandı" ? "İzleme Sürecinde" : audit.status,
  };
}

function auditKey(audit) {
  return `${audit.year}-${audit.no}`;
}

function isAuditDeleted(audit) {
  return Boolean(audit.deletedAt);
}

function mergeDefaultAudits(existingAudits) {
  const merged = existingAudits.map(normalizeAudit);
  const existingKeys = new Set(merged.map(auditKey));

  getDefaultAudits().forEach((audit) => {
    if (!existingKeys.has(auditKey(audit))) {
      merged.push(audit);
    }
  });

  return merged;
}

function saveAudits() {
  localStorage.setItem(
    "ic-denetim-audits",
    JSON.stringify({ version: DATA_VERSION, audits }),
  );
  scheduleSharedStateSave();
}

function loadApprovals() {
  const storedApprovals = localStorage.getItem("ic-denetim-approvals");

  if (!storedApprovals) {
    return [...defaultApprovals];
  }

  try {
    const parsed = JSON.parse(storedApprovals);

    if (
      parsed.version !== APPROVAL_DATA_VERSION ||
      !Array.isArray(parsed.approvals)
    ) {
      return [...defaultApprovals];
    }

    return parsed.approvals;
  } catch {
    return [...defaultApprovals];
  }
}

function saveApprovals() {
  localStorage.setItem(
    "ic-denetim-approvals",
    JSON.stringify({ version: APPROVAL_DATA_VERSION, approvals }),
  );
  scheduleSharedStateSave();
}

function loadLeaves() {
  const storedLeaves = localStorage.getItem("ic-denetim-leaves");

  if (!storedLeaves) {
    return [...defaultLeaves];
  }

  try {
    const parsed = JSON.parse(storedLeaves);

    if (parsed.version !== LEAVE_DATA_VERSION || !Array.isArray(parsed.leaves)) {
      return [...defaultLeaves];
    }

    return parsed.leaves;
  } catch {
    return [...defaultLeaves];
  }
}

function saveLeaves() {
  localStorage.setItem(
    "ic-denetim-leaves",
    JSON.stringify({ version: LEAVE_DATA_VERSION, leaves }),
  );
  scheduleSharedStateSave();
}

function loadDutyRecords() {
  const storedDuties = localStorage.getItem("ic-denetim-duties");

  if (!storedDuties) {
    return [...defaultDutyRecords];
  }

  try {
    const parsed = JSON.parse(storedDuties);

    if (!Array.isArray(parsed.dutyRecords)) {
      return [...defaultDutyRecords];
    }

    return parsed.dutyRecords;
  } catch {
    return [...defaultDutyRecords];
  }
}

function saveDutyRecords() {
  localStorage.setItem(
    "ic-denetim-duties",
    JSON.stringify({ version: LEAVE_DATA_VERSION, dutyRecords }),
  );
  scheduleSharedStateSave();
}

function loadLeaveRights() {
  const storedRights = localStorage.getItem("ic-denetim-leave-rights");

  if (!storedRights) {
    return syncLeaveRightsWithPersonnel(defaultLeaveRights);
  }

  try {
    const parsed = JSON.parse(storedRights);

    if (
      parsed.version !== LEAVE_RIGHT_DATA_VERSION ||
      !Array.isArray(parsed.leaveRights)
    ) {
      return syncLeaveRightsWithPersonnel(defaultLeaveRights);
    }

    return syncLeaveRightsWithPersonnel(parsed.leaveRights);
  } catch {
    return syncLeaveRightsWithPersonnel(defaultLeaveRights);
  }
}

function saveLeaveRights() {
  localStorage.setItem(
    "ic-denetim-leave-rights",
    JSON.stringify({ version: LEAVE_RIGHT_DATA_VERSION, leaveRights }),
  );
  scheduleSharedStateSave();
}

function loadReportDocuments() {
  const storedDocuments = localStorage.getItem("ic-denetim-report-documents");

  if (!storedDocuments) {
    return [];
  }

  try {
    const parsed = JSON.parse(storedDocuments);

    if (
      parsed.version !== REPORT_DOCUMENT_DATA_VERSION ||
      !Array.isArray(parsed.reportDocuments)
    ) {
      return [];
    }

    return parsed.reportDocuments;
  } catch {
    return [];
  }
}

function saveReportDocuments() {
  const payload = {
    version: REPORT_DOCUMENT_DATA_VERSION,
    reportDocuments,
  };

  try {
    localStorage.setItem("ic-denetim-report-documents", JSON.stringify(payload));
    scheduleSharedStateSave();
    return true;
  } catch {
    const metadataOnlyDocuments = reportDocuments.map((document) => ({
      ...document,
      fileData: "",
      storageWarning: Boolean(document.fileData),
    }));

    try {
      localStorage.setItem(
        "ic-denetim-report-documents",
        JSON.stringify({
          version: REPORT_DOCUMENT_DATA_VERSION,
          reportDocuments: metadataOnlyDocuments,
        }),
      );
    } catch {
      // Tarayıcı depolama alanı tamamen doluysa en azından mevcut oturumda liste güncellenir.
    }

    alert(
      "Belge kaydı ekranda gösterildi; ancak dosya büyük olduğu için kalıcı indirme sonraki aşamada backend dosya klasörüyle yapılmalı.",
    );
    scheduleSharedStateSave();
    return false;
  }
}

function loadPersonnelRecords() {
  const storedPersonnel = localStorage.getItem("ic-denetim-personnel");

  if (!storedPersonnel) {
    return defaultPersonnelRecords.map((person) => ({
      certificate: "",
      expertise: "",
      status: "Aktif",
      ...person,
    }));
  }

  try {
    const parsed = JSON.parse(storedPersonnel);

    if (!Array.isArray(parsed.personnelRecords)) {
      throw new Error("Personel verisi okunamadı");
    }

    return parsed.personnelRecords.map((person) => ({
      certificate: "",
      expertise: "",
      status: "Aktif",
      ...person,
    }));
  } catch {
    return defaultPersonnelRecords.map((person) => ({
      certificate: "",
      expertise: "",
      status: "Aktif",
      ...person,
    }));
  }
}

function savePersonnelRecords() {
  localStorage.setItem(
    "ic-denetim-personnel",
    JSON.stringify({ personnelRecords }),
  );
  leaveRights = syncLeaveRightsWithPersonnel(leaveRights);
  scheduleSharedStateSave();
}

function buildSharedState() {
  return {
    version: "2026-09-03-sqlite-state-v1",
    audits,
    approvals,
    leaves,
    leaveRights,
    dutyRecords,
    reportDocuments,
    personnelRecords,
    deletedRecords,
  };
}

function getSharedCollectionRecords(collection) {
  if (collection === "audits") {
    return audits;
  }

  if (collection === "approvals") {
    return approvals;
  }

  if (collection === "leaves") {
    return leaves;
  }

  if (collection === "leaveRights") {
    return leaveRights;
  }

  if (collection === "dutyRecords") {
    return dutyRecords;
  }

  if (collection === "reportDocuments") {
    return reportDocuments;
  }

  if (collection === "personnelRecords") {
    return personnelRecords;
  }

  return [];
}

function recordKeyForCollection(collection, record) {
  if (collection === "audits" || collection === "approvals") {
    return `${record.year}-${record.no}`;
  }

  if (collection === "leaves" || collection === "leaveRights" || collection === "dutyRecords") {
    return String(record.id);
  }

  if (collection === "reportDocuments") {
    return record.id || `${record.auditKey}-${record.documentType}-${record.isExtra}`;
  }

  if (collection === "personnelRecords") {
    return personnelKey(record);
  }

  return "";
}

function markRecordDeleted(collection, record) {
  const key = recordKeyForCollection(collection, record);

  if (!key) {
    return;
  }

  deletedRecords.push({ collection, key });
}

function buildSharedSnapshotFromState(state) {
  const snapshot = {};

  sharedCollections.forEach((collection) => {
    snapshot[collection] = {};
    const records = Array.isArray(state[collection]) ? state[collection] : [];

    records.forEach((record) => {
      const key = recordKeyForCollection(collection, record);

      if (key) {
        snapshot[collection][key] = JSON.stringify(record);
      }
    });
  });

  return snapshot;
}

function captureCurrentSharedSnapshot() {
  lastSharedRecordJson = buildSharedSnapshotFromState(buildSharedState());
}

function buildChangedSharedState() {
  const payload = {
    version: "2026-09-03-sqlite-delta-v1",
    deletedRecords,
  };

  sharedCollections.forEach((collection) => {
    const changedRecords = [];
    const previousRecords = lastSharedRecordJson[collection] || {};

    getSharedCollectionRecords(collection).forEach((record) => {
      const key = recordKeyForCollection(collection, record);

      if (!key) {
        return;
      }

      const value = JSON.stringify(record);

      if (previousRecords[key] !== value) {
        changedRecords.push(record);
      }
    });

    if (changedRecords.length) {
      payload[collection] = changedRecords;
    }
  });

  return payload;
}

function hasPendingSharedChanges(payload) {
  return sharedCollections.some((collection) => Array.isArray(payload[collection])) ||
    (Array.isArray(payload.deletedRecords) && payload.deletedRecords.length > 0);
}

function readStoredJson(key) {
  const value = localStorage.getItem(key);

  if (!value) {
    return {};
  }

  try {
    return JSON.parse(value);
  } catch {
    return {};
  }
}

function buildLocalStorageState() {
  const storedAudits = readStoredJson("ic-denetim-audits");
  const storedApprovals = readStoredJson("ic-denetim-approvals");
  const storedLeaves = readStoredJson("ic-denetim-leaves");
  const storedDuties = readStoredJson("ic-denetim-duties");
  const storedLeaveRights = readStoredJson("ic-denetim-leave-rights");
  const storedReportDocuments = readStoredJson("ic-denetim-report-documents");
  const storedPersonnel = readStoredJson("ic-denetim-personnel");

  return {
    version: "2026-09-03-sqlite-state-v1",
    audits: Array.isArray(storedAudits.audits)
      ? mergeDefaultAudits(storedAudits.audits)
      : getDefaultAudits(),
    approvals: Array.isArray(storedApprovals.approvals)
      ? storedApprovals.approvals
      : [...defaultApprovals],
    leaves: Array.isArray(storedLeaves.leaves) ? storedLeaves.leaves : [...defaultLeaves],
    dutyRecords: Array.isArray(storedDuties.dutyRecords)
      ? storedDuties.dutyRecords
      : [...defaultDutyRecords],
    leaveRights: Array.isArray(storedLeaveRights.leaveRights)
      ? storedLeaveRights.leaveRights
      : [...defaultLeaveRights],
    reportDocuments: Array.isArray(storedReportDocuments.reportDocuments)
      ? storedReportDocuments.reportDocuments
      : [],
    personnelRecords: Array.isArray(storedPersonnel.personnelRecords)
      ? storedPersonnel.personnelRecords
      : defaultPersonnelRecords.map((person) => ({
          certificate: "",
          expertise: "",
          status: "Aktif",
          ...person,
        })),
  };
}

function hasSharedState(payload) {
  return (
    payload &&
    (Array.isArray(payload.audits) ||
      Array.isArray(payload.approvals) ||
      Array.isArray(payload.leaves) ||
      Array.isArray(payload.leaveRights) ||
      Array.isArray(payload.dutyRecords) ||
      Array.isArray(payload.reportDocuments) ||
      Array.isArray(payload.personnelRecords))
  );
}

function applySharedState(payload) {
  if (Array.isArray(payload.audits)) {
    audits = payload.audits.map(normalizeAudit);
  }

  if (Array.isArray(payload.approvals)) {
    approvals = payload.approvals;
  }

  if (Array.isArray(payload.leaves)) {
    leaves = payload.leaves;
  }

  if (Array.isArray(payload.dutyRecords)) {
    dutyRecords = payload.dutyRecords;
  }

  if (Array.isArray(payload.leaveRights)) {
    leaveRights = payload.leaveRights;
  }

  if (Array.isArray(payload.reportDocuments)) {
    reportDocuments = payload.reportDocuments;
  }

  if (Array.isArray(payload.personnelRecords)) {
    personnelRecords = payload.personnelRecords.map((person) => ({
      certificate: "",
      expertise: "",
      status: "Aktif",
      ...person,
    }));
  }

  leaveRights = syncLeaveRightsWithPersonnel(leaveRights);
}

async function apiFetch(url, options = {}) {
  const requestOptions = {
    credentials: "same-origin",
    ...options,
  };

  if (requestOptions.body && typeof requestOptions.body !== "string") {
    requestOptions.body = JSON.stringify(requestOptions.body);
    requestOptions.headers = {
      "Content-Type": "application/json",
      ...(requestOptions.headers || {}),
    };
  }

  return fetch(url, requestOptions);
}

async function readApiJson(response, fallbackMessage) {
  const text = await response.text();

  if (!text) {
    return {};
  }

  try {
    return JSON.parse(text);
  } catch {
    throw new Error(fallbackMessage || "Sunucudan beklenmeyen cevap alındı.");
  }
}

function renderAuthState() {
  const isLoggedIn = Boolean(currentUser);

  authScreen.hidden = isLoggedIn;
  currentUserBox.hidden = !isLoggedIn;
  adminNav.hidden = currentUser?.role !== "admin";

  if (isLoggedIn) {
    const currentRoleLabel = currentUser.owner ? "Ana Yönetici" : roleLabel(currentUser.role);
    currentUserLabel.textContent = `${currentUser.displayName || currentUser.username} · ${currentRoleLabel}`;
  }

  if (activeModule === "personnel") {
    renderPersonnel();
  }
}

function showLoginError(message) {
  loginError.textContent = message;
  loginError.hidden = false;
}

function showForgotPasswordError(message) {
  forgotPasswordError.textContent = message;
  forgotPasswordError.hidden = false;
}

async function initAuth() {
  try {
    const response = await apiFetch("/api/me");
    const payload = await response.json();
    currentUser = payload.user || null;
  } catch {
    currentUser = null;
  }

  renderAuthState();

  if (currentUser) {
    await loadSharedState();
    restoreActiveView();
  }
}

async function login(username, password) {
  const response = await apiFetch("/api/login", {
    method: "POST",
    body: { username, password },
  });
  const payload = await readApiJson(response, "Giriş yapılamadı.");

  if (!response.ok) {
    throw new Error(payload.error || "Giriş yapılamadı.");
  }

  currentUser = payload.user;
  renderAuthState();
  sharedStateLoaded = false;
  await loadSharedState();
  restoreActiveView();
}

async function logout() {
  await apiFetch("/api/logout", { method: "POST" });
  currentUser = null;
  sharedStateLoaded = false;
  renderAuthState();
}

async function requestPasswordReset(email) {
  const response = await apiFetch("/api/forgot-password", {
    method: "POST",
    body: { email },
  });
  const payload = await readApiJson(response, "Parola yenileme talebi gönderilemedi.");

  if (!response.ok) {
    throw new Error(payload.error || "Parola yenileme talebi gönderilemedi.");
  }

  return payload.message || "Parola yenileme talebi alındı.";
}

function roleLabel(role) {
  if (role === "admin") {
    return "Yönetici";
  }

  if (role === "viewer") {
    return "Sadece görüntüleme";
  }

  return "Kullanıcı";
}

function canManageUsers() {
  return Boolean(currentUser?.owner);
}

function renderRoleOptions(selectedRole, isOwner) {
  const roles = [
    ["user", "Kullanıcı"],
    ["viewer", "Sadece görüntüleme"],
    ["admin", "Yönetici"],
  ];

  return roles
    .map(
      ([value, label]) =>
        `<option value="${value}" ${selectedRole === value ? "selected" : ""} ${isOwner && value !== "admin" ? "disabled" : ""}>${label}</option>`,
    )
    .join("");
}

async function loadAdminDashboard() {
  if (currentUser?.role !== "admin") {
    return;
  }

  const [usersResponse, logResponse] = await Promise.all([
    apiFetch("/api/admin/users"),
    apiFetch("/api/admin/audit-log"),
  ]);
  const usersPayload = await readApiJson(usersResponse, "Kullanıcı listesi okunamadı.");
  const logPayload = await readApiJson(logResponse, "İşlem geçmişi okunamadı.");
  const users = Array.isArray(usersPayload.users) ? usersPayload.users : [];
  const logs = Array.isArray(logPayload.items) ? logPayload.items : [];
  const ownerUser = users.find((user) => user.owner) || currentUser;
  const userManagementDisabled = !canManageUsers();

  if (ownerUser) {
    ownerPanelName.textContent = ownerUser.displayName || ownerUser.username;
    ownerPanelMeta.textContent = `${ownerUser.username} · Sistem yönetimi ve veritabanı yedekleri`;
  }

  adminUserForm
    ?.querySelectorAll("input, select, button")
    .forEach((control) => {
      control.disabled = userManagementDisabled;
    });

  adminUserCount.textContent = `${users.length} kayıt`;
  adminUsersRows.innerHTML = users
    .map(
      (user) => `
        <div class="admin-user-row" data-admin-user-id="${user.id}">
          <div class="user-edit-grid">
            <div class="user-main">
            <strong>${escapeHtml(user.displayName || user.username)}</strong>
            <small>${escapeHtml(user.username)} · ${escapeHtml(user.email || "E-posta yok")} · ${user.active ? "Aktif" : "Pasif"}</small>
          </div>
            <input data-user-field="displayName" value="${escapeHtml(user.displayName || "")}" aria-label="Ad soyad" ${userManagementDisabled ? "disabled" : ""} />
            <input data-user-field="email" type="email" value="${escapeHtml(user.email || "")}" aria-label="E-posta" ${userManagementDisabled ? "disabled" : ""} />
            <select data-user-field="role" aria-label="Yetki" ${user.owner || userManagementDisabled ? "disabled" : ""}>
              ${renderRoleOptions(user.role, user.owner)}
            </select>
            <select data-user-field="active" aria-label="Durum" ${user.owner || userManagementDisabled ? "disabled" : ""}>
              <option value="1" ${user.active ? "selected" : ""}>Aktif</option>
              <option value="0" ${!user.active ? "selected" : ""}>Pasif</option>
            </select>
            <input data-user-field="password" type="password" placeholder="Yeni parola" aria-label="Yeni parola" ${userManagementDisabled ? "disabled" : ""} />
            <button class="btn small secondary" data-user-action="save" type="button" ${userManagementDisabled ? "disabled" : ""}>Kaydet</button>
            <button class="btn small secondary danger-soft" data-user-action="delete" type="button" ${user.owner || userManagementDisabled ? "disabled" : ""}>Sil</button>
          </div>
          <span class="role-pill ${escapeHtml(user.owner ? "admin" : user.role)}">${user.owner ? "Ana Yönetici" : roleLabel(user.role)}</span>
        </div>
      `,
    )
    .join("");

  adminLogRows.innerHTML = logs.length
    ? logs
        .map(
          (item) => `
            <div class="admin-log-row">
              <strong>${escapeHtml(item.detail)}</strong>
              <small>${escapeHtml(item.username)} · ${escapeHtml(item.action)} · ${escapeHtml(item.createdAt)}</small>
            </div>
          `,
        )
        .join("")
    : `<div class="side-empty">Henüz işlem kaydı yok.</div>`;
}

function renderEverything() {
  renderAudits();
  renderApprovals();
  renderLeaves();

  if (activeModule === "personnel") {
    renderPersonnel();
  }

  if (activeModule === "personnelProfile") {
    renderPersonnelProfile();
  }

  if (activeModule === "admin") {
    loadAdminDashboard();
  }
}

function saveActiveView() {
  localStorage.setItem(
    ACTIVE_VIEW_KEY,
    JSON.stringify({
      module: activeModule,
      leaveModule: activeLeaveModule,
      personnelModule: activePersonnelModule,
    }),
  );
}

function getValidLeaveModule(moduleName) {
  const validModules = new Set(leaveModuleButtons.map((button) => button.dataset.leaveModule));
  return validModules.has(moduleName) ? moduleName : "Personel";
}

function restoreActiveView() {
  const storedView = readStoredJson(ACTIVE_VIEW_KEY);
  const moduleName =
    storedView.module === "admin" && currentUser?.role !== "admin"
      ? "dashboard"
      : storedView.module || "dashboard";

  activeLeaveModule = getValidLeaveModule(storedView.leaveModule || activeLeaveModule);
  leaveModuleButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.leaveModule === activeLeaveModule);
  });

  if (storedView.personnelModule) {
    activePersonnelModule = storedView.personnelModule;
    personnelModuleButtons.forEach((button) => {
      button.classList.toggle("active", button.dataset.personnelModule === activePersonnelModule);
    });
  }

  setActiveModule(moduleName || "dashboard", { skipSave: true });
}

async function saveSharedStateNow() {
  if (!sharedStateLoaded) {
    return;
  }

  try {
    const payload = buildChangedSharedState();

    if (!hasPendingSharedChanges(payload)) {
      return;
    }

    await writeSharedState(payload);
    deletedRecords = [];
    captureCurrentSharedSnapshot();
  } catch (error) {
    showToast(error.message || "Sunucu veritabanına kaydedilemedi. Bağlantıyı kontrol et.");
  }
}

async function writeSharedState(payload) {
  const response = await apiFetch(API_STATE_URL, {
    method: "POST",
    body: payload,
  });

  if (!response.ok) {
    const errorPayload = await response.json().catch(() => ({}));
    throw new Error(errorPayload.error || "SQLite kaydı tamamlanamadı");
  }
}

async function migrateLocalStorageToSqlite() {
  const confirmed = confirm(
    "Bu işlem bu tarayıcıdaki mevcut verileri ortak SQLite veritabanına aktaracak. Devam edilsin mi?",
  );

  if (!confirmed) {
    return;
  }

  try {
    const localState = buildLocalStorageState();
    await writeSharedState(localState);
    applySharedState(localState);
    deletedRecords = [];
    captureCurrentSharedSnapshot();
    sharedStateLoaded = true;
    renderEverything();
    showToast("Yerel veriler SQLite veritabanına aktarıldı.");
  } catch {
    showToast("Aktarım yapılamadı. Sunucunun çalıştığını kontrol et.");
  }
}

function scheduleSharedStateSave() {
  if (!sharedStateLoaded) {
    return;
  }

  clearTimeout(sharedStateSaveTimer);
  sharedStateSaveTimer = setTimeout(saveSharedStateNow, 250);
}

async function loadSharedState() {
  try {
    const response = await apiFetch(API_STATE_URL);

    if (!response.ok) {
      if (response.status === 401) {
        currentUser = null;
        renderAuthState();
        return;
      }

      throw new Error("Ortak veri okunamadı");
    }

    const payload = await response.json();

    if (hasSharedState(payload)) {
      const originalLeaveRightCount = Array.isArray(payload.leaveRights)
        ? payload.leaveRights.length
        : 0;
      applySharedState(payload);
      const shouldSeedLeaveRights = originalLeaveRightCount !== leaveRights.length;
      captureCurrentSharedSnapshot();
      sharedStateLoaded = true;

      if (shouldSeedLeaveRights) {
        lastSharedRecordJson.leaveRights = {};
        await saveSharedStateNow();
      }

      return;
    }

    sharedStateLoaded = true;
    await saveSharedStateNow();
    captureCurrentSharedSnapshot();
  } catch {
    sharedStateLoaded = false;
    showToast("SQLite bağlantısı kurulamadı; veriler bu tarayıcıda geçici kalabilir.");
  }
}

function normalizeText(value) {
  return String(value).trim().toLocaleLowerCase("tr-TR");
}

function formatDate(value) {
  if (!value) {
    return "";
  }

  const [year, month, day] = value.split("-");
  return `${day}.${month}.${year}`;
}

function formatDateRange(audit) {
  return `${formatDate(audit.start)} - ${formatDate(audit.end)}`;
}

function addMonths(dateText, monthCount) {
  if (!dateText) {
    return "";
  }

  const date = new Date(`${dateText}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  date.setMonth(date.getMonth() + monthCount);
  return date.toISOString().slice(0, 10);
}

function parseDateOnly(value) {
  if (!value) {
    return null;
  }

  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function getTodayDateOnly() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

function getDayDifference(fromDate, toDate) {
  return Math.ceil((toDate - fromDate) / 86400000);
}

function getStatusClass(status) {
  if (status === "Tamamlandı" || status === "Yüklendi" || status === "Onaylandı") {
    return "done";
  }

  if (status === "Devam Ediyor" || status === "İzleme Sürecinde") {
    return "progress";
  }

  if (status === "İptal Edildi") {
    return "cancelled";
  }

  return "waiting";
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function cleanPersonName(value) {
  const name = String(value || "")
    .replace(/^[^:]{1,40}:\s*/u, "")
    .replace(/\s*[-–—]\s*(koordinatör|koordinator|denetim gözetim sorumlusu|gözetim sorumlusu)\s*$/iu, "")
    .replace(/\([^)]*\)/gu, "")
    .replace(/\s+/gu, " ")
    .trim();

  if (!name || normalizeText(name) === "tüm iç denetçiler") {
    return "";
  }

  return name;
}

function splitPersonNames(value) {
  return String(value || "")
    .split(/[\n;,]+/u)
    .map(cleanPersonName)
    .filter(Boolean);
}

function uniquePersonNames(names) {
  const seen = new Set();

  return names.filter((name) => {
    const key = normalizeText(name);

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

function uniqueTextValues(values) {
  const seen = new Set();

  return values.filter((value) => {
    const key = normalizeText(value);

    if (!key || seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

function getAuditTeamNames(audit) {
  return uniquePersonNames((audit.team || []).flatMap(splitPersonNames));
}

function getAuditSupervisorNames(audit) {
  return uniquePersonNames(splitPersonNames(audit.supervisor));
}

function getAuditPersonNames(audit) {
  return uniquePersonNames([...getAuditTeamNames(audit), ...getAuditSupervisorNames(audit)]);
}

function renderPersonNames(names) {
  return names.length ? names.map(escapeHtml).join("<br>") : "-";
}

function showToast(message) {
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.hidden = false;
  toastTimer = setTimeout(() => {
    toast.hidden = true;
  }, 2400);
}

function makeSearchText(audit) {
  return [
    audit.year,
    audit.no,
    audit.unit,
    audit.scope,
    audit.type,
    getAuditPersonNames(audit).join(" "),
    audit.team.join(" "),
    audit.supervisor,
    audit.status,
  ].join(" ");
}

function makeApprovalSearchText(approval) {
  return [
    approval.year,
    approval.no,
    approval.date,
    approval.subject,
    approval.related,
    approval.status,
    approval.fileName,
    approval.cloudUrl,
    approval.note,
  ].join(" ");
}

function makeLeaveSearchText(leave) {
  const person = findPersonnelByName(leave.person);

  return [
    leave.year,
    leave.person,
    leave.title,
    person?.title,
    leave.unit,
    leave.type,
    leave.start,
    leave.end,
    leave.days,
    leave.remaining,
    leave.status,
    leave.note,
  ].join(" ");
}

function getLeaveRight(person, year) {
  return leaveRights.find(
    (right) =>
      normalizeText(right.person) === normalizeText(person) &&
      String(right.year) === String(year),
  );
}

function getUsedAnnualLeave(person, year) {
  return leaves
    .filter(
      (leave) =>
        normalizeText(leave.person) === normalizeText(person) &&
        String(leave.year) === String(year) &&
        leave.type === "Yıllık İzin" &&
        leave.status !== "İptal Edildi",
    )
    .reduce((sum, leave) => sum + Number(leave.days || 0), 0);
}

function getRemainingAnnualLeave(person, year) {
  const right = getLeaveRight(person, year);

  if (!right) {
    return "";
  }

  return Number(right.entitled || 0) + Number(right.carried || 0) - getUsedAnnualLeave(person, year);
}

function getPersonnelUnit(person) {
  return person.expertise || person.workArea || "İç Denetim Başkanlığı";
}

function getLeavePersonnel() {
  return personnelRecords
    .filter((person) => (person.status || "Aktif") !== "Pasif")
    .map((person) => ({
      ...person,
      unit: getPersonnelUnit(person),
    }))
    .sort(
      (a, b) =>
        String(a.group).localeCompare(String(b.group), "tr") ||
        Number(a.no || 0) - Number(b.no || 0) ||
        String(a.name).localeCompare(String(b.name), "tr"),
    );
}

function findPersonnelByName(name) {
  return getLeavePersonnel().find(
    (person) => normalizeText(person.name) === normalizeText(name),
  );
}

function renderPersonnelOptions(selectElement, selectedName = "") {
  const people = getLeavePersonnel();
  const isDatalist = selectElement.tagName === "DATALIST";
  selectElement.innerHTML = people
    .map(
      (person) =>
        isDatalist
          ? `<option value="${escapeHtml(person.name)}">${escapeHtml(person.title)}</option>`
          : `<option value="${escapeHtml(person.name)}" ${normalizeText(person.name) === normalizeText(selectedName) ? "selected" : ""}>${escapeHtml(person.name)} · ${escapeHtml(person.title)}</option>`,
    )
    .join("");
}

function applySelectedPersonnelToForm(form) {
  const person = findPersonnelByName(form.elements.person.value);

  if (!person) {
    form.elements.title.value = "";
    form.elements.unit.value = "";
    return;
  }

  form.elements.title.value = person.title || "";
  form.elements.unit.value = person.unit || "İç Denetim Başkanlığı";
}

function syncLeaveRightsWithPersonnel(existingRights = leaveRights) {
  const selectedYears = new Set(["2026"]);
  const sourceRights = Array.isArray(existingRights) ? existingRights : [];
  const people = getLeavePersonnel();
  const peopleByName = new Map(people.map((person) => [normalizeText(person.name), person]));
  const nextRights = [];
  let nextId = Math.max(...sourceRights.map((right) => Number(right.id) || 0), 0);

  sourceRights.forEach((right) => {
    const person = peopleByName.get(normalizeText(right.person));

    if (!person) {
      return;
    }

    selectedYears.add(String(right.year || "2026"));
    nextRights.push({
      ...right,
      person: person.name,
      title: person.title,
      unit: getPersonnelUnit(person),
      group: person.group,
    });
  });

  people.forEach((person) => {
    selectedYears.forEach((year) => {
      const exists = nextRights.some(
        (right) =>
          normalizeText(right.person) === normalizeText(person.name) &&
          String(right.year) === String(year),
      );

      if (exists) {
        return;
      }

      nextId += 1;
      nextRights.push({
        id: nextId,
        year,
        person: person.name,
        title: person.title,
        unit: getPersonnelUnit(person),
        group: person.group,
        entitled: 0,
        carried: 0,
        note: "",
      });
    });
  });

  return nextRights.sort(
    (a, b) =>
      String(a.year).localeCompare(String(b.year)) ||
      String(a.group).localeCompare(String(b.group), "tr") ||
      String(a.person).localeCompare(String(b.person), "tr"),
  );
}

function auditMatchesType(audit) {
  if (activeTypeFilter === "Tümü") {
    return true;
  }

  if (typeGroups[activeTypeFilter]) {
    return typeGroups[activeTypeFilter].includes(audit.type);
  }

  return audit.type === activeTypeFilter;
}

function auditMatchesYear(audit) {
  return yearSelect.value === "Tümü" || String(audit.year) === yearSelect.value;
}

function auditMatchesGroup(audit, groupName) {
  const groupTypes = typeGroups[groupName] || [groupName];
  return groupTypes.includes(audit.type);
}

function getReportArchiveAudits() {
  const query = normalizeText(reportArchiveSearch?.value || "");
  const typeFilter = reportArchiveTypeFilter?.value || "Tümü";
  const linkFilter = reportArchiveLinkFilter?.value || "Tümü";

  return audits
    .filter((audit) => {
      const archiveLink = getReportArchiveLink(audit);
      const matchesYear = !isAuditDeleted(audit) && auditMatchesYear(audit);
      const matchesType = typeFilter === "Tümü" || audit.type === typeFilter;
      const matchesSearch =
        !query ||
        normalizeText(
          `${audit.year} ${audit.no} ${audit.unit} ${audit.scope} ${audit.type} ${getAuditPersonNames(audit).join(" ")} ${audit.team.join(" ")} ${audit.supervisor}`,
        ).includes(query);
      const matchesLink =
        linkFilter === "Tümü" ||
        (linkFilter === "Link Var" && archiveLink) ||
        (linkFilter === "Link Yok" && !archiveLink && audit.status !== "İptal Edildi") ||
        (linkFilter === "İptal Edildi" && audit.status === "İptal Edildi");

      return matchesYear && matchesType && matchesSearch && matchesLink;
    })
    .sort((a, b) => String(a.year).localeCompare(String(b.year)) || a.no - b.no);
}

function getSelectedReportAudit() {
  const selectedKey = selectedReportAuditKey;
  return getReportArchiveAudits().find((audit) => auditKey(audit) === selectedKey);
}

function findReportDocument(audit, documentType) {
  return reportDocuments.find(
    (document) =>
      document.auditKey === auditKey(audit) && document.documentType === documentType,
  );
}

function findReportDocumentIndex(audit, documentType) {
  return reportDocuments.findIndex(
    (document) =>
      document.auditKey === auditKey(audit) &&
      document.documentType === documentType &&
      !document.isExtra,
  );
}

function getReportArchiveLink(audit) {
  return findReportDocument(audit, reportArchiveLinkType);
}

function getReportArchiveLinkIndex(audit) {
  return findReportDocumentIndex(audit, reportArchiveLinkType);
}

function upsertReportDocument(audit, documentRecord) {
  const existingIndex = findReportDocumentIndex(audit, documentRecord.documentType);

  if (existingIndex > -1) {
    reportDocuments[existingIndex] = documentRecord;
  } else {
    reportDocuments.push(documentRecord);
  }

  return saveReportDocuments();
}

function getReportDocumentCount(audit) {
  return getReportArchiveLink(audit) ? 1 : 0;
}

function getExtraReportDocuments(audit) {
  return reportDocuments.filter(
    (document) => document.auditKey === auditKey(audit) && document.isExtra,
  );
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result));
    reader.addEventListener("error", () => reject(reader.error));
    reader.readAsDataURL(file);
  });
}

function getVisibleAudits() {
  const query = normalizeText(searchInput.value);

  return audits.filter((audit) => {
    if (isAuditDeleted(audit)) {
      return false;
    }

    const matchesYear = auditMatchesYear(audit);
    const matchesType = auditMatchesType(audit);
    const matchesSearch = normalizeText(makeSearchText(audit)).includes(query);
    const matchesQuickFilter =
      !activeQuickFilter ||
      (activeQuickFilter.type === "auditor" &&
        getAuditPersonNames(audit).some((name) =>
          normalizeText(name) === normalizeText(activeQuickFilter.value),
        )) ||
      (activeQuickFilter.type === "unit" &&
        normalizeText(audit.unit) === normalizeText(activeQuickFilter.value));

    return matchesYear && matchesType && matchesSearch && matchesQuickFilter;
  }).sort((a, b) => Number(a.no) - Number(b.no));
}

function createAuditRow(audit) {
  const row = document.createElement("tr");
  row.dataset.text = makeSearchText(audit);

  row.innerHTML = `
    <td><span class="audit-no">${audit.no}</span></td>
    <td><span class="date-range">${formatDateRange(audit)}</span></td>
    <td class="unit-cell"><strong>${escapeHtml(audit.unit)}</strong></td>
    <td class="scope-cell">${escapeHtml(audit.scope)}</td>
    <td><span class="type-pill">${escapeHtml(audit.type)}</span></td>
    <td class="team-cell">${renderPersonNames(getAuditTeamNames(audit))}</td>
    <td class="supervisor-cell">${renderPersonNames(getAuditSupervisorNames(audit))}</td>
    <td><span class="status ${getStatusClass(audit.status)}">${escapeHtml(audit.status)}</span></td>
    <td>
      <div class="row-actions">
        <button class="icon-btn action-toggle" data-action="toggle-menu" data-year="${audit.year}" data-no="${audit.no}" aria-label="${audit.no} numaralı kayıt işlemleri">⋮</button>
        <div class="action-menu" data-menu-for="${audit.year}-${audit.no}" hidden>
          <button data-action="edit" data-year="${audit.year}" data-no="${audit.no}" type="button">Düzenle</button>
          <button data-action="monitoring" data-year="${audit.year}" data-no="${audit.no}" type="button">İzleme Sürecine Al</button>
          <button data-action="cancel" data-year="${audit.year}" data-no="${audit.no}" type="button">İptal Et</button>
          <button class="danger" data-action="delete" data-year="${audit.year}" data-no="${audit.no}" type="button">Sil</button>
        </div>
      </div>
    </td>
  `;

  return row;
}

function createReadonlyAuditRow(audit) {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td><span class="audit-no">${audit.no}</span></td>
    <td><span class="date-range">${formatDateRange(audit)}</span></td>
    <td class="unit-cell"><strong>${escapeHtml(audit.unit)}</strong></td>
    <td class="scope-cell">${escapeHtml(audit.scope)}</td>
    <td><span class="type-pill">${escapeHtml(audit.type)}</span></td>
    <td class="team-cell">${renderPersonNames(getAuditTeamNames(audit))}</td>
    <td class="supervisor-cell">${renderPersonNames(getAuditSupervisorNames(audit))}</td>
    <td><span class="status ${getStatusClass(audit.status)}">${escapeHtml(audit.status)}</span></td>
  `;
  return row;
}

function getMonitoringDetails(audit) {
  return {
    auditName: audit.monitoringAuditName || audit.scope,
    officer: audit.monitoringOfficer || audit.supervisor,
    findingCount: Number(audit.findingCount ?? 0),
    openFindingCount: Number(audit.openFindingCount ?? audit.findingCount ?? 0),
    dueDate: audit.monitoringDueDate || addMonths(audit.end, 12),
  };
}

function getMonitoringStatus(details) {
  return details.openFindingCount === 0 ? "İzleme Tamamlandı" : "İzleme Devam Ediyor";
}

function getMonitoringStatusClass(details) {
  return details.openFindingCount === 0 ? "done" : "progress";
}

function isMonitoringAudit(audit) {
  return !isAuditDeleted(audit) && audit.status === "İzleme Sürecinde";
}

function getAllMonitoringAudits() {
  return audits.filter(isMonitoringAudit);
}

function getMonitoringSearchText(audit) {
  const details = getMonitoringDetails(audit);

  return [
    audit.year,
    audit.no,
    audit.unit,
    audit.scope,
    audit.type,
    details.auditName,
    details.officer,
  ].join(" ");
}

function getFilteredMonitoringAudits() {
  const scope = monitoringScopeFilter.value;
  const status = monitoringStatusFilter.value;
  const query = normalizeText(monitoringSearchInput.value);

  return getAllMonitoringAudits()
    .filter((audit) => {
      const details = getMonitoringDetails(audit);
      const isOpen = details.openFindingCount > 0;
      const matchesScope =
        scope === "all" ||
        (scope === "allOpen" && isOpen) ||
        (scope === "year" && auditMatchesYear(audit));
      const matchesStatus =
        status === "Tümü" ||
        (status === "open" && isOpen) ||
        (status === "completed" && !isOpen);
      const matchesSearch =
        !query || normalizeText(getMonitoringSearchText(audit)).includes(query);

      return matchesScope && matchesStatus && matchesSearch;
    })
    .sort((a, b) => String(a.year).localeCompare(String(b.year)) || a.no - b.no);
}

function sumMonitoringField(monitoringAudits, fieldName) {
  return monitoringAudits.reduce((total, audit) => {
    const details = getMonitoringDetails(audit);
    return total + Number(details[fieldName] || 0);
  }, 0);
}

function renderMonitoringYearBars(monitoringAudits) {
  const openFindingsByYear = monitoringAudits.reduce((years, audit) => {
    const details = getMonitoringDetails(audit);
    const openFindings = Number(details.openFindingCount || 0);

    if (openFindings > 0) {
      years[audit.year] = (years[audit.year] || 0) + openFindings;
    }

    return years;
  }, {});
  const entries = Object.entries(openFindingsByYear).sort(([yearA], [yearB]) =>
    String(yearA).localeCompare(String(yearB)),
  );
  const maxOpenFindings = Math.max(...entries.map(([, count]) => count), 1);

  monitoringYearBars.innerHTML = "";

  if (entries.length === 0) {
    monitoringYearBars.innerHTML = `
      <div class="year-bar empty">
        <span>Açık bulgu yok</span>
      </div>
    `;
    return;
  }

  entries.forEach(([year, count]) => {
    const bar = document.createElement("div");
    bar.className = "year-bar";
    bar.innerHTML = `
      <div class="year-bar-meta">
        <strong>${escapeHtml(year)}</strong>
        <span>${count} açık bulgu</span>
      </div>
      <div class="year-bar-track">
        <span style="width:${Math.max((count / maxOpenFindings) * 100, 8)}%"></span>
      </div>
    `;
    monitoringYearBars.append(bar);
  });
}

function renderMonitoringReport(filteredAudits) {
  const allMonitoringAudits = getAllMonitoringAudits();
  const selectedYearAudits = allMonitoringAudits.filter(auditMatchesYear);
  const completedYearAudits = selectedYearAudits.filter(
    (audit) => getMonitoringDetails(audit).openFindingCount === 0,
  );
  const selectedYearFindings = sumMonitoringField(selectedYearAudits, "findingCount");
  const selectedYearOpenFindings = sumMonitoringField(
    selectedYearAudits,
    "openFindingCount",
  );
  const selectedYearCompletedFindings = Math.max(
    selectedYearFindings - selectedYearOpenFindings,
    0,
  );
  const allOpenFindings = sumMonitoringField(
    allMonitoringAudits.filter((audit) => getMonitoringDetails(audit).openFindingCount > 0),
    "openFindingCount",
  );
  const completionRate = selectedYearFindings
    ? Math.round((selectedYearCompletedFindings / selectedYearFindings) * 100)
    : 0;

  monitoringTotalAudits.textContent = selectedYearAudits.length;
  monitoringCompletedAudits.textContent = completedYearAudits.length;
  monitoringTotalFindings.textContent = selectedYearFindings;
  monitoringCompletedFindings.textContent = selectedYearCompletedFindings;
  monitoringOpenFindings.textContent = allOpenFindings;
  findingChartSummary.textContent = `${selectedYearCompletedFindings} tamamlandı, ${selectedYearOpenFindings} devam ediyor`;
  findingDonutChart.style.setProperty("--done", `${completionRate}%`);
  findingDonutValue.textContent = `${completionRate}%`;
  renderMonitoringYearBars(allMonitoringAudits);
  monitoringEmptyState.querySelector("strong").textContent = filteredAudits.length
    ? "İzleme sürecinde denetim yok"
    : "Filtreye uygun izleme kaydı yok";
}

function getMonitoringResultDocument(audit) {
  return findReportDocument(audit, "İzleme Sonuçları Tablosu");
}

function getMonitoringResultDocuments(audit) {
  return reportDocuments.filter(
    (document) =>
      document.auditKey === auditKey(audit) &&
      document.documentType === "İzleme Sonuçları Tablosu",
  );
}

function downloadDocument(documentRecord) {
  if (!documentRecord?.fileData) {
    alert("Bu belge için indirilebilir dosya verisi bulunamadı.");
    return;
  }

  const link = document.createElement("a");
  link.href = documentRecord.fileData;
  link.download = documentRecord.fileName;
  link.click();
}

function openCloudUrl(url) {
  if (!url) {
    alert("Bu kayıt için bulut bağlantısı eklenmemiş.");
    return;
  }

  window.open(url, "_blank", "noopener");
}

function chooseAndDownloadDocument(documents) {
  const downloadableDocuments = documents.filter((document) => document.fileData);

  if (downloadableDocuments.length === 0) {
    alert("İndirilebilir belge bulunamadı.");
    return;
  }

  if (downloadableDocuments.length === 1) {
    downloadDocument(downloadableDocuments[0]);
    return;
  }

  documentChoiceList.innerHTML = "";
  downloadableDocuments.forEach((documentRecord, index) => {
    const button = document.createElement("button");
    button.className = "choice-item";
    button.dataset.documentChoiceIndex = index;
    button.type = "button";
    button.innerHTML = `
      <strong>${escapeHtml(documentRecord.fileName)}</strong>
      <span>İzleme Sonuçları Tablosu</span>
    `;
    documentChoiceList.append(button);
  });
  documentChoiceModal.showModal();

  documentChoiceList.onclick = (event) => {
    const choice = event.target.closest("[data-document-choice-index]");

    if (!choice) {
      return;
    }

    downloadDocument(downloadableDocuments[Number(choice.dataset.documentChoiceIndex)]);
    documentChoiceModal.close();
  };
}

function renderMonitoringDocumentInfo(audit) {
  const documents = getMonitoringResultDocuments(audit);

  monitoringDocumentInfo.innerHTML = documents.length
    ? `
      <strong>Yüklü belgeler</strong>
      <div class="monitoring-document-list">
        ${documents
          .map(
            (documentRecord, index) => `
              <div class="monitoring-document-item">
                <span>${index + 1}. ${escapeHtml(documentRecord.fileName)}</span>
                <div class="document-actions">
                  <button class="btn small secondary" data-monitoring-document-action="download" data-monitoring-document-index="${index}" type="button" ${documentRecord.fileData ? "" : "disabled"}>İndir</button>
                  <button class="btn small secondary" data-monitoring-document-action="rename" data-monitoring-document-index="${index}" type="button">Ad Değiştir</button>
                  <button class="btn small secondary danger-soft" data-monitoring-document-action="delete" data-monitoring-document-index="${index}" type="button">Sil</button>
                </div>
              </div>
            `,
          )
          .join("")}
      </div>
    `
    : `
      <strong>Yüklü belge yok</strong>
      <span>Yeni dosya seçip Kaydet dediğinde izleme sonuçları tablosu bu kayda bağlanır.</span>
    `;
}

function updateMonitoringFilePickerText(audit) {
  const selectedFiles = Array.from(monitoringForm.elements.monitoringResultDocument.files);
  const documents = audit ? getMonitoringResultDocuments(audit) : [];

  if (selectedFiles.length === 1) {
    monitoringSelectedFileName.textContent = selectedFiles[0].name;
    return;
  }

  if (selectedFiles.length > 1) {
    monitoringSelectedFileName.textContent = `${selectedFiles.length} yeni belge seçildi`;
    return;
  }

  monitoringSelectedFileName.textContent = documents.length
    ? `${documents.length} belge yüklü`
    : "Dosya seçilmedi";
}

function createMonitoringRow(audit) {
  const details = getMonitoringDetails(audit);
  const resultDocuments = getMonitoringResultDocuments(audit);
  const row = document.createElement("tr");
  row.dataset.year = audit.year;
  row.dataset.no = audit.no;
  row.innerHTML = `
    <td><span class="audit-no">${escapeHtml(audit.year)}</span></td>
    <td class="unit-cell"><strong>${escapeHtml(audit.unit)}</strong></td>
    <td class="scope-cell">${escapeHtml(details.auditName)}</td>
    <td class="supervisor-cell">${escapeHtml(details.officer)}</td>
    <td><span class="finding-count">${details.findingCount}</span></td>
    <td><span class="finding-count ${details.openFindingCount === 0 ? "done-count" : "progress-count"}">${details.openFindingCount}</span></td>
    <td><span class="date-range">${formatDate(details.dueDate)}</span></td>
    <td><span class="status ${getMonitoringStatusClass(details)}">${getMonitoringStatus(details)}</span></td>
    <td>
      <div class="monitoring-document-cell">
        ${
          resultDocuments.length
            ? `<button class="btn small secondary" data-monitoring-download-options data-year="${audit.year}" data-no="${audit.no}" type="button">İndir</button>`
            : `<span class="status waiting">Yüklenmedi</span>`
        }
      </div>
    </td>
    <td><button class="btn small secondary" data-monitoring-edit data-year="${audit.year}" data-no="${audit.no}" type="button">Düzenle</button></td>
  `;
  return row;
}

function getDeletedAudits() {
  return audits
    .filter((audit) => isAuditDeleted(audit) && auditMatchesYear(audit))
    .sort((a, b) => String(b.deletedAt || "").localeCompare(String(a.deletedAt || "")));
}

function renderDeletedAudits() {
  const deletedAudits = getDeletedAudits();
  deletedAuditsPanel.hidden = activeModule !== "dashboard" || deletedAudits.length === 0;
  deletedAuditCount.textContent = deletedAudits.length;
  deletedAuditRows.innerHTML = "";

  deletedAudits.forEach((audit) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><span class="audit-no">${audit.no}</span></td>
      <td class="unit-cell"><strong>${escapeHtml(audit.unit)}</strong></td>
      <td class="scope-cell">${escapeHtml(audit.scope)}</td>
      <td>${audit.deletedAt ? new Date(audit.deletedAt).toLocaleString("tr-TR") : ""}</td>
      <td><button class="btn small secondary" data-restore-audit data-year="${audit.year}" data-no="${audit.no}" type="button">Geri Al</button></td>
    `;
    deletedAuditRows.append(row);
  });
}

function renderMonitoringAudits() {
  const monitoringAudits = getFilteredMonitoringAudits();
  monitoringCount.textContent = monitoringAudits.length;
  monitoringRows.innerHTML = "";
  monitoringAudits.forEach((audit) => monitoringRows.append(createMonitoringRow(audit)));
  monitoringEmptyState.hidden = monitoringAudits.length > 0;
  renderMonitoringReport(monitoringAudits);
}

function renderAudits(options = {}) {
  const refreshSidePanel = options.refreshSidePanel !== false;
  auditRows.innerHTML = "";
  const visibleAudits = getVisibleAudits();
  const filterLabel = activeQuickFilter?.label || "";

  visibleAudits.forEach((audit) => auditRows.append(createAuditRow(audit)));
  auditListTitle.textContent = filterLabel
    ? filterLabel
    : activeTypeFilter === "Tümü"
      ? "Tüm Denetimler"
      : `${activeTypeFilter} Faaliyetleri`;
  auditListSummary.textContent = filterLabel
    ? `${yearSelect.value} programında bu filtreye uyan ${visibleAudits.length} denetim kaydı listeleniyor.`
    : activeTypeFilter === "Tümü"
      ? `${yearSelect.value} programında toplam ${visibleAudits.length} denetim kaydı listeleniyor.`
      : `${activeTypeFilter} başlığı altında ${visibleAudits.length} faaliyet kaydı listeleniyor.`;
  auditQuickFilter.hidden = !activeQuickFilter;
  auditQuickFilterText.textContent = filterLabel ? `${filterLabel} filtresi` : "";
  emptyState.hidden = visibleAudits.length > 0;
  renderStatCards();
  if (refreshSidePanel) {
    renderDashboardSidePanel();
  }
  renderReportArchive();
  renderDeletedAudits();
  renderMonitoringAudits();
}

function renderReportArchive() {
  const archiveAudits = getReportArchiveAudits();
  const previousValue = selectedReportAuditKey;
  const linkedCount = archiveAudits.filter(getReportArchiveLink).length;
  const cancelledCount = archiveAudits.filter((audit) => audit.status === "İptal Edildi").length;

  reportArchiveCount.textContent = archiveAudits.length;
  reportAuditRows.innerHTML = "";
  reportArchiveEmpty.hidden = archiveAudits.length > 0;
  reportAuditRows.hidden = archiveAudits.length === 0;

  if (archiveAudits.length === 0) {
    selectedReportAuditKey = "";
    return;
  }

  selectedReportAuditKey = archiveAudits.some((audit) => auditKey(audit) === previousValue)
    ? previousValue
    : "";

  archiveAudits.forEach((audit) => {
    const key = auditKey(audit);
    const archiveLink = getReportArchiveLink(audit);
    const isSelected = key === selectedReportAuditKey;
    const isCancelled = audit.status === "İptal Edildi";
    const item = document.createElement("article");
    item.className = "report-audit-item";
    item.classList.toggle("selected", isSelected);
    item.classList.toggle("cancelled", isCancelled);
    item.dataset.reportAuditKey = key;
    item.innerHTML = `
      <div class="report-audit-summary">
        <div class="report-no">
          <span>${audit.year}</span>
          <strong>${audit.no}</strong>
        </div>
        <div class="report-title">
          <h3>${escapeHtml(audit.unit)}</h3>
          <p>${escapeHtml(audit.scope)}</p>
        </div>
        <div class="report-badges">
          <span class="report-type">${escapeHtml(audit.type)}</span>
          ${isCancelled ? `<span class="status cancelled">İptal Edildi</span>` : ""}
          ${!isCancelled ? `<span class="status ${getStatusClass(audit.status)}">${escapeHtml(audit.status)}</span>` : ""}
        </div>
        <div class="report-team">${renderPersonNames(getAuditTeamNames(audit))}</div>
        <div class="report-doc-state">
          <span class="status ${archiveLink ? "done" : "waiting"}">${archiveLink ? "Link Var" : "Link Yok"}</span>
          ${archiveLink ? `<button class="btn small secondary" data-report-document-action="open-link" data-report-document-type="${reportArchiveLinkType}" type="button">Bulutta Aç</button>` : ""}
        </div>
        <button class="icon-btn report-disclosure" data-report-select="${key}" type="button" aria-label="Belge alanını aç veya kapat">${isSelected ? "⌃" : "⌄"}</button>
      </div>
    `;

    if (isSelected) {
      item.append(createReportDocumentPanel(audit));
    }

    reportAuditRows.append(item);
  });

  reportAuditRows.insertAdjacentHTML(
    "afterbegin",
    `
      <div class="archive-overview" aria-label="Rapor arşivi özeti">
        <div>
          <span>Seçili Yıl</span>
          <strong>${escapeHtml(yearSelect.value)}</strong>
        </div>
        <div>
          <span>Denetim</span>
          <strong>${archiveAudits.length}</strong>
        </div>
        <div>
          <span>Link Tanımlı</span>
          <strong>${linkedCount}</strong>
        </div>
        <div>
          <span>İptal</span>
          <strong>${cancelledCount}</strong>
        </div>
      </div>
    `,
  );
}

function createReportDocumentPanel(audit) {
  const archiveLink = getReportArchiveLink(audit);
  const panel = document.createElement("div");
  panel.className = "document-upload-list";
  panel.innerHTML = `
    <div class="document-upload-heading">
      <div>
        <strong>${escapeHtml(audit.year)}/${escapeHtml(audit.no)} - ${escapeHtml(audit.unit)}</strong>
        <span>Bu denetimin tüm olur, yazı, rapor ve ekleri için Bakanlık bulut klasör linki</span>
      </div>
      <span class="status ${archiveLink ? "done" : "waiting"}">${archiveLink ? "Link Tanımlı" : "Link Bekliyor"}</span>
    </div>
    <div class="archive-link-card">
      <div class="archive-link-main">
        <strong>Bulut Klasör Linki</strong>
        <p>${archiveLink ? escapeHtml(archiveLink.cloudUrl) : "Bu denetime ait bulut klasör linki henüz eklenmedi."}</p>
      </div>
      <div class="cloud-link-row">
        <input data-report-cloud-link-type="${reportArchiveLinkType}" type="url" value="${escapeHtml(archiveLink?.cloudUrl || "")}" placeholder="https://bulut.tarimorman.gov.tr/... klasör linki" />
        <button class="btn small primary" data-report-document-action="save-link" data-report-document-type="${reportArchiveLinkType}" type="button">Kaydet</button>
      </div>
      <div class="document-actions">
        <button class="btn small secondary" data-report-document-action="open-link" data-report-document-type="${reportArchiveLinkType}" type="button" ${archiveLink?.cloudUrl ? "" : "disabled"}>Bulutta Aç</button>
        <button class="btn small secondary danger-soft" data-report-document-action="delete" data-report-document-type="${reportArchiveLinkType}" type="button" ${archiveLink ? "" : "disabled"}>Linki Kaldır</button>
      </div>
    </div>
  `;

  return panel;
}

function renderStatCards() {
  statFilterCards.forEach((card) => {
    const filterName = card.dataset.cardFilter;
    const count = audits.filter(
      (audit) =>
        !isAuditDeleted(audit) &&
        auditMatchesYear(audit) &&
        auditMatchesGroup(audit, filterName),
    ).length;
    card.querySelector("[data-count]").textContent = count;
    card.classList.toggle("active", activeTypeFilter === filterName);
  });
}

function getSelectedYearAudits() {
  return audits.filter((audit) => !isAuditDeleted(audit) && auditMatchesYear(audit));
}

function getAuditStartDate(audit) {
  const date = new Date(`${audit.start}T00:00:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function getDaysUntilAudit(audit) {
  const startDate = getAuditStartDate(audit);

  if (!startDate) {
    return null;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.ceil((startDate - today) / 86400000);
}

function renderDashboardSidePanel() {
  const yearAudits = getSelectedYearAudits();
  const activeAudits = yearAudits.filter(
    (audit) => !["İptal Edildi", "İzleme Sürecinde"].includes(audit.status),
  );
  const monitoringAudits = yearAudits.filter((audit) => audit.status === "İzleme Sürecinde");
  const cancelledAudits = yearAudits.filter((audit) => audit.status === "İptal Edildi");
  const unitGroups = new Map();

  yearAudits
    .filter((audit) => audit.status !== "İptal Edildi")
    .forEach((audit) => {
      const key = normalizeText(audit.unit);
      const existing = unitGroups.get(key);

      if (existing) {
        existing.count += 1;
        existing.scopes.push(audit.scope);
        existing.firstNo = Math.min(existing.firstNo, Number(audit.no));
      } else {
        unitGroups.set(key, {
          unit: audit.unit,
          count: 1,
          firstNo: Number(audit.no),
          scopes: [audit.scope],
        });
      }
    });

  const auditUnits = [...unitGroups.values()].sort((a, b) => a.firstNo - b.firstNo);
  const auditorCounts = new Map();

  yearAudits
    .filter((audit) => audit.status !== "İptal Edildi")
    .forEach((audit) => {
      getAuditPersonNames(audit).forEach((auditor) => {
        auditorCounts.set(auditor, (auditorCounts.get(auditor) || 0) + 1);
      });
    });

  const auditorLoad = [...auditorCounts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "tr-TR"));

  sideTotalAudits.textContent = yearAudits.length;
  sideActiveAudits.textContent = activeAudits.length;
  sideMonitoringAudits.textContent = monitoringAudits.length;
  sideCancelledAudits.textContent = cancelledAudits.length;
  sideUpcomingCount.textContent = `${auditUnits.length} birim`;
  sideAuditorLoadCount.textContent = `${auditorLoad.length} kişi`;

  sideUpcomingAudits.innerHTML = auditUnits.length
    ? auditUnits
        .map((audit) => {
          return `
            <button class="side-list-item" data-side-unit="${escapeHtml(audit.unit)}" type="button">
              <span>
                <strong>${escapeHtml(audit.unit)}</strong>
                <small>${escapeHtml(uniqueTextValues(audit.scopes).slice(0, 2).join(" / "))}</small>
              </span>
              <em>${audit.count}</em>
            </button>
          `;
        })
        .join("")
    : `<div class="side-empty">Seçili yıl için denetlenecek birim bulunmuyor.</div>`;

  sideAuditorLoad.innerHTML = auditorLoad.length
    ? auditorLoad
        .map(
          ([auditor, count]) => `
            <button class="side-load-item" data-side-auditor="${escapeHtml(auditor)}" type="button">
              <span>${escapeHtml(auditor)}</span>
              <strong>${count}</strong>
            </button>
          `,
        )
        .join("")
    : `<div class="side-empty">Görev dağılımı bulunmuyor.</div>`;
}

function setActiveTypeFilter(filterName) {
  activeQuickFilter = null;
  activeTypeFilter = filterName;
  typeFilterButtons.forEach((item) => {
    item.classList.toggle("active", item.dataset.typeFilter === filterName);
  });
  renderAudits();
}

function setActiveModule(moduleName, options = {}) {
  if (moduleName === "admin" && currentUser?.role !== "admin") {
    showToast("Yönetim paneli için yönetici yetkisi gerekli.");
    return;
  }

  activeModule = moduleName;

  if (!options.skipSave) {
    saveActiveView();
  }

  const showApprovals = moduleName === "approvals";
  const showLeave = moduleName === "leave";
  const showPersonnel = moduleName === "personnel";
  const showPersonnelProfile = moduleName === "personnelProfile";
  const showReports = moduleName === "reports";
  const showMonitoring = moduleName === "monitoring";
  const showAdmin = moduleName === "admin";
  const showDashboard = moduleName === "dashboard";

  dashboardSections.forEach((section) => {
    section.hidden = !showDashboard;
  });
  approvalSections.forEach((section) => {
    section.hidden = !showApprovals;
  });
  leaveSections.forEach((section) => {
    section.hidden = !showLeave;
  });
  personnelSections.forEach((section) => {
    section.hidden = !showPersonnel;
  });
  personnelProfileSections.forEach((section) => {
    section.hidden = !showPersonnelProfile;
  });
  reportSections.forEach((section) => {
    section.hidden = !showReports;
  });
  monitoringSections.forEach((section) => {
    section.hidden = !showMonitoring;
  });
  adminSections.forEach((section) => {
    section.hidden = !showAdmin;
  });

  dashboardNav.classList.toggle("active", showDashboard);
  approvalsNav.classList.toggle("active", showApprovals);
  reportsNav.classList.toggle("active", showReports);
  monitoringNav.classList.toggle("active", showMonitoring);
  adminNav?.classList.toggle("active", showAdmin);
  leaveMenuToggle.classList.toggle("open", showLeave);
  personnelMenuToggle.classList.toggle("open", showPersonnel || showPersonnelProfile);
  layout.classList.toggle("approvals-mode", showApprovals);
  layout.classList.toggle(
    "focus-mode",
    showApprovals || showLeave || showPersonnel || showPersonnelProfile || showReports || showMonitoring || showAdmin,
  );

  leaveMenuToggle.setAttribute("aria-expanded", String(showLeave));
  leaveSubnav.hidden = !showLeave;

  if (!showPersonnel && !showPersonnelProfile) {
    personnelMenuToggle.setAttribute("aria-expanded", "false");
    personnelMenuToggle.classList.remove("open");
    personnelSubnav.hidden = true;
  }

  if (!showDashboard) {
    auditMenuToggle.setAttribute("aria-expanded", "false");
    auditMenuToggle.classList.remove("open");
    auditSubnav.hidden = true;
  }

  if (showApprovals) {
    document.querySelector("h1").textContent = "Olurlar";
    topbarSubtitle.textContent = "Yıl bazında olur arşivi ve filtreleme ekranı";
    renderApprovals();
    return;
  }

  if (showLeave) {
    document.querySelector("h1").textContent = "İzin Takip";
    topbarSubtitle.textContent = "Personel izin kayıtları, izin türleri ve bakiye takibi";
    renderLeaves();
    return;
  }

  if (showPersonnel) {
    document.querySelector("h1").textContent = "Personel";
    topbarSubtitle.textContent = "Denetçiler ve idari personel kayıt ekranı";
    renderPersonnel();
    return;
  }

  if (showPersonnelProfile) {
    document.querySelector("h1").textContent = "Personel Profili";
    topbarSubtitle.textContent = "Personel bilgileri, aktif görevler, eğitim ve sertifika kayıtları";
    renderPersonnelProfile();
    return;
  }

  if (showReports) {
    document.querySelector("h1").textContent = "Rapor Arşivi";
    topbarSubtitle.textContent = "Seçili yılın denetimlerine ait olur, yazı ve rapor belgeleri";
    renderReportArchive();
    return;
  }

  if (showMonitoring) {
    document.querySelector("h1").textContent = "İzleme Faaliyetleri";
    topbarSubtitle.textContent = "İzleme sürecine alınan denetimler ve takip kayıtları";
    renderMonitoringAudits();
    return;
  }

  if (showAdmin) {
    document.querySelector("h1").textContent = "Yönetim Paneli";
    topbarSubtitle.textContent = "Kullanıcı yetkileri, veri güvenliği ve işlem geçmişi";
    loadAdminDashboard();
    return;
  }

  document.querySelector("h1").textContent = `${yearSelect.value} Faaliyet Paneli`;
  topbarSubtitle.textContent = "Yıllık denetim, olur, eğitim ve izleme takip sistemi";
}

function getNextApprovalNo(year) {
  const yearApprovals = approvals.filter(
    (approval) => String(approval.year) === String(year),
  );
  const lastNo = Math.max(...yearApprovals.map((approval) => Number(approval.no)), 0);
  return lastNo + 1;
}

function getVisibleApprovals() {
  const selectedYear = approvalYearFilter.value;
  const selectedStatus = approvalStatusFilter.value;
  const selectedNo = approvalNoFilter.value.trim();
  const query = normalizeText(approvalSearchInput.value);

  return approvals.filter((approval) => {
    const matchesYear =
      selectedYear === "Tümü" || String(approval.year) === selectedYear;
    const matchesStatus =
      selectedStatus === "Tümü" || approval.status === selectedStatus;
    const matchesNo = !selectedNo || String(approval.no).includes(selectedNo);
    const matchesSearch = normalizeText(makeApprovalSearchText(approval)).includes(
      query,
    );

    return matchesYear && matchesStatus && matchesNo && matchesSearch;
  });
}

function createApprovalRow(approval) {
  const row = document.createElement("tr");
  const fileName = approval.fileName || (approval.cloudUrl ? "Bulut bağlantısı" : "Dosya seçilmedi");

  row.innerHTML = `
    <td><strong>${approval.no}</strong></td>
    <td>${escapeHtml(approval.year)}</td>
    <td>${formatDate(approval.date)}</td>
    <td><strong>${escapeHtml(approval.subject)}</strong></td>
    <td>${escapeHtml(approval.related || "-")}</td>
    <td><span class="status ${getStatusClass(approval.status)}">${escapeHtml(approval.status)}</span></td>
    <td><span class="file-link" title="${escapeHtml(fileName)}">${escapeHtml(fileName)}</span></td>
    <td>
      <button class="btn secondary small" data-approval-action="open" data-year="${escapeHtml(approval.year)}" data-no="${approval.no}" type="button">Aç</button>
    </td>
  `;

  return row;
}

function personnelKey(person) {
  return `${person.group}-${person.no}`;
}

function getSelectedPersonnel() {
  return personnelRecords.find((person) => personnelKey(person) === selectedPersonnelKey);
}

function getNextPersonnelNo(group) {
  const numbers = personnelRecords
    .filter((person) => person.group === group)
    .map((person) => Number(person.no) || 0);
  return numbers.length ? Math.max(...numbers) + 1 : 1;
}

function getPersonnelDraft() {
  return {
    no: getNextPersonnelNo(activePersonnelModule),
    name: "",
    title: activePersonnelModule === "Denetçiler" ? "İç Denetçi" : "",
    extension: "",
    certificate: "",
    expertise: "",
    status: "Aktif",
    group: activePersonnelModule,
  };
}

function sortPersonnelRecords(records) {
  const sorted = [...records];
  const direction = personnelSort.direction === "desc" ? -1 : 1;
  const collator = new Intl.Collator("tr-TR", { sensitivity: "base", numeric: true });

  sorted.sort((a, b) => {
    if (personnelSort.key === "no" || personnelSort.key === "extension") {
      const numberA = Number(a[personnelSort.key]) || 0;
      const numberB = Number(b[personnelSort.key]) || 0;
      return (numberA - numberB) * direction;
    }

    const first = String(a[personnelSort.key] || "");
    const second = String(b[personnelSort.key] || "");
    return collator.compare(first, second) * direction;
  });

  return sorted;
}

function updatePersonnelSortButtons() {
  personnelSortButtons.forEach((button) => {
    const key = button.dataset.personnelSort;
    const icon = button.querySelector("[data-personnel-sort-icon]");
    const isActive = key === personnelSort.key;

    button.classList.toggle("active", isActive);
    button.setAttribute(
      "aria-sort",
      isActive ? (personnelSort.direction === "asc" ? "ascending" : "descending") : "none",
    );

    if (icon) {
      icon.textContent = isActive ? (personnelSort.direction === "asc" ? "↑" : "↓") : "↕";
    }
  });
}

function textIncludesPerson(text, person) {
  return normalizeText(text).includes(normalizeText(person.name));
}

function auditIncludesPerson(audit, person) {
  return (
    audit.team.some((member) => textIncludesPerson(member, person)) ||
    textIncludesPerson(audit.supervisor, person)
  );
}

function monitoringIncludesPerson(audit, person) {
  const details = getMonitoringDetails(audit);
  return textIncludesPerson(details.officer, person) || auditIncludesPerson(audit, person);
}

function getActivePersonnelAudits(person) {
  return audits
    .filter(
      (audit) =>
        !isAuditDeleted(audit) &&
        audit.status !== "İptal Edildi" &&
        audit.status !== "İzleme Sürecinde" &&
        auditIncludesPerson(audit, person),
    )
    .sort((a, b) => String(a.year).localeCompare(String(b.year)) || a.no - b.no);
}

function getActivePersonnelMonitorings(person) {
  return audits
    .filter((audit) => {
      const details = getMonitoringDetails(audit);
      return (
        isMonitoringAudit(audit) &&
        details.openFindingCount > 0 &&
        monitoringIncludesPerson(audit, person)
      );
    })
    .sort((a, b) => String(a.year).localeCompare(String(b.year)) || a.no - b.no);
}

function createPersonnelLinkedItem(audit, variant = "audit") {
  const details = variant === "monitoring" ? getMonitoringDetails(audit) : null;
  const title = variant === "monitoring" ? details.auditName : audit.scope;
  const meta =
    variant === "monitoring"
      ? `${details.openFindingCount} açık bulgu • Son tarih: ${formatDate(details.dueDate)}`
      : `${formatDateRange(audit)} • ${audit.status}`;
  const badgeText = variant === "monitoring" ? "Aktif İzleme" : "Aktif Denetim";

  return `
    <article class="personnel-linked-item">
      <div>
        <strong>${escapeHtml(audit.year)}/${audit.no} - ${escapeHtml(audit.unit)}</strong>
        <span>${escapeHtml(title)}</span>
        <small>${escapeHtml(meta)}</small>
      </div>
      <span class="status ${variant === "monitoring" ? "progress" : getStatusClass(audit.status)}">${badgeText}</span>
    </article>
  `;
}

function getPersonnelInitials(name) {
  return name
    .replace(/\b(Dr\.|M\.)\b/gi, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toLocaleUpperCase("tr-TR");
}

function renderPersonnelProfile() {
  const person = creatingPersonnel ? getPersonnelDraft() : getSelectedPersonnel();

  if (!person) {
    setActiveModule("personnel");
    return;
  }

  const isAuditor = person.group === "Denetçiler";
  const activeAudits = creatingPersonnel ? [] : getActivePersonnelAudits(person);
  const activeMonitorings =
    !creatingPersonnel && isAuditor ? getActivePersonnelMonitorings(person) : [];

  auditorOnlyProfileElements.forEach((element) => {
    element.hidden = !isAuditor;
  });
  personnelTitleLabel.textContent = isAuditor ? "Unvanı" : "Görev";
  personnelCertificateField.hidden = !isAuditor;
  personnelExpertiseLabel.textContent = isAuditor ? "Uzmanlık / Görev Alanı" : "Görev Yaptığı Alan";
  personnelProfileForm.elements.certificate.required = false;
  profileEducationTitle.textContent = isAuditor ? "Eğitim ve Sertifika" : "Görev Alanı";
  selectedPersonnelInitials.textContent = creatingPersonnel ? "+" : getPersonnelInitials(person.name);
  selectedPersonnelGroup.textContent = person.group;
  selectedPersonnelName.textContent = creatingPersonnel ? "Yeni Personel" : person.name;
  selectedPersonnelMeta.textContent = creatingPersonnel
    ? `${person.group} listesine yeni kayıt eklenecek`
    : `${person.title} • Dahili ${person.extension}`;
  profilePersonnelStatus.textContent = person.status || "Aktif";
  profilePersonnelStatus.className = `status ${(person.status || "Aktif") === "Aktif" ? "done" : "waiting"}`;
  selectedPersonnelAuditCount.textContent = activeAudits.length;
  selectedPersonnelMonitoringCount.textContent = activeMonitorings.length;
  selectedPersonnelTrainingTakenCount.textContent = "0";
  selectedPersonnelTrainingGivenCount.textContent = "0";
  personnelProfileForm.elements.name.value = person.name;
  personnelProfileForm.elements.title.value = person.title;
  personnelProfileForm.elements.extension.value = person.extension;
  personnelProfileForm.elements.certificate.value = person.certificate || "";
  personnelProfileForm.elements.expertise.value = person.expertise || "";
  personnelProfileForm.elements.status.value = person.status || "Aktif";

  selectedPersonnelAudits.innerHTML = activeAudits.length
    ? activeAudits.map((audit) => createPersonnelLinkedItem(audit)).join("")
    : `<div class="empty-inline">Aktif denetim bulunmuyor.</div>`;
  selectedPersonnelMonitorings.innerHTML = activeMonitorings.length
    ? activeMonitorings
        .map((audit) => createPersonnelLinkedItem(audit, "monitoring"))
        .join("")
    : `<div class="empty-inline">Aktif izleme bulunmuyor.</div>`;
  selectedPersonnelEducation.innerHTML = isAuditor
    ? `
      <article class="personnel-linked-item soft">
        <div>
          <strong>Sertifika derecesi</strong>
          <span>${escapeHtml(person.certificate || "Henüz tanımlanmadı")}</span>
        </div>
        <span class="status ${person.certificate ? "done" : "waiting"}">${person.certificate ? "Tanımlı" : "Bekliyor"}</span>
      </article>
      <article class="personnel-linked-item soft">
        <div>
          <strong>Uzmanlık alanı</strong>
          <span>${escapeHtml(person.expertise || "Henüz tanımlanmadı")}</span>
        </div>
        <span class="status progress">Profil</span>
      </article>
      <article class="personnel-linked-item soft">
        <div>
          <strong>Aldığı ve verdiği eğitimler</strong>
          <span>Eğitim modülü bağlandığında otomatik listelenecek.</span>
        </div>
        <span class="status progress">Hazır alan</span>
      </article>
    `
    : `
      <article class="personnel-linked-item soft">
        <div>
          <strong>Görev</strong>
          <span>${escapeHtml(person.title || "Henüz tanımlanmadı")}</span>
        </div>
        <span class="status progress">Profil</span>
      </article>
      <article class="personnel-linked-item soft">
        <div>
          <strong>Görev yaptığı alan</strong>
          <span>${escapeHtml(person.expertise || "Henüz tanımlanmadı")}</span>
        </div>
        <span class="status ${person.expertise ? "done" : "waiting"}">${person.expertise ? "Tanımlı" : "Bekliyor"}</span>
      </article>
    `;
}

function renderApprovals() {
  approvalRows.innerHTML = "";
  const visibleApprovals = getVisibleApprovals();

  visibleApprovals
    .sort((a, b) => Number(a.no) - Number(b.no))
    .forEach((approval) => approvalRows.append(createApprovalRow(approval)));

  approvalVisibleCount.textContent = visibleApprovals.length;
  approvalSummary.textContent =
    approvalYearFilter.value === "Tümü"
      ? `Tüm yıllarda toplam ${approvals.length} olur kaydı var.`
      : `${approvalYearFilter.value} yılında toplam ${
          approvals.filter((approval) => approval.year === approvalYearFilter.value)
            .length
        } olur kaydı var.`;
  approvalEmptyState.hidden = visibleApprovals.length > 0;
}

function renderPersonnel() {
  const visiblePersonnel = sortPersonnelRecords(
    personnelRecords.filter((person) => person.group === activePersonnelModule),
  );
  const canManagePersonnel = Boolean(currentUser?.owner);

  personnelTitle.textContent = activePersonnelModule;
  personnelSummary.textContent =
    activePersonnelModule === "Denetçiler"
      ? "İç denetçi kayıtları, uzmanlık alanları ve görev bilgileri"
      : "İdari personel kayıtları, görev alanları ve iletişim bilgileri";
  personnelCount.textContent = visiblePersonnel.length;
  newPersonnelBtn.hidden = !canManagePersonnel;
  personnelRows.innerHTML = "";
  updatePersonnelSortButtons();

  visiblePersonnel.forEach((person) => {
    const row = document.createElement("tr");
    const key = personnelKey(person);
    row.dataset.personnelKey = key;
    row.innerHTML = `
      <td><span class="audit-no">${person.no}</span></td>
      <td class="unit-cell"><strong>${escapeHtml(person.name)}</strong></td>
      <td><span class="type-pill">${escapeHtml(person.title)}</span></td>
      <td><strong>${escapeHtml(person.extension)}</strong></td>
      <td>
        <div class="inline-actions compact-actions">
          <button class="btn small secondary" data-personnel-open="${key}" type="button">Profili Aç</button>
          ${
            canManagePersonnel
              ? `<button class="btn small secondary danger-soft" data-personnel-delete="${key}" type="button">Sil</button>`
              : ""
          }
        </div>
      </td>
    `;
    personnelRows.append(row);
  });

  personnelEmptyState.hidden = visiblePersonnel.length > 0;
}

function getVisibleLeaves() {
  const selectedYear = leaveYearFilter.value;
  const selectedType = leaveTypeFilter.value;
  const selectedStatus = leaveStatusFilter.value;
  const query = normalizeText(leaveSearchInput.value);
  const moduleType =
    activeLeaveModule === "Tümü" ||
    activeLeaveModule === "Personel" ||
    activeLeaveModule === "Bakiye"
      ? "Tümü"
      : activeLeaveModule;

  return leaves.filter((leave) => {
    const matchesYear = selectedYear === "Tümü" || leave.year === selectedYear;
    const matchesModule = moduleType === "Tümü" || leave.type === moduleType;
    const matchesType = selectedType === "Tümü" || leave.type === selectedType;
    const matchesStatus =
      selectedStatus === "Tümü" || leave.status === selectedStatus;
    const matchesSearch = normalizeText(makeLeaveSearchText(leave)).includes(query);

    return matchesYear && matchesModule && matchesType && matchesStatus && matchesSearch;
  });
}

function createLeaveRow(leave) {
  const row = document.createElement("tr");
  const person = findPersonnelByName(leave.person);
  const title = leave.title || person?.title || "-";
  const unit = leave.unit || person?.unit || "-";
  const calculatedRemaining =
    leave.type === "Yıllık İzin"
      ? getRemainingAnnualLeave(leave.person, leave.year)
      : leave.remaining;

  row.innerHTML = `
    <td><strong>${escapeHtml(leave.person)}</strong></td>
    <td><span class="type-pill">${escapeHtml(title)}</span></td>
    <td>${escapeHtml(unit)}</td>
    <td>${escapeHtml(leave.type)}</td>
    <td>${formatDate(leave.start)}</td>
    <td>${formatDate(leave.end)}</td>
    <td><strong>${escapeHtml(leave.days)}</strong></td>
    <td>${calculatedRemaining === "" ? "-" : escapeHtml(calculatedRemaining)}</td>
    <td><span class="status ${getStatusClass(leave.status)}">${escapeHtml(leave.status)}</span></td>
    <td>${escapeHtml(leave.note || "-")}</td>
    <td>
      <div class="inline-actions">
        <button class="btn secondary small" data-leave-action="edit" data-id="${leave.id}" type="button">Düzenle</button>
        <button class="btn secondary small" data-leave-action="cancel" data-id="${leave.id}" type="button">İptal</button>
        <button class="btn secondary small" data-leave-action="delete" data-id="${leave.id}" type="button">Sil</button>
      </div>
    </td>
  `;

  return row;
}

function createLeaveOverviewItem(leave, variant) {
  const person = findPersonnelByName(leave.person);
  const title = leave.title || person?.title || "-";
  const today = getTodayDateOnly();
  const startDate = parseDateOnly(leave.start);
  const endDate = parseDateOnly(leave.end);
  const dayText =
    variant === "active"
      ? `${Math.max(getDayDifference(today, endDate), 0)} gün sonra işbaşı`
      : `${Math.max(getDayDifference(today, startDate), 0)} gün sonra`;

  return `
    <article class="leave-overview-item ${variant}">
      <div class="leave-person-line">
        <strong>${escapeHtml(leave.person)}</strong>
        <span class="type-pill">${escapeHtml(title)}</span>
      </div>
      <div class="leave-overview-meta">
        <span>${escapeHtml(leave.type)}</span>
        <span>${formatDate(leave.start)} - İşbaşı ${formatDate(leave.end)}</span>
      </div>
      <div class="leave-overview-foot">
        <span class="status ${getStatusClass(leave.status)}">${escapeHtml(leave.status)}</span>
        <strong>${escapeHtml(dayText)}</strong>
      </div>
    </article>
  `;
}

function matchesSelectedRecordYear(record, year) {
  return year === "Tümü" || String(record.year || String(record.start || "").slice(0, 4)) === String(year);
}

function renderLeaveOverview() {
  const today = getTodayDateOnly();
  const activeLeaves = leaves.filter((leave) => matchesSelectedRecordYear(leave, leaveYearFilter.value))
    .filter((leave) => {
      if (leave.status !== "Onaylandı") {
        return false;
      }

      const startDate = parseDateOnly(leave.start);
      const endDate = parseDateOnly(leave.end);
      return startDate && endDate && startDate <= today && endDate > today;
    })
    .sort((a, b) => String(a.end).localeCompare(String(b.end)));
  const upcomingLeaves = leaves.filter((leave) => matchesSelectedRecordYear(leave, leaveYearFilter.value))
    .filter((leave) => {
      if (leave.status === "İptal Edildi") {
        return false;
      }

      const startDate = parseDateOnly(leave.start);
      return startDate && startDate > today;
    })
    .sort((a, b) => String(a.start).localeCompare(String(b.start)))
    .slice(0, 6);

  leaveActiveCount.textContent = activeLeaves.length;
  leaveUpcomingCount.textContent = upcomingLeaves.length;
  leaveActiveSummary.textContent = activeLeaves.length
    ? "Bugün izinli görünen personel"
    : "Bugün için aktif izin görünmüyor";
  leaveUpcomingSummary.textContent = upcomingLeaves.length
    ? "Başlama tarihi en yakın izinler"
    : "Yaklaşan izin kaydı bulunmuyor";
  leaveActiveList.innerHTML = activeLeaves.length
    ? activeLeaves.map((leave) => createLeaveOverviewItem(leave, "active")).join("")
    : `<div class="empty-inline">Bugün izinde olan personel bulunmuyor.</div>`;
  leaveUpcomingList.innerHTML = upcomingLeaves.length
    ? upcomingLeaves.map((leave) => createLeaveOverviewItem(leave, "upcoming")).join("")
    : `<div class="empty-inline">Yaklaşan izin başlangıcı bulunmuyor.</div>`;
}

function getDutyEndDate(duty) {
  return duty.returnDate || new Date().toISOString().slice(0, 10);
}

function getDutyDayCount(duty) {
  const startDate = parseDateOnly(duty.start);
  const endDate = parseDateOnly(getDutyEndDate(duty));

  if (!startDate || !endDate || endDate < startDate) {
    return 0;
  }

  return getDayDifference(startDate, endDate) + 1;
}

function makeDutySearchText(duty) {
  return [
    duty.year,
    duty.person,
    duty.title,
    duty.unit,
    duty.dutyName,
    duty.dutyPlace,
    duty.start,
    duty.returnDate,
    duty.status,
    duty.note,
  ].join(" ");
}

function getCurrentPersonLeave(personName) {
  const today = getTodayDateOnly();

  return leaves
    .filter((leave) => {
      if (!matchesSelectedRecordYear(leave, dutyYearFilter.value) || leave.status !== "Onaylandı") {
        return false;
      }

      const startDate = parseDateOnly(leave.start);
      const endDate = parseDateOnly(leave.end);
      return (
        normalizeText(leave.person) === normalizeText(personName) &&
        startDate &&
        endDate &&
        startDate <= today &&
        endDate > today
      );
    })
    .sort((a, b) => String(b.start).localeCompare(String(a.start)))[0];
}

function getCurrentPersonDuty(personName) {
  const today = getTodayDateOnly();

  return dutyRecords
    .filter(
      (duty) => {
        const startDate = parseDateOnly(duty.start);
        return (
          normalizeText(duty.person) === normalizeText(personName) &&
          matchesSelectedRecordYear(duty, dutyYearFilter.value) &&
          duty.status === "Görevde" &&
          startDate &&
          startDate <= today
        );
      },
    )
    .sort((a, b) => String(b.start).localeCompare(String(a.start)))[0];
}

function getDutyHistoryForPerson(personName, year) {
  return dutyRecords.filter(
    (duty) =>
      normalizeText(duty.person) === normalizeText(personName) &&
      (year === "Tümü" || duty.year === year),
  );
}

function getPersonnelStatusRecord(person) {
  const selectedYear = dutyYearFilter.value;
  const currentDuty = getCurrentPersonDuty(person.name);
  const currentLeave = getCurrentPersonLeave(person.name);
  const yearlyDuties = getDutyHistoryForPerson(person.name, selectedYear);
  const latestDuty = yearlyDuties
    .slice()
    .sort((a, b) => String(b.start).localeCompare(String(a.start)))[0];
  const yearlyDutyDays = yearlyDuties.reduce((sum, duty) => sum + getDutyDayCount(duty), 0);

  if (currentDuty) {
    return {
      person,
      status: "Görevde",
      place: currentDuty.dutyPlace || currentDuty.unit || "-",
      detail: currentDuty.dutyName || "Görev",
      start: currentDuty.start,
      end: currentDuty.returnDate || "",
      dutyCount: yearlyDuties.length,
      dutyDays: yearlyDutyDays,
      duty: currentDuty,
      latestDuty,
    };
  }

  if (currentLeave) {
    const isReport = currentLeave.type === "Rapor";
    const isDutyLeave = currentLeave.type === "Görev İzni";
    return {
      person,
      status: isReport ? "Raporlu" : isDutyLeave ? "Görev İzninde" : "İzinde",
      place: currentLeave.type,
      detail: currentLeave.note || currentLeave.type,
      start: currentLeave.start,
      end: currentLeave.end,
      dutyCount: yearlyDuties.length,
      dutyDays: yearlyDutyDays,
      duty: null,
      latestDuty,
    };
  }

  return {
    person,
    status: "Birimde",
    place: person.unit || getPersonnelUnit(person),
    detail: person.group || "Personel",
    start: "",
    end: "",
    dutyCount: yearlyDuties.length,
    dutyDays: yearlyDutyDays,
    duty: null,
    latestDuty,
  };
}

function makePersonnelStatusSearchText(record) {
  return [
    record.person.name,
    record.person.title,
    record.person.unit,
    record.status,
    record.place,
    record.detail,
    record.start,
    record.end,
    record.dutyCount,
    record.dutyDays,
  ].join(" ");
}

function getVisiblePersonnelStatuses() {
  const selectedStatus = dutyStatusFilter.value;
  const query = normalizeText(dutySearchInput.value);

  return getLeavePersonnel()
    .map(getPersonnelStatusRecord)
    .filter((record) => {
      const matchesStatus =
        selectedStatus === "Tümü" ||
        record.status === selectedStatus ||
        (selectedStatus === "Döndü" &&
          record.dutyCount > 0 &&
          record.status !== "Görevde");
      const matchesSearch = normalizeText(makePersonnelStatusSearchText(record)).includes(query);
      return matchesStatus && matchesSearch;
    })
    .sort((a, b) => {
      const order = { Görevde: 1, "Görev İzninde": 2, İzinde: 3, Raporlu: 4, Birimde: 5 };
      return (
        (order[a.status] || 9) - (order[b.status] || 9) ||
        String(a.person.name).localeCompare(String(b.person.name), "tr")
      );
    });
}

function createDutyRow(record) {
  const row = document.createElement("tr");
  const statusClass =
    record.status === "Birimde"
      ? "done"
      : record.status === "Görevde"
        ? "progress"
        : record.status === "Görev İzninde"
          ? "progress"
          : record.status === "Raporlu"
            ? "waiting"
            : "leave";
  const currentDutyId = record.duty?.id || "";
  const latestDutyId = record.latestDuty?.id || "";

  row.innerHTML = `
    <td><strong>${escapeHtml(record.person.name)}</strong></td>
    <td><span class="type-pill">${escapeHtml(record.person.title || "-")}</span></td>
    <td><span class="status ${statusClass}">${escapeHtml(record.status)}</span></td>
    <td>
      <strong>${escapeHtml(record.place || "-")}</strong>
      <small class="table-note">${escapeHtml(record.detail || "")}</small>
    </td>
    <td>${record.start ? formatDate(record.start) : "-"}</td>
    <td>${record.end ? formatDate(record.end) : "-"}</td>
    <td><strong>${escapeHtml(record.dutyDays)}</strong> gün / ${escapeHtml(record.dutyCount)} kayıt</td>
    <td>
      <div class="inline-actions">
        <button class="btn secondary small" data-duty-action="history" data-person="${escapeHtml(record.person.name)}" type="button">Geçmiş</button>
        ${
          record.status === "Görevde"
            ? `<button class="btn secondary small" data-duty-action="edit" data-id="${currentDutyId}" type="button">Düzenle</button>
               <button class="btn secondary small" data-duty-action="return" data-id="${currentDutyId}" type="button">Döndü</button>`
            : latestDutyId
              ? `<button class="btn secondary small" data-duty-action="edit" data-id="${latestDutyId}" type="button">Son Görevi Düzenle</button>`
            : ""
        }
      </div>
    </td>
  `;

  return row;
}

function showDutyHistory(personName) {
  const selectedYear = dutyYearFilter.value;
  const history = getDutyHistoryForPerson(personName, selectedYear)
    .sort((a, b) => String(b.start).localeCompare(String(a.start)));

  if (!history.length) {
    showToast("Bu personel için seçili yılda görev geçmişi yok.");
    return;
  }

  const lines = history.map(
    (duty, index) =>
      `${index + 1}. ${duty.dutyName || "Görev"} - ${duty.dutyPlace || "-"} (${formatDate(duty.start)} - ${
        duty.returnDate ? formatDate(duty.returnDate) : "Devam ediyor"
      }, ${getDutyDayCount(duty)} gün)`,
  );

  alert(`${personName} görev geçmişi\n\n${lines.join("\n")}`);
}

function getUpcomingDutyLeaves() {
  const today = getTodayDateOnly();
  const limit = new Date(today);
  limit.setDate(limit.getDate() + 30);
  return leaves.filter((leave) => {
    const start = parseDateOnly(leave.start);
    return matchesSelectedRecordYear(leave, dutyYearFilter.value) && leave.status === "Onaylandı" && start && start > today && start <= limit;
  }).sort((a, b) => String(a.start).localeCompare(String(b.start)));
}

function renderDutyRecords() {
  const visibleStatuses = getVisiblePersonnelStatuses();
  const allStatuses = getLeavePersonnel().map(getPersonnelStatusRecord);
  const activeDuties = dutyRecords.filter((duty) => matchesSelectedRecordYear(duty, dutyYearFilter.value) && duty.status === "Görevde");
  const unavailablePeople = allStatuses.filter((record) =>
    ["Görev İzninde", "İzinde", "Raporlu"].includes(record.status),
  );
  const officePeople = allStatuses.filter((record) => record.status === "Birimde");
  const upcoming = getUpcomingDutyLeaves();
  const people = new Map();
  upcoming.forEach((leave) => {
    const key = normalizeText(leave.person);
    if (!people.has(key)) people.set(key, leave);
  });

  dutyRows.innerHTML = "";
  visibleStatuses.forEach((record) => dutyRows.append(createDutyRow(record)));
  dutyActiveCount.textContent = officePeople.length;
  dutyRecordCount.textContent = activeDuties.length;
  dutyTotalDays.textContent = unavailablePeople.length;
  dutyUpcomingLeaveCount.textContent = people.size;
  dutyUpcomingLeaveNames.textContent = people.size
    ? Array.from(people.values()).map((leave) => `${leave.person} · ${formatDate(leave.start)}`).join("; ")
    : "Yaklaşan onaylı izin yok.";
  dutyEmptyState.hidden = visibleStatuses.length > 0;
}

function createLeaveRightRow(right) {
  const row = document.createElement("tr");
  const person = findPersonnelByName(right.person);
  const title = right.title || person?.title || "-";
  const unit = right.unit || person?.unit || "-";
  const used = getUsedAnnualLeave(right.person, right.year);
  const totalRight = Number(right.entitled || 0) + Number(right.carried || 0);
  const remaining = totalRight - used;

  row.innerHTML = `
    <td><strong>${escapeHtml(right.person)}</strong></td>
    <td><span class="type-pill">${escapeHtml(title)}</span></td>
    <td>${escapeHtml(unit)}</td>
    <td>${escapeHtml(right.year)}</td>
    <td><strong>${escapeHtml(totalRight)}</strong></td>
    <td>${escapeHtml(used)}</td>
    <td>${escapeHtml(remaining)}</td>
    <td>${escapeHtml(right.note || "-")}</td>
    <td>
      <div class="inline-actions">
        <button class="btn secondary small" data-leave-right-action="edit" data-id="${right.id}" type="button">Değiştir</button>
        <button class="btn secondary small" data-leave-right-action="delete" data-id="${right.id}" type="button">Sil</button>
      </div>
    </td>
  `;

  return row;
}

function renderLeaveRights() {
  leaveRights = syncLeaveRightsWithPersonnel(leaveRights);
  leaveRightRows.innerHTML = "";
  const selectedYear = leaveYearFilter.value;
  const query = normalizeText(leaveRightSearchInput.value);
  const visibleRights = leaveRights.filter((right) => {
    const matchesYear = selectedYear === "Tümü" || right.year === selectedYear;
    const matchesSearch = normalizeText(
      [right.person, right.title, right.unit, right.year, right.entitled, right.carried, right.note].join(" "),
    ).includes(query);
    return matchesYear && matchesSearch;
  });

  visibleRights.forEach((right) => leaveRightRows.append(createLeaveRightRow(right)));
  leaveRightCount.textContent = visibleRights.length;
}

function renderLeaves() {
  const showDutyStatus = activeLeaveModule === "Görev Durumu";

  leaveStats.hidden = showDutyStatus;
  leaveOverview.hidden = showDutyStatus;
  leaveRightsPanel.hidden = showDutyStatus;
  leaveFilters.hidden = showDutyStatus;
  leaveRecordsPanel.hidden = showDutyStatus;
  leaveEmptyState.hidden = true;
  dutyStatusPanel.hidden = !showDutyStatus;
  newDutyBtn.hidden = !showDutyStatus;
  newLeaveBtn.hidden = showDutyStatus;
  newLeaveRightBtn.hidden = showDutyStatus;

  if (showDutyStatus) {
    renderDutyRecords();
    leaveVisibleCount.textContent = getVisiblePersonnelStatuses().length;
    leaveSummary.textContent = "Personelin aktif görevleri, dönüş durumları ve yıllık görev geçmişi";
    return;
  }

  leaveRows.innerHTML = "";
  const visibleLeaves = getVisibleLeaves();
  const totalDays = visibleLeaves.reduce((sum, leave) => sum + Number(leave.days || 0), 0);

  renderLeaveOverview();
  visibleLeaves.forEach((leave) => leaveRows.append(createLeaveRow(leave)));
  leaveVisibleCount.textContent = visibleLeaves.length;
  leaveTotalDays.textContent = totalDays;
  leaveApprovedCount.textContent = visibleLeaves.filter(
    (leave) => leave.status === "Onaylandı",
  ).length;
  leavePendingCount.textContent = visibleLeaves.filter(
    (leave) => leave.status === "Beklemede",
  ).length;
  leaveSummary.textContent =
    activeLeaveModule === "Bakiye"
      ? "Personel bazında kalan izin bilgileri için filtreleme yapılıyor."
      : leaveYearFilter.value === "Tümü"
        ? `Tüm yıllarda toplam ${leaves.length} izin kaydı var.`
        : `${leaveYearFilter.value} yılında toplam ${
            leaves.filter((leave) => leave.year === leaveYearFilter.value).length
          } izin kaydı var.`;
  leaveEmptyState.hidden = visibleLeaves.length > 0;
  renderLeaveRights();
}

function openAuditModal(audit = null) {
  auditForm.reset();
  editingAuditNo = audit ? { no: audit.no, year: audit.year } : null;
  auditModalMode.textContent = audit
    ? `${audit.year}/${audit.no} numaralı kayıt`
    : "Yeni kayıt";
  auditModalTitle.textContent = audit ? "Denetim Düzenle" : "Denetim Ekle";
  saveAuditBtn.textContent = audit ? "Güncelle" : "Kaydet";

  if (audit) {
    auditForm.elements.unit.value = audit.unit;
    auditForm.elements.type.value = audit.type;
    auditForm.elements.scope.value = audit.scope;
    auditForm.elements.team.value = audit.team.join("\n");
    auditForm.elements.start.value = audit.start;
    auditForm.elements.end.value = audit.end;
    auditForm.elements.status.value = audit.status;
    auditForm.elements.supervisor.value = audit.supervisor;
  }

  auditModal.showModal();
}

function closeModal() {
  editingAuditNo = null;
  auditModal.close();
}

function openMonitoringModal(audit) {
  const details = getMonitoringDetails(audit);
  editingMonitoringAudit = { no: audit.no, year: audit.year };
  monitoringForm.reset();
  monitoringForm.elements.year.value = audit.year;
  monitoringForm.elements.unit.value = audit.unit;
  monitoringForm.elements.monitoringAuditName.value = details.auditName;
  monitoringForm.elements.monitoringOfficer.value = details.officer;
  monitoringForm.elements.findingCount.value = details.findingCount;
  monitoringForm.elements.openFindingCount.value = details.openFindingCount;
  monitoringForm.elements.monitoringDueDate.value = details.dueDate;
  renderMonitoringDocumentInfo(audit);
  updateMonitoringFilePickerText(audit);
  monitoringModal.showModal();
}

function closeMonitoringDialog() {
  editingMonitoringAudit = null;
  monitoringModal.close();
}

function openApprovalModal() {
  approvalForm.reset();
  approvalForm.elements.year.value = yearSelect.value;
  approvalForm.elements.no.value = getNextApprovalNo(yearSelect.value);
  approvalForm.elements.date.value = new Date().toISOString().slice(0, 10);
  approvalModal.showModal();
}

function closeApprovalDialog() {
  approvalModal.close();
}

function openLeaveModal(leave = null) {
  leaveForm.reset();
  renderPersonnelOptions(leavePersonOptions, leave?.person);
  editingLeaveId = leave ? leave.id : null;
  leaveModalMode.textContent = leave ? `${leave.person} izin kaydı` : "Yeni izin kaydı";
  leaveModalTitle.textContent = leave ? "İzin Kaydını Düzenle" : "İzin Ekle";
  saveLeaveBtn.textContent = leave ? "Güncelle" : "Kaydet";

  if (leave) {
    leaveForm.elements.person.value = leave.person;
    leaveForm.elements.title.value = leave.title || findPersonnelByName(leave.person)?.title || "";
    leaveForm.elements.unit.value = leave.unit;
    leaveForm.elements.type.value = leave.type;
    leaveForm.elements.status.value = leave.status;
    leaveForm.elements.start.value = leave.start;
    leaveForm.elements.end.value = leave.end;
    leaveForm.elements.days.value = leave.days;
    leaveForm.elements.remaining.value = leave.remaining;
    leaveForm.elements.note.value = leave.note;
  } else {
    leaveForm.elements.start.value = new Date().toISOString().slice(0, 10);
    leaveForm.elements.end.value = new Date().toISOString().slice(0, 10);
  }

  leaveModal.showModal();
}

function closeLeaveDialog() {
  editingLeaveId = null;
  leaveModal.close();
}

function openLeaveRightModal(right = null) {
  leaveRightForm.reset();
  renderPersonnelOptions(leaveRightForm.elements.person, right?.person);
  editingLeaveRightId = right ? right.id : null;
  leaveRightModalMode.textContent = right ? `${right.person} izin hakkı` : "Yeni hak tanımı";
  leaveRightModalTitle.textContent = right ? "İzin Hakkını Değiştir" : "İzin Hakkı Tanımla";
  saveLeaveRightBtn.textContent = right ? "Güncelle" : "Kaydet";

  if (right) {
    leaveRightForm.elements.person.value = right.person;
    leaveRightForm.elements.title.value = right.title || findPersonnelByName(right.person)?.title || "";
    leaveRightForm.elements.unit.value = right.unit;
    leaveRightForm.elements.year.value = right.year;
    leaveRightForm.elements.entitled.value = right.entitled;
    leaveRightForm.elements.carried.value = right.carried;
    leaveRightForm.elements.note.value = right.note;
  } else {
    applySelectedPersonnelToForm(leaveRightForm);
    leaveRightForm.elements.year.value = yearSelect.value;
  }

  leaveRightModal.showModal();
}

function closeLeaveRightDialog() {
  editingLeaveRightId = null;
  leaveRightModal.close();
}

function openDutyModal(duty = null) {
  dutyForm.reset();
  renderPersonnelOptions(dutyPersonOptions, duty?.person);
  editingDutyId = duty ? duty.id : null;
  dutyModalMode.textContent = duty ? `${duty.person} görev kaydı` : "Yeni görev kaydı";
  dutyModalTitle.textContent = duty ? "Görev Kaydını Düzenle" : "Görev Ekle";
  saveDutyBtn.textContent = duty ? "Güncelle" : "Kaydet";

  if (duty) {
    dutyForm.elements.person.value = duty.person;
    dutyForm.elements.title.value = duty.title || findPersonnelByName(duty.person)?.title || "";
    dutyForm.elements.unit.value = duty.unit || findPersonnelByName(duty.person)?.unit || "";
    dutyForm.elements.dutyName.value = duty.dutyName || "";
    dutyForm.elements.dutyPlace.value = duty.dutyPlace || "";
    dutyForm.elements.start.value = duty.start || "";
    dutyForm.elements.returnDate.value = duty.returnDate || "";
    dutyForm.elements.status.value = duty.status || "Görevde";
    dutyForm.elements.note.value = duty.note || "";
  } else {
    dutyForm.elements.start.value = new Date().toISOString().slice(0, 10);
    dutyForm.elements.status.value = "Görevde";
  }

  dutyModal.showModal();
}

function closeDutyDialog() {
  editingDutyId = null;
  dutyModal.close();
}

function closeActionMenus() {
  document
    .querySelectorAll(".action-menu")
    .forEach((menu) => {
      menu.hidden = true;
    });
}

function findAudit(no, year) {
  return audits.find(
    (audit) => audit.no === Number(no) && String(audit.year) === String(year),
  );
}

function updateAudit(no, year, changes) {
  const index = audits.findIndex(
    (audit) => audit.no === Number(no) && String(audit.year) === String(year),
  );

  if (index === -1) {
    return;
  }

  audits[index] = {
    ...audits[index],
    ...changes,
    no: audits[index].no,
    year: audits[index].year,
  };
  saveAudits();
}

searchInput.addEventListener("input", () => {
  activeQuickFilter = null;
  renderAudits();
});

if (migrateLocalDataBtn) {
  migrateLocalDataBtn.addEventListener("click", migrateLocalStorageToSqlite);
}

yearSelect.addEventListener("change", (event) => {
  const year = event.target.value;
  approvalYearFilter.value = year;
  leaveYearFilter.value = year;
  dutyYearFilter.value = year;
  approvalForm.elements.year.value = year;
  approvalForm.elements.no.value = getNextApprovalNo(year);
  renderAudits();
  renderApprovals();
  renderLeaves();
  setActiveModule(activeModule);
});

[reportArchiveSearch, reportArchiveTypeFilter, reportArchiveLinkFilter].forEach((control) => {
  control?.addEventListener("input", renderReportArchive);
  control?.addEventListener("change", renderReportArchive);
});

sideUpcomingAudits.addEventListener("click", (event) => {
  const item = event.target.closest("[data-side-unit]");

  if (!item) {
    return;
  }

  activeTypeFilter = "Tümü";
  typeFilterButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.typeFilter === "Tümü");
  });
  activeQuickFilter = {
    type: "unit",
    value: item.dataset.sideUnit,
    label: item.dataset.sideUnit,
  };
  renderAudits({ refreshSidePanel: false });
});

sideAuditorLoad.addEventListener("click", (event) => {
  const item = event.target.closest("[data-side-auditor]");

  if (!item) {
    return;
  }

  activeTypeFilter = "Tümü";
  typeFilterButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.typeFilter === "Tümü");
  });
  activeQuickFilter = {
    type: "auditor",
    value: item.dataset.sideAuditor,
    label: item.dataset.sideAuditor,
  };
  renderAudits({ refreshSidePanel: false });
});

clearAuditQuickFilter?.addEventListener("click", () => {
  activeQuickFilter = null;
  searchInput.value = "";
  activeTypeFilter = "Tümü";
  typeFilterButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.typeFilter === "Tümü");
  });
  renderAudits();
});

monitoringScopeFilter.addEventListener("change", renderMonitoringAudits);
monitoringStatusFilter.addEventListener("change", renderMonitoringAudits);
monitoringSearchInput.addEventListener("input", renderMonitoringAudits);
clearMonitoringFilters.addEventListener("click", () => {
  monitoringScopeFilter.value = "year";
  monitoringStatusFilter.value = "Tümü";
  monitoringSearchInput.value = "";
  renderMonitoringAudits();
});

dashboardNav.addEventListener("click", (event) => {
  event.preventDefault();
  setActiveModule("dashboard");
});

approvalsNav.addEventListener("click", (event) => {
  event.preventDefault();
  setActiveModule("approvals");
});

reportsNav.addEventListener("click", (event) => {
  event.preventDefault();
  setActiveModule("reports");
});

monitoringNav.addEventListener("click", (event) => {
  event.preventDefault();
  setActiveModule("monitoring");
});

adminNav?.addEventListener("click", (event) => {
  event.preventDefault();
  setActiveModule("admin");
});

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  loginError.hidden = true;
  const formData = new FormData(loginForm);

  try {
    await login(formData.get("username"), formData.get("password"));
    loginForm.reset();
    showToast("Oturum açıldı.");
  } catch (error) {
    showLoginError(error.message || "Giriş yapılamadı.");
  }
});

forgotPasswordToggle?.addEventListener("click", () => {
  loginForm.hidden = true;
  forgotPasswordForm.hidden = false;
  forgotPasswordError.hidden = true;
});

backToLogin?.addEventListener("click", () => {
  forgotPasswordForm.hidden = true;
  loginForm.hidden = false;
  loginError.hidden = true;
});

forgotPasswordForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  forgotPasswordError.hidden = true;
  const formData = new FormData(forgotPasswordForm);

  try {
    const message = await requestPasswordReset(formData.get("email"));
    forgotPasswordForm.reset();
    forgotPasswordForm.hidden = true;
    loginForm.hidden = false;
    showToast(message);
  } catch (error) {
    showForgotPasswordError(error.message || "Parola yenileme talebi gönderilemedi.");
  }
});

logoutBtn.addEventListener("click", async () => {
  await logout();
  showToast("Oturum kapatıldı.");
});

downloadDbBackup?.addEventListener("click", () => {
  window.location.href = "/api/admin/db/backup";
});

adminUserForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!canManageUsers()) {
    showToast("Kullanıcı yetkilerini sadece ana yönetici değiştirebilir.");
    return;
  }

  const formData = new FormData(adminUserForm);

  try {
    const response = await apiFetch("/api/admin/users", {
      method: "POST",
      body: {
        displayName: formData.get("displayName"),
        username: formData.get("username"),
        email: formData.get("email"),
        role: formData.get("role"),
        password: formData.get("password"),
      },
    });
    const payload = await readApiJson(response, "Kullanıcı oluşturulamadı.");

    if (!response.ok) {
      throw new Error(payload.error || "Kullanıcı oluşturulamadı.");
    }

    adminUserForm.reset();
    await loadAdminDashboard();
    showToast("Kullanıcı oluşturuldu.");
  } catch (error) {
    showToast(error.message || "Kullanıcı oluşturulamadı.");
  }
});

adminUsersRows?.addEventListener("click", async (event) => {
  const button = event.target.closest("[data-user-action]");

  if (!button) {
    return;
  }

  const row = button.closest("[data-admin-user-id]");
  const userId = Number(row?.dataset.adminUserId);
  const action = button.dataset.userAction;

  if (!userId) {
    return;
  }

  if (!canManageUsers()) {
    showToast("Kullanıcı yetkilerini sadece ana yönetici değiştirebilir.");
    return;
  }

  if (action === "delete") {
    const confirmed = confirm("Bu kullanıcı silinsin mi? Kullanıcı oturumları da kapatılır.");

    if (!confirmed) {
      return;
    }

    try {
      const response = await apiFetch("/api/admin/users/delete", {
        method: "POST",
        body: { id: userId },
      });
      const payload = await readApiJson(response, "Kullanıcı silinemedi.");

      if (!response.ok) {
        throw new Error(payload.error || "Kullanıcı silinemedi.");
      }

      await loadAdminDashboard();
      showToast("Kullanıcı silindi.");
    } catch (error) {
      showToast(error.message || "Kullanıcı silinemedi.");
    }
    return;
  }

  if (action === "save") {
    const getField = (name) => row.querySelector(`[data-user-field="${name}"]`);

    try {
      const response = await apiFetch("/api/admin/users/update", {
        method: "POST",
        body: {
          id: userId,
          displayName: getField("displayName")?.value,
          email: getField("email")?.value,
          role: getField("role")?.value,
          active: getField("active")?.value === "1",
          password: getField("password")?.value,
        },
      });
      const payload = await readApiJson(response, "Kullanıcı güncellenemedi.");

      if (!response.ok) {
        throw new Error(payload.error || "Kullanıcı güncellenemedi.");
      }

      await loadAdminDashboard();
      showToast("Kullanıcı güncellendi.");
    } catch (error) {
      showToast(error.message || "Kullanıcı güncellenemedi.");
    }
  }
});

adminPasswordForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(adminPasswordForm);

  try {
    const response = await apiFetch("/api/change-password", {
      method: "POST",
      body: {
        currentPassword: formData.get("currentPassword"),
        newPassword: formData.get("newPassword"),
      },
    });
    const payload = await readApiJson(response, "Parola güncellenemedi.");

    if (!response.ok) {
      throw new Error(payload.error || "Parola güncellenemedi.");
    }

    adminPasswordForm.reset();
    await loadAdminDashboard();
    showToast("Parola güncellendi.");
  } catch (error) {
    showToast(error.message || "Parola güncellenemedi.");
  }
});

personnelMenuToggle.addEventListener("click", () => {
  setActiveModule("personnel");
  const isOpen = personnelMenuToggle.getAttribute("aria-expanded") === "true";
  personnelMenuToggle.setAttribute("aria-expanded", String(!isOpen));
  personnelMenuToggle.classList.toggle("open", !isOpen);
  personnelSubnav.hidden = isOpen;
});

personnelModuleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setActiveModule("personnel");
    activePersonnelModule = button.dataset.personnelModule;
    selectedPersonnelKey = "";
    creatingPersonnel = false;
    personnelModuleButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    saveActiveView();
    renderPersonnel();
  });
});

newPersonnelBtn.addEventListener("click", () => {
  if (!currentUser?.owner) {
    showToast("Personel ekleme yetkisi sadece ana yöneticidedir.");
    return;
  }

  creatingPersonnel = true;
  selectedPersonnelKey = "";
  setActiveModule("personnelProfile");
});

personnelSortButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const key = button.dataset.personnelSort;

    if (personnelSort.key === key) {
      personnelSort.direction = personnelSort.direction === "asc" ? "desc" : "asc";
    } else {
      personnelSort = { key, direction: "asc" };
    }

    renderPersonnel();
  });
});

personnelRows.addEventListener("click", (event) => {
  const deleteButton = event.target.closest("[data-personnel-delete]");

  if (deleteButton) {
    if (!currentUser?.owner) {
      showToast("Personel silme yetkisi sadece ana yöneticidedir.");
      return;
    }

    const personIndex = personnelRecords.findIndex(
      (person) => personnelKey(person) === deleteButton.dataset.personnelDelete,
    );

    if (personIndex === -1) {
      return;
    }

    const person = personnelRecords[personIndex];
    const shouldDelete = confirm(`${person.name} adlı personel kaydı silinsin mi?`);

    if (!shouldDelete) {
      return;
    }

    markRecordDeleted("personnelRecords", person);
    leaveRights
      .filter((right) => right.person === person.name)
      .forEach((right) => markRecordDeleted("leaveRights", right));
    leaveRights = leaveRights.filter((right) => right.person !== person.name);
    personnelRecords.splice(personIndex, 1);
    selectedPersonnelKey = "";
    creatingPersonnel = false;
    savePersonnelRecords();
    renderPersonnel();
    renderLeaves();
    showToast("Personel kaydı silindi.");
    return;
  }

  const openButton = event.target.closest("[data-personnel-open]");
  const row = event.target.closest("[data-personnel-key]");

  if (!openButton && !row) {
    return;
  }

  selectedPersonnelKey = openButton?.dataset.personnelOpen || row.dataset.personnelKey;
  creatingPersonnel = false;
  setActiveModule("personnelProfile");
});

backToPersonnelList.addEventListener("click", () => {
  creatingPersonnel = false;
  setActiveModule("personnel");
});

personnelProfileForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(personnelProfileForm);
  const name = String(formData.get("name")).trim();
  const title = String(formData.get("title")).trim();
  const extension = String(formData.get("extension")).trim();
  const certificate = String(formData.get("certificate")).trim();
  const expertise = String(formData.get("expertise")).trim();
  const status = String(formData.get("status"));

  if (!currentUser?.owner && creatingPersonnel) {
    showToast("Personel ekleme yetkisi sadece ana yöneticidedir.");
    return;
  }

  if (creatingPersonnel) {
    const newPerson = {
      no: getNextPersonnelNo(activePersonnelModule),
      name,
      title,
      extension,
      certificate,
      expertise,
      status,
      group: activePersonnelModule,
    };

    personnelRecords.push(newPerson);
    selectedPersonnelKey = personnelKey(newPerson);
    creatingPersonnel = false;
    savePersonnelRecords();
    renderPersonnelProfile();
    showToast("Personel kaydı eklendi.");
    return;
  }

  const personIndex = personnelRecords.findIndex(
    (person) => personnelKey(person) === selectedPersonnelKey,
  );

  if (personIndex === -1) {
    return;
  }

  personnelRecords[personIndex] = {
    ...personnelRecords[personIndex],
    name,
    title,
    extension,
    certificate,
    expertise,
    status,
  };
  savePersonnelRecords();
  renderPersonnelProfile();
  showToast("Personel bilgileri kaydedildi.");
});

leaveMenuToggle.addEventListener("click", () => {
  setActiveModule("leave");
});

newAuditBtn.addEventListener("click", () => openAuditModal());
closeAuditModal.addEventListener("click", closeModal);
cancelAudit.addEventListener("click", closeModal);
closeMonitoringModal.addEventListener("click", closeMonitoringDialog);
cancelMonitoring.addEventListener("click", closeMonitoringDialog);
closeDocumentChoiceModal.addEventListener("click", () => documentChoiceModal.close());
newApprovalBtn.addEventListener("click", () => openApprovalModal());
closeApprovalModal.addEventListener("click", closeApprovalDialog);
cancelApproval.addEventListener("click", closeApprovalDialog);
newLeaveBtn.addEventListener("click", () => openLeaveModal());
newLeaveRightBtn.addEventListener("click", () => openLeaveRightModal());
newDutyBtn.addEventListener("click", () => openDutyModal());
closeLeaveModal.addEventListener("click", closeLeaveDialog);
cancelLeave.addEventListener("click", closeLeaveDialog);
closeLeaveRightModal.addEventListener("click", closeLeaveRightDialog);
cancelLeaveRight.addEventListener("click", closeLeaveRightDialog);
closeDutyModal.addEventListener("click", closeDutyDialog);
cancelDuty.addEventListener("click", closeDutyDialog);

monitoringForm.elements.monitoringResultDocument.addEventListener("change", () => {
  if (!editingMonitoringAudit) {
    return;
  }

  const audit = findAudit(editingMonitoringAudit.no, editingMonitoringAudit.year);
  updateMonitoringFilePickerText(audit);
});

approvalForm.elements.year.addEventListener("change", (event) => {
  approvalForm.elements.no.value = getNextApprovalNo(event.target.value);
});

["input", "change"].forEach((eventName) => {
  leaveForm.elements.person.addEventListener(eventName, () => {
    applySelectedPersonnelToForm(leaveForm);
  });
});

leaveRightForm.elements.person.addEventListener("change", () => {
  applySelectedPersonnelToForm(leaveRightForm);
});

["input", "change"].forEach((eventName) => {
  dutyForm.elements.person.addEventListener(eventName, () => {
    applySelectedPersonnelToForm(dutyForm);
  });
});

[approvalYearFilter, approvalNoFilter, approvalStatusFilter, approvalSearchInput].forEach(
  (control) => {
    control.addEventListener("input", renderApprovals);
    control.addEventListener("change", renderApprovals);
  },
);

clearApprovalFilters.addEventListener("click", () => {
  approvalYearFilter.value = yearSelect.value;
  approvalNoFilter.value = "";
  approvalStatusFilter.value = "Tümü";
  approvalSearchInput.value = "";
  renderApprovals();
});

reportAuditRows.addEventListener("click", (event) => {
  const selectButton = event.target.closest("[data-report-select]");
  const reportRow = event.target.closest("[data-report-audit-key]");

  if (
    event.target.closest(".document-upload-list") ||
    event.target.closest("[data-report-document-action]")
  ) {
    return;
  }

  if (!selectButton && !reportRow) {
    return;
  }

  const nextKey = selectButton?.dataset.reportSelect || reportRow.dataset.reportAuditKey;
  selectedReportAuditKey = selectedReportAuditKey === nextKey ? "" : nextKey;
  renderReportArchive();
});

reportAuditRows.addEventListener("click", (event) => {
  const actionButton = event.target.closest("[data-report-document-action]");

  if (!actionButton) {
    return;
  }

  const reportRow = event.target.closest("[data-report-audit-key]");
  const reportAuditKey = reportRow?.dataset.reportAuditKey || selectedReportAuditKey;
  const audit = getReportArchiveAudits().find(
    (archiveAudit) => auditKey(archiveAudit) === reportAuditKey,
  );

  if (!audit) {
    return;
  }

  const documentType = actionButton.dataset.reportDocumentType;

  if (actionButton.dataset.reportDocumentAction === "save-link") {
    const cloudInput = reportAuditRows.querySelector(
      `[data-report-cloud-link-type="${CSS.escape(documentType)}"]`,
    );
    const cloudUrl = cloudInput?.value.trim();

    if (!cloudUrl) {
      alert("Bulut linki alanı boş olamaz.");
      return;
    }

    const existingIndex = findReportDocumentIndex(audit, documentType);
    const previousDocument = existingIndex > -1 ? reportDocuments[existingIndex] : {};
    const documentRecord = {
      ...previousDocument,
      auditKey: auditKey(audit),
      auditYear: audit.year,
      auditNo: audit.no,
      documentType,
      isExtra: false,
      fileName: previousDocument.fileName || `${documentType} bulut bağlantısı`,
      fileType: previousDocument.fileType || "",
      fileData: previousDocument.fileData || "",
      cloudUrl,
      uploadedAt: previousDocument.uploadedAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (existingIndex > -1) {
      reportDocuments[existingIndex] = documentRecord;
    } else {
      reportDocuments.push(documentRecord);
    }

    saveReportDocuments();
    renderReportArchive();
    return;
  }

  const documentIndex = reportDocuments.findIndex(
    (document) =>
      document.auditKey === auditKey(audit) &&
      document.documentType === documentType &&
      !document.isExtra,
  );

  if (documentIndex === -1) {
    return;
  }

  if (actionButton.dataset.reportDocumentAction === "open-link") {
    openCloudUrl(reportDocuments[documentIndex].cloudUrl);
    return;
  }

  if (actionButton.dataset.reportDocumentAction === "delete") {
    const shouldDelete = confirm("Bu denetime ait bulut klasör linki kaldırılsın mı?");

    if (!shouldDelete) {
      return;
    }

    markRecordDeleted("reportDocuments", reportDocuments[documentIndex]);
    reportDocuments.splice(documentIndex, 1);
    saveReportDocuments();
    renderReportArchive();
  }
});

dutyRows.addEventListener("click", (event) => {
  const actionButton = event.target.closest("[data-duty-action]");

  if (!actionButton) {
    return;
  }

  if (actionButton.dataset.dutyAction === "history") {
    showDutyHistory(actionButton.dataset.person);
    return;
  }

  const duty = dutyRecords.find((item) => item.id === Number(actionButton.dataset.id));

  if (!duty) {
    return;
  }

  if (actionButton.dataset.dutyAction === "edit") {
    openDutyModal(duty);
    return;
  }

  if (actionButton.dataset.dutyAction === "return") {
    duty.status = "Döndü";
    duty.returnDate = duty.returnDate || new Date().toISOString().slice(0, 10);
    saveDutyRecords();
    renderDutyRecords();
    showToast("Görev dönüşü kaydedildi.");
    return;
  }

  if (actionButton.dataset.dutyAction === "delete") {
    const shouldDelete = confirm(`${duty.person} adlı personele ait görev kaydı silinsin mi?`);

    if (!shouldDelete) {
      return;
    }

    markRecordDeleted("dutyRecords", duty);
    dutyRecords = dutyRecords.filter((item) => item.id !== duty.id);
    saveDutyRecords();
    renderDutyRecords();
    showToast("Görev kaydı silindi.");
  }
});

[leaveYearFilter, leaveTypeFilter, leaveStatusFilter, leaveSearchInput].forEach(
  (control) => {
    control.addEventListener("input", renderLeaves);
    control.addEventListener("change", renderLeaves);
  },
);

leaveRightSearchInput.addEventListener("input", renderLeaveRights);

[dutyYearFilter, dutyStatusFilter, dutySearchInput].forEach((control) => {
  control.addEventListener("input", renderDutyRecords);
  control.addEventListener("change", renderDutyRecords);
});

clearDutyFilters.addEventListener("click", () => {
  dutyYearFilter.value = yearSelect.value;
  dutyStatusFilter.value = "Tümü";
  dutySearchInput.value = "";
  renderDutyRecords();
});

clearLeaveFilters.addEventListener("click", () => {
  activeLeaveModule = "Personel";
  leaveModuleButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.leaveModule === "Personel");
  });
  leaveYearFilter.value = yearSelect.value;
  leaveTypeFilter.value = "Tümü";
  leaveStatusFilter.value = "Tümü";
  leaveSearchInput.value = "";
  leaveRightSearchInput.value = "";
  renderLeaves();
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".row-actions")) {
    closeActionMenus();
  }
});

auditRows.addEventListener("click", (event) => {
  const actionButton = event.target.closest("[data-action]");

  if (!actionButton) {
    return;
  }

  const action = actionButton.dataset.action;
  const no = Number(actionButton.dataset.no);
  const year = actionButton.dataset.year;
  const audit = findAudit(no, year);

  if (!audit) {
    return;
  }

  if (action === "toggle-menu") {
    const menu = document.querySelector(`[data-menu-for="${year}-${no}"]`);
    const willOpen = menu.hidden;
    closeActionMenus();
    menu.hidden = !willOpen;
    return;
  }

  closeActionMenus();

  if (action === "edit") {
    openAuditModal(audit);
    return;
  }

  if (action === "cancel") {
    updateAudit(no, year, { status: "İptal Edildi" });
    renderAudits();
    return;
  }

  if (action === "monitoring") {
    updateAudit(no, year, {
      status: "İzleme Sürecinde",
      monitoringAuditName: audit.monitoringAuditName || audit.scope,
      monitoringOfficer: audit.monitoringOfficer || audit.supervisor,
      findingCount: audit.findingCount ?? 0,
      openFindingCount: audit.openFindingCount ?? audit.findingCount ?? 0,
      monitoringDueDate: audit.monitoringDueDate || addMonths(audit.end, 12),
    });
    renderAudits();
    return;
  }

  if (action === "delete") {
    const shouldDelete = confirm(
      `${audit.year}/${audit.no} numaralı kayıt silinen kayıtlara taşınsın mı?`,
    );

    if (!shouldDelete) {
      return;
    }

    updateAudit(no, year, { deletedAt: new Date().toISOString() });
    renderAudits();
  }
});

deletedAuditRows.addEventListener("click", (event) => {
  const restoreButton = event.target.closest("[data-restore-audit]");

  if (!restoreButton) {
    return;
  }

  updateAudit(restoreButton.dataset.no, restoreButton.dataset.year, { deletedAt: "" });
  renderAudits();
});

monitoringRows.addEventListener("click", (event) => {
  const editButton = event.target.closest("[data-monitoring-edit]");
  const downloadButton = event.target.closest("[data-monitoring-download-options]");

  if (!editButton && !downloadButton) {
    return;
  }

  const audit = findAudit(
    editButton?.dataset.no || downloadButton?.dataset.no,
    editButton?.dataset.year || downloadButton?.dataset.year,
  );

  if (!audit) {
    return;
  }

  if (downloadButton) {
    chooseAndDownloadDocument(getMonitoringResultDocuments(audit));
    return;
  }

  openMonitoringModal(audit);
});

monitoringDocumentInfo.addEventListener("click", (event) => {
  const documentAction = event.target.closest("[data-monitoring-document-action]");

  if (!documentAction || !editingMonitoringAudit) {
    return;
  }

  const audit = findAudit(editingMonitoringAudit.no, editingMonitoringAudit.year);

  if (!audit) {
    return;
  }

  const monitoringDocuments = getMonitoringResultDocuments(audit);
  const selectedDocument = monitoringDocuments[Number(documentAction.dataset.monitoringDocumentIndex)];
  const documentIndex = selectedDocument
    ? reportDocuments.indexOf(selectedDocument)
    : -1;

  if (documentIndex === -1) {
    return;
  }

  if (documentAction.dataset.monitoringDocumentAction === "download") {
    downloadDocument(reportDocuments[documentIndex]);
    return;
  }

  if (documentAction.dataset.monitoringDocumentAction === "rename") {
    const currentName = reportDocuments[documentIndex].fileName;
    const nextName = prompt("Belge adı", currentName);

    if (!nextName || !nextName.trim()) {
      return;
    }

    reportDocuments[documentIndex] = {
      ...reportDocuments[documentIndex],
      fileName: nextName.trim(),
      updatedAt: new Date().toISOString(),
    };
    saveReportDocuments();
  renderMonitoringDocumentInfo(audit);
  renderMonitoringAudits();
  renderReportArchive();
    return;
  }

  if (documentAction.dataset.monitoringDocumentAction === "delete") {
    const shouldDelete = confirm(`${reportDocuments[documentIndex].fileName} belgesi silinsin mi?`);

    if (!shouldDelete) {
      return;
    }

    markRecordDeleted("reportDocuments", reportDocuments[documentIndex]);
    reportDocuments.splice(documentIndex, 1);
    saveReportDocuments();
    renderMonitoringDocumentInfo(audit);
    renderMonitoringAudits();
    renderReportArchive();
  }
});

approvalRows.addEventListener("click", (event) => {
  const actionButton = event.target.closest("[data-approval-action]");

  if (!actionButton) {
    return;
  }

  const approval = approvals.find(
    (item) =>
      String(item.year) === actionButton.dataset.year &&
      Number(item.no) === Number(actionButton.dataset.no),
  );

  if (!approval) {
    return;
  }

  if (approval.cloudUrl) {
    openCloudUrl(approval.cloudUrl);
    return;
  }

  alert(
    `Olur No: ${approval.no}/${approval.year}\nKonu: ${approval.subject}\nDosya: ${
      approval.fileName || "Henüz dosya seçilmedi"
    }`,
  );
});

leaveRows.addEventListener("click", (event) => {
  const actionButton = event.target.closest("[data-leave-action]");

  if (!actionButton) {
    return;
  }

  const leave = leaves.find((item) => item.id === Number(actionButton.dataset.id));

  if (!leave) {
    return;
  }

  if (actionButton.dataset.leaveAction === "edit") {
    openLeaveModal(leave);
    return;
  }

  if (actionButton.dataset.leaveAction === "cancel") {
    leave.status = "İptal Edildi";
    saveLeaves();
    renderLeaves();
    return;
  }

  if (actionButton.dataset.leaveAction === "delete") {
    const shouldDelete = confirm(`${leave.person} adlı personele ait izin kaydı silinsin mi?`);

    if (!shouldDelete) {
      return;
    }

    markRecordDeleted("leaves", leave);
    leaves = leaves.filter((item) => item.id !== leave.id);
    saveLeaves();
    renderLeaves();
  }
});

leaveRightRows.addEventListener("click", (event) => {
  const actionButton = event.target.closest("[data-leave-right-action]");

  if (!actionButton) {
    return;
  }

  const right = leaveRights.find((item) => item.id === Number(actionButton.dataset.id));

  if (!right) {
    return;
  }

  if (actionButton.dataset.leaveRightAction === "edit") {
    openLeaveRightModal(right);
    return;
  }

  if (actionButton.dataset.leaveRightAction === "delete") {
    const shouldDelete = confirm(`${right.person} için tanımlı izin hakkı silinsin mi?`);

    if (!shouldDelete) {
      return;
    }

    markRecordDeleted("leaveRights", right);
    leaveRights = leaveRights.filter((item) => item.id !== right.id);
    saveLeaveRights();
    renderLeaves();
  }
});

auditMenuToggle.addEventListener("click", () => {
  setActiveModule("dashboard");
  leaveMenuToggle.setAttribute("aria-expanded", "false");
  leaveMenuToggle.classList.remove("open");
  leaveSubnav.hidden = true;
  const isOpen = auditMenuToggle.getAttribute("aria-expanded") === "true";
  auditMenuToggle.setAttribute("aria-expanded", String(!isOpen));
  auditMenuToggle.classList.toggle("open", !isOpen);
  auditSubnav.hidden = isOpen;
});

typeFilterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setActiveModule("dashboard");
    setActiveTypeFilter(button.dataset.typeFilter);
  });
});

leaveModuleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeLeaveModule = getValidLeaveModule(button.dataset.leaveModule);
    leaveModuleButtons.forEach((item) => {
      item.classList.toggle("active", item.dataset.leaveModule === activeLeaveModule);
    });
    leaveTypeFilter.value = "Tümü";
    setActiveModule("leave");
  });
});

statFilterCards.forEach((card) => {
  card.addEventListener("click", () => {
    setActiveTypeFilter(card.dataset.cardFilter);
  });
});

auditForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(auditForm);
  const audit = Object.fromEntries(formData.entries());
  audit.team = String(audit.team)
    .split("\n")
    .map((person) => person.trim())
    .filter(Boolean);

  if (editingAuditNo) {
    updateAudit(editingAuditNo.no, editingAuditNo.year, audit);
  } else {
    audit.year = yearSelect.value;
    audit.no =
      Math.max(
        ...audits
          .filter((item) => String(item.year) === String(yearSelect.value))
          .map((item) => item.no),
        0,
      ) + 1;
    audits.unshift(audit);
    saveAudits();
  }

  renderAudits();
  closeModal();
});

monitoringForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!editingMonitoringAudit) {
    return;
  }

  const formData = new FormData(monitoringForm);
  const findingCount = Math.max(0, Number(formData.get("findingCount") || 0));
  const openFindingCount = Math.min(
    findingCount,
    Math.max(0, Number(formData.get("openFindingCount") || 0)),
  );

  updateAudit(editingMonitoringAudit.no, editingMonitoringAudit.year, {
    monitoringAuditName: String(formData.get("monitoringAuditName")).trim(),
    monitoringOfficer: String(formData.get("monitoringOfficer")).trim(),
    findingCount,
    openFindingCount,
    monitoringDueDate: String(formData.get("monitoringDueDate")),
  });

  const audit = findAudit(editingMonitoringAudit.no, editingMonitoringAudit.year);
  const selectedFiles = Array.from(monitoringForm.elements.monitoringResultDocument.files);

  if (audit && selectedFiles.length) {
    const uploadedAt = new Date().toISOString();
    const newDocuments = await Promise.all(
      selectedFiles.map(async (file, index) => ({
        id: `monitoring-${Date.now()}-${index}-${Math.random().toString(16).slice(2)}`,
        auditKey: auditKey(audit),
        auditYear: audit.year,
        auditNo: audit.no,
        documentType: "İzleme Sonuçları Tablosu",
        isExtra: false,
        fileName: file.name,
        fileType: file.type,
        fileData: await readFileAsDataUrl(file),
        uploadedAt,
      })),
    );
    reportDocuments.push(...newDocuments);
    saveReportDocuments();
  }

  renderAudits();
  closeMonitoringDialog();
  showToast("İzleme bilgileri kaydedildi.");
});

approvalForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(approvalForm);
  const selectedFile = approvalForm.elements.file.files[0];
  const approval = {
    year: String(formData.get("year")),
    no: Number(formData.get("no")),
    date: String(formData.get("date")),
    subject: String(formData.get("subject")).trim(),
    related: String(formData.get("related")).trim(),
    status: String(formData.get("status")),
    fileName: selectedFile ? selectedFile.name : "",
    cloudUrl: String(formData.get("cloudUrl")).trim(),
    note: String(formData.get("note")).trim(),
  };

  approvals.push(approval);
  approvals.sort((a, b) => String(a.year).localeCompare(String(b.year)) || a.no - b.no);
  saveApprovals();
  renderApprovals();
  closeApprovalDialog();
});

leaveForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(leaveForm);
  const start = String(formData.get("start"));
  const selectedPerson = findPersonnelByName(formData.get("person"));

  if (!selectedPerson) {
    showToast("Lütfen listeden geçerli bir personel seç.");
    return;
  }

  const leave = {
    id: editingLeaveId || Math.max(...leaves.map((item) => item.id), 0) + 1,
    year: start.slice(0, 4),
    person: String(formData.get("person")).trim(),
    title: selectedPerson?.title || String(formData.get("title")).trim(),
    unit: selectedPerson?.unit || String(formData.get("unit")).trim(),
    type: String(formData.get("type")),
    status: String(formData.get("status")),
    start,
    end: String(formData.get("end")),
    days: Number(formData.get("days")),
    remaining: String(formData.get("remaining")).trim(),
    note: String(formData.get("note")).trim(),
  };

  if (editingLeaveId) {
    const index = leaves.findIndex((item) => item.id === editingLeaveId);

    if (index > -1) {
      leaves[index] = leave;
    }
  } else {
    leaves.unshift(leave);
  }

  saveLeaves();
  renderLeaves();
  closeLeaveDialog();
});

dutyForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(dutyForm);
  const selectedPerson = findPersonnelByName(formData.get("person"));
  const start = String(formData.get("start"));
  let returnDate = String(formData.get("returnDate"));
  const status = String(formData.get("status"));

  if (!selectedPerson) {
    showToast("Lütfen listeden geçerli bir personel seç.");
    return;
  }

  if (status === "Döndü" && !returnDate) {
    returnDate = new Date().toISOString().slice(0, 10);
  }

  const duty = {
    id: editingDutyId || Math.max(...dutyRecords.map((item) => item.id), 0) + 1,
    year: start.slice(0, 4),
    person: selectedPerson.name,
    title: selectedPerson.title || "",
    unit: selectedPerson.unit || "",
    dutyName: String(formData.get("dutyName")).trim(),
    dutyPlace: String(formData.get("dutyPlace")).trim(),
    start,
    returnDate,
    status,
    note: String(formData.get("note")).trim(),
  };

  if (editingDutyId) {
    const index = dutyRecords.findIndex((item) => item.id === editingDutyId);

    if (index > -1) {
      dutyRecords[index] = duty;
    }
  } else {
    dutyRecords.unshift(duty);
  }

  saveDutyRecords();
  renderLeaves();
  closeDutyDialog();
});

leaveRightForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(leaveRightForm);
  const selectedPerson = findPersonnelByName(formData.get("person"));
  const right = {
    id: editingLeaveRightId || Math.max(...leaveRights.map((item) => item.id), 0) + 1,
    year: String(formData.get("year")),
    person: String(formData.get("person")).trim(),
    title: selectedPerson?.title || String(formData.get("title")).trim(),
    unit: selectedPerson?.unit || String(formData.get("unit")).trim(),
    group: selectedPerson?.group || "",
    entitled: Number(formData.get("entitled")),
    carried: Number(formData.get("carried") || 0),
    note: String(formData.get("note")).trim(),
  };
  const duplicateIndex = leaveRights.findIndex(
    (item) =>
      item.id !== editingLeaveRightId &&
      normalizeText(item.person) === normalizeText(right.person) &&
      item.year === right.year,
  );

  if (duplicateIndex > -1) {
    leaveRights[duplicateIndex] = {
      ...leaveRights[duplicateIndex],
      ...right,
      id: leaveRights[duplicateIndex].id,
    };
  } else if (editingLeaveRightId) {
    const index = leaveRights.findIndex((item) => item.id === editingLeaveRightId);

    if (index > -1) {
      leaveRights[index] = right;
    }
  } else {
    leaveRights.unshift(right);
  }

  saveLeaveRights();
  renderLeaves();
  closeLeaveRightDialog();
});

initAuth();
