# PROJECT READINESS CHECKLIST (TABLE 5.2)
**Evaluasi Kelayakan Proyek Praktikum SQA / PKPL Informatika UMM**

Setiap butir di bawah ini berstatus **TRUE** dan siap diisikan pada *Project Registration Spreadsheet*:

| Kode | Kebutuhan Kesiapan Proyek | Status | Penjelasan & Bukti dalam Proyek QuickShop |
| :---: | :--- | :---: | :--- |
| **PRJ-1** | Developed by the student or fully understood by the student | **TRUE** | Struktur kode dirancang bersih, menggunakan JavaScript modular standar, terdokumentasi rapi, dan mudah dijelaskan logika alurnya saat demo lab. |
| **PRJ-2** | Runnable locally, deployed online, or clearly demonstrable | **TRUE** | Aplikasi dapat dijalankan langsung secara lokal tanpa instalasi rumit (zero-setup) cukup dengan membuka file `index.html` di browser (Chrome / Edge / Firefox). |
| **PRJ-3** | Provides real interaction, processing, and observable output rather than only static pages | **TRUE** | Bukan halaman statis; memiliki interaksi dinamis: validasi form real-time, penambahan keranjang, kalkulasi ongkir & diskon, perubahan status pesanan, serta notifikasi toast interaktif. |
| **ROL-1** | One user role is selected and used consistently as the testing focus | **TRUE** | Peran yang dipilih konsisten: **Customer (Pelanggan)**. Seluruh 8 fitur difokuskan pada alur pengalaman pengguna ini. |
| **FTR-1** | Includes at least 8 features in total: 3 authentication features and 5 additional features | **TRUE** | Memiliki total 8 fitur lengkap: 3 Autentikasi (Register, Login, Forgot Password) + 5 Fitur Fungsional (Katalog, Keranjang, Checkout, Order Tracking, Profil & Ulasan). |
| **FTR-2** | Includes Login, Register, and Forgot Password | **TRUE** | Ketiga fitur autentikasi ini telah diimplementasikan lengkap beserta dialog modal dan validasinya. |
| **FTR-3** | The 5 additional features may include subfeatures, but each has a clear function and test scenario | **TRUE** | Kelima fitur memiliki skenario uji spesifik: pencarian & filter katalog, CRUD keranjang belanja, kalkulasi diskon multi-kondisi, transisi status pesanan, dan rating ulasan produk. |
| **UNQ-1** | The same product is used by different students only on different platforms; role differences on the same platform do not count | **TRUE** | Proyek terdaftar untuk platform Web Application. |
| **RDY-3** | The project as a whole includes enough numeric or text input and validation variation for EP and BVA | **TRUE** | Memiliki variasi numerik & teks: kuantitas belanja ($1 \le Q \le 99$), rating bintang ($1 \le R \le 5$), panjang ulasan (10-500 char), regex email & nomor telepon, serta ambang belanja voucher. |
| **RDY-4** | The student can show the actual source code for white-box testing | **TRUE** | Fungsi logika dipisahkan di folder `js/logic/` (`validationLogic.js`, `discountLogic.js`, `cartLogic.js`, `orderStateLogic.js`) dengan struktur percabangan if-else yang jelas untuk diuji Statement & Branch Coverage pada Modul 4. |
| **RDY-5** | The project can support automated testing of a clear flow or feature | **TRUE** | Seluruh elemen penting telah dilengkapi atribut selektor unik `data-cy="..."` yang siap diuji dengan Cypress E2E pada Modul 5. |
| **RDY-6** | The project includes testable CRUD operations, status changes, workflows, or business rules | **TRUE** | Memenuhi CRUD keranjang, transisi status pesanan (`Pending` ➔ `Processing` ➔ `Shipped` ➔ `Completed`), aturan pembatalan pesanan, dan kalkulasi promo voucher. |
| **REQ-1** | An initial requirements source has been identified; the SRS is prepared gradually and is due according to Module 2 instructions | **TRUE** | Sumber kebutuhan fitur dan aturan sistem telah dipetakan secara terstruktur di Test Plan dan siap ditransformasikan ke SRS / Test Basis pada Modul 2. |

**Total Kesiapan:** **13 / 13 (100% Memenuhi Syarat Praktikum)**
