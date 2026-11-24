/**
 * QuickShop SQA - Validation Logic (Pure Functions)
 * Dirancang untuk mendukung pengujian Equivalence Partitioning (EP),
 * Boundary Value Analysis (BVA), dan White-box Testing (Modul 2, 3, 4).
 */

const ValidationLogic = {
  /**
   * Validasi format email
   * @param {string} email
   * @returns {{ valid: boolean, message: string }}
   */
  validateEmail(email) {
    if (!email || typeof email !== "string") {
      return { valid: false, message: "Email tidak boleh kosong." };
    }
    const trimmed = email.trim();
    if (trimmed.length < 5 || trimmed.length > 100) {
      return { valid: false, message: "Panjang email harus antara 5 hingga 100 karakter." };
    }
    // Regex standar RFC 5322 sederhana
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(trimmed)) {
      return { valid: false, message: "Format email tidak valid (contoh: user@domain.com)." };
    }
    return { valid: true, message: "Email valid." };
  },

  /**
   * Validasi kekuatan password
   * Aturan: Min 8 karakter, max 64 karakter, mengandung min 1 huruf besar, 1 angka, 1 simbol
   * @param {string} password
   * @returns {{ valid: boolean, strength: 'weak'|'medium'|'strong', message: string }}
   */
  validatePassword(password) {
    if (!password || typeof password !== "string") {
      return { valid: false, strength: "weak", message: "Password tidak boleh kosong." };
    }
    if (password.length < 8) {
      return { valid: false, strength: "weak", message: "Password minimal 8 karakter." };
    }
    if (password.length > 64) {
      return { valid: false, strength: "weak", message: "Password maksimal 64 karakter." };
    }

    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);

    let score = 0;
    if (hasUpper) score++;
    if (hasLower) score++;
    if (hasNumber) score++;
    if (hasSymbol) score++;

    if (score < 3 || !hasUpper || !hasNumber) {
      return {
        valid: false,
        strength: "weak",
        message: "Password harus mengandung kombinasi huruf besar, huruf kecil, dan angka."
      };
    }

    if (score === 3) {
      return { valid: true, strength: "medium", message: "Kekuatan password sedang." };
    }

    return { valid: true, strength: "strong", message: "Password sangat kuat." };
  },

  /**
   * Validasi nomor telepon format Indonesia
   * @param {string} phone
   * @returns {{ valid: boolean, message: string }}
   */
  validatePhone(phone) {
    if (!phone || typeof phone !== "string") {
      return { valid: false, message: "Nomor telepon tidak boleh kosong." };
    }
    const cleanPhone = phone.replace(/[\s-]/g, "");
    // Harus diawali 08 atau +628 atau 628, panjang 10-14 digit
    const phoneRegex = /^(\+62|62|0)8[1-9][0-9]{7,10}$/;
    if (!phoneRegex.test(cleanPhone)) {
      return { valid: false, message: "Nomor telepon harus format Indonesia valid (10-13 digit, diawali 08/628)." };
    }
    return { valid: true, message: "Nomor telepon valid." };
  },

  /**
   * Validasi kuantitas item (Boundary Value Analysis: 1 s.d 99)
   * @param {number|string} qty
   * @param {number} availableStock
   * @returns {{ valid: boolean, message: string, sanitizedQty: number }}
   */
  validateQuantity(qty, availableStock = 99) {
    const parsed = parseInt(qty, 10);
    if (isNaN(parsed)) {
      return { valid: false, message: "Kuantitas harus berupa angka bulat.", sanitizedQty: 1 };
    }
    if (parsed < 1) {
      return { valid: false, message: "Kuantitas minimal adalah 1 barang.", sanitizedQty: 1 };
    }
    if (parsed > 99) {
      return { valid: false, message: "Kuantitas maksimal per item adalah 99 barang.", sanitizedQty: 99 };
    }
    if (parsed > availableStock) {
      return {
        valid: false,
        message: `Kuantitas melebihi stok yang tersedia (${availableStock} barang).`,
        sanitizedQty: availableStock
      };
    }
    return { valid: true, message: "Kuantitas valid.", sanitizedQty: parsed };
  },

  /**
   * Validasi rating ulasan produk (BVA: 1 s.d 5 bintang)
   * @param {number|string} rating
   * @returns {{ valid: boolean, message: string }}
   */
  validateRating(rating) {
    const r = parseInt(rating, 10);
    if (isNaN(r) || r < 1 || r > 5) {
      return { valid: false, message: "Rating harus bernilai antara 1 sampai 5 bintang." };
    }
    return { valid: true, message: "Rating valid." };
  },

  /**
   * Validasi isi komentar ulasan (10 - 500 karakter)
   * @param {string} comment
   * @returns {{ valid: boolean, message: string }}
   */
  validateComment(comment) {
    if (!comment || typeof comment !== "string") {
      return { valid: false, message: "Ulasan tidak boleh kosong." };
    }
    const len = comment.trim().length;
    if (len < 10) {
      return { valid: false, message: "Ulasan terlalu pendek (minimal 10 karakter)." };
    }
    if (len > 500) {
      return { valid: false, message: "Ulasan terlalu panjang (maksimal 500 karakter)." };
    }
    return { valid: true, message: "Ulasan valid." };
  }
};

if (typeof window !== "undefined") {
  window.ValidationLogic = ValidationLogic;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = ValidationLogic;
}
