/**
 * QuickShop SQA - Discount & Shipping Logic (Pure Business Rules)
 * Dirancang untuk Decision Table Testing, BVA, dan White-box Branch Coverage (Modul 3 & 4).
 */

const DiscountLogic = {
  /**
   * Menghitung diskon berdasarkan voucher dan subtotal belanja
   * Aturan bisnis:
   * 1. Subtotal < minOrder => Ditolak
   * 2. Tipe 'percentage' => diskon = subtotal * (val / 100), jika > maxDiscount maka dipotong maxDiscount
   * 3. Tipe 'fixed' => diskon = value, tidak boleh melebihi subtotal
   * 4. Tipe 'shipping' => diskon ongkir
   * 
   * @param {number} subtotal
   * @param {string} voucherCode
   * @param {Array} voucherList
   * @param {number} shippingCost
   * @returns {{ valid: boolean, discountAmount: number, shippingDiscount: number, message: string }}
   */
  applyVoucher(subtotal, voucherCode, voucherList = [], shippingCost = 0) {
    if (!voucherCode || typeof voucherCode !== "string") {
      return { valid: false, discountAmount: 0, shippingDiscount: 0, message: "Kode voucher harus diisi." };
    }

    const code = voucherCode.trim().toUpperCase();
    const voucher = voucherList.find(v => v.code === code);

    if (!voucher) {
      return { valid: false, discountAmount: 0, shippingDiscount: 0, message: `Voucher "${code}" tidak ditemukan atau kadaluarsa.` };
    }

    if (subtotal < voucher.minOrder) {
      const diff = voucher.minOrder - subtotal;
      return {
        valid: false,
        discountAmount: 0,
        shippingDiscount: 0,
        message: `Minimal belanja untuk voucher ${code} adalah Rp ${voucher.minOrder.toLocaleString('id-ID')} (kurang Rp ${diff.toLocaleString('id-ID')}).`
      };
    }

    let discountAmount = 0;
    let shippingDiscount = 0;

    if (voucher.type === "percentage") {
      const calculated = Math.round((subtotal * voucher.value) / 100);
      discountAmount = Math.min(calculated, voucher.maxDiscount || calculated);
      return {
        valid: true,
        discountAmount,
        shippingDiscount: 0,
        message: `Voucher ${code} berhasil dipasang! Potongan diskon Rp ${discountAmount.toLocaleString('id-ID')}.`
      };
    } else if (voucher.type === "fixed") {
      discountAmount = Math.min(voucher.value, subtotal);
      return {
        valid: true,
        discountAmount,
        shippingDiscount: 0,
        message: `Voucher ${code} berhasil dipasang! Hemat Rp ${discountAmount.toLocaleString('id-ID')}.`
      };
    } else if (voucher.type === "shipping") {
      shippingDiscount = Math.min(voucher.value, shippingCost);
      return {
        valid: true,
        discountAmount: 0,
        shippingDiscount,
        message: `Voucher ${code} berhasil! Gratis ongkir Rp ${shippingDiscount.toLocaleString('id-ID')}.`
      };
    }

    return { valid: false, discountAmount: 0, shippingDiscount: 0, message: "Tipe voucher tidak dikenali." };
  },

  /**
   * Menghitung ongkos kirim berdasarkan kota tujuan dan jenis kurir
   * @param {string} destinationCity
   * @param {'reguler'|'express'|'same-day'} serviceType
   * @returns {{ cost: number, estimatedDays: string }}
   */
  calculateShippingCost(destinationCity = "Malang", serviceType = "reguler") {
    const city = destinationCity.toLowerCase();
    let baseRate = 12000;
    let days = "2-3 hari";

    if (city.includes("malang")) {
      baseRate = 10000;
      days = "1-2 hari";
    } else if (city.includes("surabaya") || city.includes("sidoarjo") || city.includes("gresik")) {
      baseRate = 15000;
      days = "1-2 hari";
    } else if (city.includes("jakarta") || city.includes("bandung") || city.includes("semarang")) {
      baseRate = 22000;
      days = "2-3 hari";
    } else {
      // Luar Jawa / kota lain
      baseRate = 38000;
      days = "3-5 hari";
    }

    let multiplier = 1.0;
    if (serviceType === "express") {
      multiplier = 1.7;
      days = "1 hari (Kilat)";
    } else if (serviceType === "same-day") {
      multiplier = 2.5;
      days = "Hari ini sampai";
    }

    const cost = Math.round(baseRate * multiplier);
    return { cost, estimatedDays: days };
  },

  /**
   * Kalkulasi final tagihan belanja
   * @param {number} subtotal
   * @param {number} discountAmount
   * @param {number} shippingCost
   * @param {number} shippingDiscount
   * @returns {number} totalPayment
   */
  calculateFinalTotal(subtotal, discountAmount = 0, shippingCost = 0, shippingDiscount = 0) {
    const netSubtotal = Math.max(0, subtotal - discountAmount);
    const netShipping = Math.max(0, shippingCost - shippingDiscount);
    return netSubtotal + netShipping;
  }
};

if (typeof window !== "undefined") {
  window.DiscountLogic = DiscountLogic;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = DiscountLogic;
}
