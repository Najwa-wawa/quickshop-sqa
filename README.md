# QuickShop - SQA E-Commerce Storefront 🛍️
**Proyek Aplikasi Web Praktikum Software Quality Assurance (SQA / PKPL)**  
**Laboratorium Informatika - Universitas Muhammadiyah Malang (UMM)**

---

## 📌 Tentang Proyek
**QuickShop** adalah aplikasi web toko online modern (E-Commerce Storefront) yang dirancang khusus untuk memenuhi seluruh spesifikasi dan kriteria kelayakan proyek pengujian perangkat lunak standar **ISO/IEC/IEEE 29119**.

- **Fokus Peran Uji (Selected Role)**: `Customer` (Pelanggan / Pembeli)
- **Teknologi**: HTML5, Modern Responsive CSS, Vanilla Modular JavaScript ES6+, LocalStorage Persistence.
- **Kemudahan Menjalankan (Zero Setup)**: Cukup klik ganda (double-click) file `index.html` pada browser Chrome/Edge/Firefox, tanpa perlu instalasi tools yang rumit!

---

## 🚀 Cara Menjalankan Aplikasi
1. Buka folder proyek:
   ```
   C:\Users\ASUS\.gemini\antigravity\scratch\sqa-shop-app
   ```
2. **Menjalankan Toko Web**:
   - Klik ganda pada file `index.html` di File Explorer, atau klik kanan -> *Open with* -> Google Chrome / Microsoft Edge.
3. **Menjalankan Unit Test Runner (Modul 4 White-Box Testing)**:
   - Klik ganda pada file `test-runner.html` di browser Anda, atau klik tombol **"🧪 Buka In-Browser Test Runner"** di bar atas toko web.
   - Anda akan melihat seluruh kasus uji BVA, EP, Decision Table, dan State Transition berjalan hijau (Passed) secara otomatis.

---

## 🎯 8 Fitur yang Diuji (Customer Role)

### 3 Fitur Autentikasi Wajib:
1. **User Registration**: Pendaftaran pelanggan dengan validasi format email RFC 5322, nomor telepon Indonesia (diawali 08/628), password minimal 8 karakter (kombinasi huruf besar & angka), dan verifikasi konfirmasi password.
2. **User Login**: Masuk ke akun pelanggan dengan autentikasi kredensial, proteksi session, dan penanganan error kredensial tidak valid.
   - *Akun Demo Bawaan*: Email: `customer@quickshop.id` | Password: `Password123!`
3. **Forgot & Reset Password**: Alur reset password 2 langkah: verifikasi email terdaftar, pengiriman kode OTP simulasi 6 digit, dan pembuatan password baru.

### 5 Fitur Fungsional Tambahan (Variasi Testing Lengkap):
4. **Product Catalog with Search & Filter**: Pencarian teks nama/deskripsi produk secara real-time, penyaringan kategori (*Electronics, Wearables, Furniture, Lifestyle*), dan pengurutan harga/rating.
5. **Shopping Cart Management (CRUD & BVA)**: Tambah barang, ubah kuantitas dengan batasan *Boundary Value Analysis* (batas $1 \le Q \le 99$ unit dan cek stok), hapus item individual, dan kosongkan keranjang belanja.
6. **Checkout & Logika Diskon Voucher**: Kalkulasi biaya pengiriman sesuai kota tujuan & jenis layanan kurir, serta aturan diskon kupon (*Decision Table Testing*):
   - Voucher `DISKON10`: Diskon 10% min. belanja Rp 100.000 (Maks Rp 50.000)
   - Voucher `HEMAT50K`: Potongan Rp 50.000 min. belanja Rp 300.000
   - Voucher `GRATISONGKIR`: Potongan ongkir s.d Rp 20.000 min. belanja Rp 150.000
7. **Order Status Lifecycle & State Transition**: Pelacakan status pemesanan pelanggan dengan alur transisi:
   $$\text{Pending Payment} \rightarrow \text{Processing} \rightarrow \text{Shipped} \rightarrow \text{Completed}$$
   *Aturan Bisnis*: Tombol *Batalkan Pesanan* hanya diizinkan saat status masih `Pending Payment`.
8. **Customer Profile & Product Review**: Pembaruan profil pelanggan dan pengiriman rating bintang 1–5 serta testimoni ulasan (panjang 10–500 karakter).

---

## 📁 Struktur Direktori
```
sqa-shop-app/
│
├── index.html                   # Halaman utama aplikasi toko online
├── test-runner.html             # Visual Unit Test Runner (White-Box & BVA)
├── README.md                    # Panduan penggunaan proyek
│
├── css/
│   └── styles.css               # Styling UI responsif dan modern
│
├── js/
│   ├── app.js                   # Main application controller & event wiring
│   ├── data/
│   │   └── mockData.js          # Seed initial data (produk, voucher, akun demo)
│   ├── logic/                   # Pure business logic functions (siap uji)
│   │   ├── validationLogic.js   # Validasi regex email, telepon, password
│   │   ├── discountLogic.js     # Logika kalkulasi diskon voucher & ongkir
│   │   ├── cartLogic.js         # Logika CRUD & boundary kuantitas keranjang
│   │   └── orderStateLogic.js   # State machine transisi status pesanan
│   └── services/
│       └── storageService.js    # LocalStorage manager & tombol reset seed data
│
├── tests/
│   └── unitTests.js             # Kumpulan skenario unit test otomatis
│
└── docs/                        # Dokumen resmi praktikum Modul 1
    ├── ISO-29119-3-TEST-PLAN.md # Dokumen Test Plan standar ISO 29119-3
    ├── RISK-REGISTER.md         # Analisis 6 risiko (Impact x Likelihood = Priority)
    └── PROJECT-READINESS-CHECKLIST.md # Checklist 13 butir kesiapan (PRJ-1 s.d REQ-1)
```

---

## 📋 Dokumen Praktikum Modul 1 SQA
Di dalam folder `docs/`, Anda dapat menemukan berkas pendukung untuk pengisian lembar kerja & spreadsheet praktikum:
1. `ISO-29119-3-TEST-PLAN.md`: Rencana pengujian lengkap sesuai format ISO/IEC/IEEE 29119-3.
2. `RISK-REGISTER.md`: Daftar 6 risiko produk & proyek beserta skor prioritas dan mitigasi.
3. `PROJECT-READINESS-CHECKLIST.md`: Penjelasan 13 butir kesiapan proyek yang semuanya berstatus **TRUE**.
