# RISK REGISTER (DAFTAR RISIKO)
**QuickShop Web Application - Praktikum SQA Modul 1**  
**Metodologi: ISO/IEC/IEEE 29119-3 Standard**

Rumus Perhitungan:
$$\text{Priority Score} = \text{Impact} \times \text{Likelihood}$$

- **Impact (Dampak)**: 1 (Minimal) s.d 5 (Kritis / Fatal)
- **Likelihood (Kemungkinan)**: 1 (Sangat Jarang) s.d 5 (Sangat Sering)
- **Kategori Prioritas**:
  - $\ge 15$: Kritis / Sangat Tinggi (High Priority)
  - $10 - 14$: Sedang (Medium Priority)
  - $\le 9$: Rendah (Low Priority)

---

### Tabel Analisis Risiko Proyek & Produk

| No | Kode Risiko | Deskripsi Risiko | Kategori | Dampak (Impact) | Kemungkinan (Likelihood) | Skor Prioritas | Strategi Mitigasi (Pencegahan & Solusi) |
| :---: | :---: | :--- | :---: | :---: | :---: | :---: | :--- |
| 1 | **RSK-01** | **Bug Kalkulasi Kupon Voucher Belanja**<br>Potongan diskon voucher melebihi batas maksimal (*cap*) atau berlaku meski subtotal di bawah `minOrder`. | Product Risk | 5 | 3 | **15** (Tinggi) | Mengisolasi kalkulasi pada fungsi murni `DiscountLogic.applyVoucher()`, membatasi potongan dengan `Math.min()`, dan menguji dengan teknik *Decision Table Testing*. |
| 2 | **RSK-02** | **Anomali Kuantitas Keranjang (Out-of-Bounds)**<br>Pengguna memasukkan kuantitas 0, angka negatif, pecahan, atau melampaui stok barang. | Product Risk | 4 | 4 | **16** (Tinggi) | Menerapkan *Boundary Value Analysis* (BVA) pada input kuantitas dengan batas ketat $1 \le Q \le 99$ dan auto-clamp terhadap sisa stok di `CartLogic.addItem()` dan `CartLogic.updateQuantity()`. |
| 3 | **RSK-03** | **Anomali Transisi Status Pesanan (Illegal State)**<br>Pesanan yang sudah dalam proses pengiriman atau selesai dibatalkan secara sepihak oleh pengguna. | Product Risk | 4 | 3 | **12** (Sedang) | Membuat *State Transition Matrix* di `OrderStateLogic.js` di mana status `Shipped` dan `Completed` menonaktifkan aksi pembatalan (*canCancel = false*). |
| 4 | **RSK-04** | **Autentikasi & Validasi Input Kredensial Lemah**<br>Pengguna mendaftar dengan email format salah atau membuat password tanpa enkripsi / terlalu sederhana. | Product Risk | 4 | 3 | **12** (Sedang) | Validasi regex standar RFC 5322 untuk email, dan minimal 8 karakter dengan kombinasi angka & huruf besar di `ValidationLogic.validatePassword()`. |
| 5 | **RSK-05** | **Data LocalStorage Korup atau Terhapus**<br>Jika cache browser dibersihkan saat sesi pengujian lab, aplikasi kehilangan referensi data. | Project Risk | 3 | 2 | **6** (Rendah) | Menambahkan tombol "*Reset Seed Data*" langsung di bar antarmuka atas untuk me-load ulang data bawaan kapan saja tanpa refresh manual. |
| 6 | **RSK-06** | **Kerapuhan Selektor Elemen pada Otomatisasi (Modul 5)**<br>Perubahan CSS class atau ID membuat script automated Cypress gagal mendeteksi target. | Project Risk | 3 | 3 | **9** (Sedang) | Menambahkan atribut penanda khusus `data-cy="..."` pada seluruh tombol, input, notifikasi, dan baris tabel sejak Modul 1. |
