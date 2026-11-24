# TEST PLAN (RENCANA PENGUJIAN)
**Berdasarkan Standar ISO/IEC/IEEE 29119-3**  
**Praktikum Software Quality Assurance (SQA / PKPL) - Modul 1**  
**Laboratorium Informatika - Universitas Muhammadiyah Malang**

---

## 1. Context of Testing (Konteks Pengujian)

### 1.1 Identitas Item Uji (Test Item)
- **Nama Aplikasi**: QuickShop E-Commerce Storefront
- **Platform**: Web Application (HTML5, Modern CSS, Modular Vanilla JavaScript ES6+)
- **Versi Rilis Uji**: v1.0.0
- **URL / Lokasi Demo**: Localhost / File Browser (`index.html`)

### 1.2 Peran Pengguna yang Diuji (Selected Role Under Test)
Sesuai aturan Modul 1 Bagian 5.2, pengujian difokuskan secara konsisten pada **satu peran**:
- **Peran Terpilih**: `Customer` (Pelanggan / Pembeli)
- **Justifikasi**: Peran *Customer* mencakup alur interaksi terpenting dalam sistem e-commerce, mulai dari autentikasi, eksplorasi katalog, manipulasi keranjang belanja, checkout transaksi dengan kalkulasi promo, hingga pelacakan siklus hidup pesanan dan pemberian ulasan.

### 1.3 Ruang Lingkup Pengujian (Testing Scope)

#### A. In-Scope (Fitur yang Diuji - Minimal 8 Fitur)
1. **Fitur Autentikasi 1 - Registrasi Akun Customer (`FTR-REG`)**: Pendaftaran user baru dengan validasi regex email, nomor telepon format Indonesia, panjang password $\ge 8$ karakter, serta kecocokan konfirmasi password.
2. **Fitur Autentikasi 2 - Login Akun Customer (`FTR-LOG`)**: Masuk akun dengan autentikasi kredensial, verifikasi password, remember me, dan penanganan error session.
3. **Fitur Autentikasi 3 - Lupa & Reset Password (`FTR-RST`)**: Alur pemulihan kata sandi dengan pengiriman kode OTP 6-digit simulasi dan penetapan password baru yang terenkripsi mockup.
4. **Fitur Fungsional 4 - Katalog Produk dengan Pencarian & Filter Kategori (`FTR-CAT`)**: Pencarian kata kunci produk secara real-time, filter kategori dinamis, dan pengurutan harga/rating.
5. **Fitur Fungsional 5 - Manajemen Keranjang Belanja / Cart CRUD (`FTR-CRT`)**: Operasi Create, Read, Update, Delete keranjang dengan uji Boundary Value Analysis (BVA) pada kuantitas item ($1 \le Q \le 99$) dan pembatasan stok.
6. **Fitur Fungsional 6 - Checkout & Logika Diskon Voucher Multi-Kondisi (`FTR-CHK`)**: Kalkulasi tarif ongkir berdasarkan kota & layanan kurir, serta evaluasi voucher diskon (`DISKON10`, `HEMAT50K`, `GRATISONGKIR`) menggunakan pendekatan *Decision Table Testing*.
7. **Fitur Fungsional 7 - Pelacakan & Transisi Status Pesanan / Order Lifecycle (`FTR-ORD`)**: Pengujian *State Transition* pesanan dari `Pending Payment` $\rightarrow$ `Processing` $\rightarrow$ `Shipped` $\rightarrow$ `Completed`, beserta aturan pembatalan (*cancel order* hanya diizinkan pada status `Pending Payment`).
8. **Fitur Fungsional 8 - Profil Pelanggan & Ulasan Produk / Review (`FTR-REV`)**: Pembaruan profil pelanggan dan pengiriman rating bintang (BVA $1 \le R \le 5$) serta ulasan teks (validasi batas panjang 10–500 karakter).

#### B. Out-of-Scope (Tidak Diuji pada Praktikum Ini)
- Modul administrasi Back-Office (Admin Super / Supplier Dashboard).
- Integrasi Payment Gateway pihak ketiga yang sebenarnya (Midtrans/Xendit live API).
- Sinkronisasi kurir pihak ketiga secara real-time (API RajaOngkir live).

### 1.4 Asumsi dan Batasan (Assumptions and Constraints)
- **Asumsi**:
  1. Penguji menggunakan browser modern (Google Chrome, Microsoft Edge, Mozilla Firefox) dengan JavaScript aktif.
  2. Data awal diinisialisasi otomatis dari mock data bawaan (`mockData.js`) melalui LocalStorage.
- **Batasan**:
  1. Pengujian dilakukan secara mandiri di lingkungan lokal tanpa ketergantungan koneksi internet eksternal.
  2. Fokus pengujian hanya pada antarmuka dan proses bisnis pelanggan (*Customer*).

---

## 2. Risk Register (Daftar Risiko & Mitigasi)

Penilaian prioritas risiko dihitung menggunakan formula ISO 29119:
$$\text{Priority} = \text{Impact} \times \text{Likelihood}$$
Skala nilai: 1 (Sangat Rendah) hingga 5 (Kritis / Sangat Tinggi).

| ID Risiko | Deskripsi Risiko | Tipe Risiko | Impact (1-5) | Likelihood (1-5) | Priority | Strategi Mitigasi |
| :--- | :--- | :---: | :---: | :---: | :---: | :--- |
| **RSK-01** | Kesalahan perhitungan diskon promo voucher (misal: diskon melebihi subtotal atau plafon maksimal diabaikan). | Product Risk | 5 | 3 | **15** (Tinggi) | Membuat fungsi perhitungan terisolasi (`discountLogic.js`), merancang uji *Decision Table* dan *Boundary Value Analysis* pada batas `minOrder` dan `maxDiscount`. |
| **RSK-02** | Input kuantitas keranjang bernilai tidak valid (nilai 0, negatif, pecahan, atau melampaui batas 99 unit). | Product Risk | 4 | 4 | **16** (Tinggi) | Menerapkan sanitasi nilai input kuantitas di `cartLogic.js` dengan batasan eksplisit $1 \le Q \le 99$ dan pengecekan stok tersedia. |
| **RSK-03** | Inkonsistensi transisi status pesanan (misal: pesanan yang sudah dikirim / selesai dapat dibatalkan oleh pengguna). | Product Risk | 4 | 3 | **12** (Sedang) | Menerapkan *State Machine Transition Matrix* ketat di `orderStateLogic.js` yang menolak transisi status ilegal. |
| **RSK-04** | Kebocoran atau input format email dan password lemah pada proses registrasi/login. | Product Risk | 4 | 3 | **12** (Sedang) | Validasi regex ketat pada email dan enforcing aturan kata sandi (kombinasi huruf besar, angka, min 8 karakter). |
| **RSK-05** | Inkonsistensi LocalStorage saat data korup atau browser membersihkan cache. | Project Risk | 3 | 2 | **6** (Rendah) | Menyediakan tombol *Reset Seed Data* bawaan di header antarmuka untuk merestore data default secara instan. |
| **RSK-06** | Keterbatasan waktu pengerjaan otomatisasi uji (Cypress E2E) pada Modul 5. | Project Risk | 3 | 3 | **9** (Sedang) | Menyematkan atribut selektor standar `data-cy="..."` pada seluruh elemen interaktif sejak Modul 1. |

---

## 3. Test Strategy (Strategi Pengujian)

### 3.1 Pendekatan Pengujian (Testing Approach)
- **Tingkat Pengujian (Test Level)**:
  - **System Testing**: Pengujian sistem web secara menyeluruh dari sudut pandang *Customer*.
  - **Unit / Component Testing**: Pengujian modular pada fungsi logika bisnis murni (`js/logic/`) untuk kebutuhan White-Box Testing.
- **Tipe Pengujian Utama (Primary Test Type)**:
  - **Functional Testing**: Memastikan setiap fitur beroperasi sesuai spesifikasi perilaku.
  - **White-Box Testing (Structural)**: Pengujian Statement Coverage & Decision/Branch Coverage pada modul diskon dan validasi (Modul 4).
  - **Automated Testing**: Penyiapan selektor E2E untuk Cypress (Modul 5).

### 3.2 Teknik Perancangan Uji (Test Design Techniques)
- **Specification-Based (Black-Box)**:
  - *Equivalence Partitioning (EP)*: Validasi format email, nomor telepon, panjang password.
  - *Boundary Value Analysis (BVA)*: Kuantitas keranjang (batas: 0, 1, 99, 100), rating bintang (batas: 0, 1, 5, 6), batas panjang ulasan.
  - *Decision Table Testing*: Kombinasi aturan voucher (subtotal, tipe persentase/potongan tetap, ambang belanja).
  - *State Transition Testing*: Diagram status alur pesanan dari `Pending` hingga `Completed`/`Cancelled`.
- **Structure-Based (White-Box)**:
  - Statement & Branch Coverage pada fungsi `ValidationLogic`, `DiscountLogic`, dan `OrderStateLogic`.

### 3.3 Kriteria Masuk dan Keluar (Entry & Exit Criteria)
- **Entry Criteria (Kriteria Masuk)**:
  - Kode sumber web dapat dibuka dan dijalankan di browser tanpa error sintaks pada konsol.
  - Mock seed data terinisialisasi dengan benar di LocalStorage.
  - Dokumen Test Plan telah disetujui asisten laboratorium.
- **Exit Criteria (Kriteria Keluar)**:
  - Seluruh 8 fitur fungsional utama dieksekusi dengan tingkat kelulusan $\ge 95\%$.
  - Tidak ada insiden berstatus *Critical* / *Blocker* yang belum terselesaikan.
  - Unit test otomatis pada `test-runner.html` berhasil lulus 100% (Passed).

### 3.4 Kriteria Lulus / Gagal (Pass / Fail Criteria)
- **Pass**: Perilaku sistem dan hasil kalkulasi/tampilan sama persis dengan hasil yang diharapkan (*Expected Result*).
- **Fail**: Terdapat deviasi fungsional, kesalahan kalkulasi numerik, atau tampilan error yang tidak terduga.

### 3.5 Pendekatan Retesting dan Regression Testing
- Setiap perbaikan bug akan diuji ulang (*Retesting*) terhadap skenario yang gagal.
- *Regression Testing* dijalankan menggunakan in-browser visual test runner (`test-runner.html`) untuk memastikan modul lain tidak terganggu.

---

## 4. Test Environment (Lingkungan Pengujian)

| Komponen | Spesifikasi / Konfigurasi |
| :--- | :--- |
| **Perangkat Keras (Hardware)** | Laptop / PC Mahasiswa (RAM $\ge$ 4 GB, Prosesor Multi-core) |
| **Sistem Operasi (OS)** | Windows 10 / Windows 11 |
| **Web Browser** | Google Chrome (Versi Terbaru) / Microsoft Edge / Mozilla Firefox |
| **Web Engine / Server** | Zero-setup (Direct File Protocol `file:///` atau Local HTTP Server) |
| **Penyimpanan Data** | Browser `localStorage` dengan auto-seed initial data |
| **Akun Uji Demo** | Email: `customer@quickshop.id` \| Password: `Password123!` |
| **Alat Pengujian** | In-Browser Unit Test Runner, Cypress (Persiapan Modul 5), Browser DevTools |

---

## 5. Test Schedule (Jadwal Pengujian Praktikum)

| Modul | Aktivitas Pengujian | Target Luaran |
| :---: | :--- | :--- |
| **Modul 1** | SQA Fundamentals, Project Registration, & Test Plan ISO 29119-3 | Test Plan, Risk Register, Project Registration |
| **Modul 2** | Test Case Design, SRS Test Basis, & Traceability Matrix | Dokumen Test Case Specification & RTM |
| **Modul 3** | Black Box Functional Testing (EP, BVA, Decision Table, State Transition) | Test Execution Log & Bug / Incident Reports |
| **Modul 4** | Structural White-Box Testing & Unit Testing (Statement & Branch Coverage) | Visual Test Runner Execution & Code Coverage Report |
| **Modul 5** | Automated Testing (E2E Test Flow menggunakan Cypress) | Automated Test Script & Execution Video/Screenshot |
| **Modul 6** | Non-Functional Testing (Usability, Performance, Cross-browser) | Performance Report & Lighthouse Score |
| **Final (UAP)** | Final Demonstration & Test Completion Report | Test Completion Report ISO 29119-3 Lengkap |

---

## 6. Test Deliverables (Luaran Pengujian)

1. **Dokumen Test Plan ISO/IEC/IEEE 29119-3** (Dokumen ini).
2. **Risk Register** dengan analisis Dampak, Kemungkinan, dan Prioritas.
3. **Project Registration Form** dengan Checklist Kesiapan Proyek (13 Butir TRUE).
4. **Source Code Aplikasi Web Siap Demo** lengkap dengan atribut `data-cy` dan modul logika terpisah.
5. **Interactive In-Browser Test Runner** (`test-runner.html`) yang membuktikan eksekusi tes secara otomatis.
