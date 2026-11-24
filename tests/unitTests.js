/**
 * QuickShop SQA - Automated Unit Test Suites
 * Dirancang untuk demonstrasi White-Box Testing, EP, BVA, Decision Table, dan State Transition.
 * Dapat dieksekusi secara otomatis di browser via test-runner.html maupun di Node.js.
 */

const testSuites = [
  {
    name: "Suite 1: Boundary Value Analysis (BVA) - Kuantitas Keranjang [1..99]",
    tests: [
      {
        description: "BVA Min Boundary (Nilai 1) - Harus Diterima",
        fn: () => {
          const res = ValidationLogic.validateQuantity(1, 50);
          return { pass: res.valid === true && res.sanitizedQty === 1, details: `Hasil: valid=${res.valid}` };
        }
      },
      {
        description: "BVA Below Min (Nilai 0) - Harus Ditolak (Kuantitas minimal 1)",
        fn: () => {
          const res = ValidationLogic.validateQuantity(0, 50);
          return { pass: res.valid === false && res.sanitizedQty === 1, details: `Hasil pesan: "${res.message}"` };
        }
      },
      {
        description: "BVA Negative Value (Nilai -5) - Harus Ditolak",
        fn: () => {
          const res = ValidationLogic.validateQuantity(-5, 50);
          return { pass: res.valid === false, details: `Hasil pesan: "${res.message}"` };
        }
      },
      {
        description: "BVA Max Boundary (Nilai 99) - Harus Diterima jika stok cukup",
        fn: () => {
          const res = ValidationLogic.validateQuantity(99, 100);
          return { pass: res.valid === true && res.sanitizedQty === 99, details: `Hasil: valid=${res.valid}` };
        }
      },
      {
        description: "BVA Above Max (Nilai 100) - Harus Ditolak (Batas maksimal 99)",
        fn: () => {
          const res = ValidationLogic.validateQuantity(100, 150);
          return { pass: res.valid === false && res.sanitizedQty === 99, details: `Hasil pesan: "${res.message}"` };
        }
      },
      {
        description: "BVA Stok Exceeded - Input 30 saat stok hanya 20 harus ditolak",
        fn: () => {
          const res = ValidationLogic.validateQuantity(30, 20);
          return { pass: res.valid === false && res.sanitizedQty === 20, details: `Hasil pesan: "${res.message}"` };
        }
      }
    ]
  },
  {
    name: "Suite 2: Equivalence Partitioning (EP) - Validasi Email & Password",
    tests: [
      {
        description: "EP Valid Email (Format Standar: test.user@mail.com)",
        fn: () => {
          const res = ValidationLogic.validateEmail("test.user@mail.com");
          return { pass: res.valid === true, details: `Status: ${res.message}` };
        }
      },
      {
        description: "EP Invalid Email (Tanpa domain @: usermail.com)",
        fn: () => {
          const res = ValidationLogic.validateEmail("usermail.com");
          return { pass: res.valid === false, details: `Pesan error: ${res.message}` };
        }
      },
      {
        description: "EP Invalid Email (Karakter kosong: '')",
        fn: () => {
          const res = ValidationLogic.validateEmail("");
          return { pass: res.valid === false, details: `Pesan error: ${res.message}` };
        }
      },
      {
        description: "EP Password Valid Kuat (Password123!) - >= 8 char, angka, huruf besar, simbol",
        fn: () => {
          const res = ValidationLogic.validatePassword("Password123!");
          return { pass: res.valid === true && res.strength === "strong", details: `Kekuatan: ${res.strength}` };
        }
      },
      {
        description: "EP Password Lemah (< 8 Karakter: Pass1!)",
        fn: () => {
          const res = ValidationLogic.validatePassword("Pass1!");
          return { pass: res.valid === false, details: `Pesan error: ${res.message}` };
        }
      },
      {
        description: "EP Password Lemah (Tanpa Angka: Password!)",
        fn: () => {
          const res = ValidationLogic.validatePassword("Password!");
          return { pass: res.valid === false, details: `Pesan error: ${res.message}` };
        }
      }
    ]
  },
  {
    name: "Suite 3: Decision Table Testing - Logika Diskon & Voucher",
    tests: [
      {
        description: "Rule 1: Voucher Persentase (DISKON10) subtotal >= minOrder -> Diskon 10% dihitung",
        fn: () => {
          const mockVouchers = [{ code: "DISKON10", type: "percentage", value: 10, minOrder: 100000, maxDiscount: 50000 }];
          const res = DiscountLogic.applyVoucher(200000, "DISKON10", mockVouchers);
          return { pass: res.valid === true && res.discountAmount === 20000, details: `Diskon didapat: Rp ${res.discountAmount}` };
        }
      },
      {
        description: "Rule 2: Voucher Persentase (DISKON10) diskon melebihi maxDiscount -> Di-cap di maxDiscount (Rp 50.000)",
        fn: () => {
          const mockVouchers = [{ code: "DISKON10", type: "percentage", value: 10, minOrder: 100000, maxDiscount: 50000 }];
          // 10% dari 800.000 = 80.000, namun maxDiscount adalah 50.000
          const res = DiscountLogic.applyVoucher(800000, "DISKON10", mockVouchers);
          return { pass: res.valid === true && res.discountAmount === 50000, details: `Diskon dicap di: Rp ${res.discountAmount}` };
        }
      },
      {
        description: "Rule 3: Subtotal Belum Memenuhi minOrder -> Voucher ditolak",
        fn: () => {
          const mockVouchers = [{ code: "HEMAT50K", type: "fixed", value: 50000, minOrder: 300000 }];
          const res = DiscountLogic.applyVoucher(150000, "HEMAT50K", mockVouchers);
          return { pass: res.valid === false && res.discountAmount === 0, details: `Pesan: ${res.message}` };
        }
      },
      {
        description: "Rule 4: Voucher Kode Tidak Terdaftar -> Error not found",
        fn: () => {
          const mockVouchers = [{ code: "DISKON10", type: "percentage", value: 10, minOrder: 100000 }];
          const res = DiscountLogic.applyVoucher(200000, "KODEPALSU", mockVouchers);
          return { pass: res.valid === false, details: `Pesan: ${res.message}` };
        }
      }
    ]
  },
  {
    name: "Suite 4: State Transition Testing - Alur Siklus Pesanan (Order Lifecycle)",
    tests: [
      {
        description: "Valid Transition: Pending Payment ➔ Processing (Setelah bayar)",
        fn: () => {
          const res = OrderStateLogic.validateTransition("Pending Payment", "Processing");
          return { pass: res.valid === true, details: res.message };
        }
      },
      {
        description: "Valid Transition: Pending Payment ➔ Cancelled (Customer membatalkan)",
        fn: () => {
          const res = OrderStateLogic.validateTransition("Pending Payment", "Cancelled");
          return { pass: res.valid === true, details: res.message };
        }
      },
      {
        description: "Valid Transition: Processing ➔ Shipped (Kurir kirim barang)",
        fn: () => {
          const res = OrderStateLogic.validateTransition("Processing", "Shipped");
          return { pass: res.valid === true, details: res.message };
        }
      },
      {
        description: "Valid Transition: Shipped ➔ Completed (Customer konfirmasi barang diterima)",
        fn: () => {
          const res = OrderStateLogic.validateTransition("Shipped", "Completed");
          return { pass: res.valid === true, details: res.message };
        }
      },
      {
        description: "Illegal Transition: Shipped ➔ Cancelled (Barang dalam pengiriman TIDAK BOLEH dicancel)",
        fn: () => {
          const res = OrderStateLogic.validateTransition("Shipped", "Cancelled");
          return { pass: res.valid === false, details: res.message };
        }
      },
      {
        description: "Illegal Transition: Completed ➔ Processing (Order yang sudah selesai tidak bisa diproses ulang)",
        fn: () => {
          const res = OrderStateLogic.validateTransition("Completed", "Processing");
          return { pass: res.valid === false, details: res.message };
        }
      }
    ]
  },
  {
    name: "Suite 5: White-Box Testing - Logika Biaya Pengiriman (calculateShippingCost)",
    tests: [
      {
        description: "TC-01: Tujuan Malang + Layanan Reguler (Base rate Malang Rp 10.000)",
        fn: () => {
          const res = DiscountLogic.calculateShippingCost("Malang", "reguler");
          return {
            pass: res.cost === 10000 && res.estimatedDays === "1-2 hari",
            details: `Biaya: Rp ${res.cost.toLocaleString('id-ID')}, Estimasi: ${res.estimatedDays}`
          };
        }
      },
      {
        description: "TC-02: Tujuan Surabaya + Layanan Express (Gerbangkertosusila Rp 15.000 * 1.7 = Rp 25.500)",
        fn: () => {
          const res = DiscountLogic.calculateShippingCost("Surabaya", "express");
          return {
            pass: res.cost === 25500 && res.estimatedDays === "1 hari (Kilat)",
            details: `Biaya: Rp ${res.cost.toLocaleString('id-ID')}, Estimasi: ${res.estimatedDays}`
          };
        }
      },
      {
        description: "TC-03: Tujuan Jakarta + Layanan Same-Day (Megapolitan Rp 22.000 * 2.5 = Rp 55.000)",
        fn: () => {
          const res = DiscountLogic.calculateShippingCost("Jakarta", "same-day");
          return {
            pass: res.cost === 55000 && res.estimatedDays === "Hari ini sampai",
            details: `Biaya: Rp ${res.cost.toLocaleString('id-ID')}, Estimasi: ${res.estimatedDays}`
          };
        }
      },
      {
        description: "TC-04: Tujuan Denpasar Luar Jawa + Layanan Reguler (Base rate Rp 38.000)",
        fn: () => {
          const res = DiscountLogic.calculateShippingCost("Denpasar", "reguler");
          return {
            pass: res.cost === 38000 && res.estimatedDays === "3-5 hari",
            details: `Biaya: Rp ${res.cost.toLocaleString('id-ID')}, Estimasi: ${res.estimatedDays}`
          };
        }
      }
    ]
  }
];

if (typeof window !== "undefined") {
  window.testSuites = testSuites;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = testSuites;
}
