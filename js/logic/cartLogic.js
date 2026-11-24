/**
 * QuickShop SQA - Shopping Cart Pure Logic
 * Dirancang untuk pengujian CRUD, Boundary Value Analysis, dan White-box (Modul 3 & 4).
 */

const CartLogic = {
  /**
   * Menambahkan produk ke dalam keranjang
   * @param {Array} cart
   * @param {Object} product
   * @param {number} qtyToAdd
   * @returns {{ success: boolean, cart: Array, message: string }}
   */
  addItem(cart = [], product, qtyToAdd = 1) {
    if (!product || !product.id) {
      return { success: false, cart, message: "Produk tidak valid." };
    }

    const qty = parseInt(qtyToAdd, 10);
    if (isNaN(qty) || qty < 1) {
      return { success: false, cart, message: "Kuantitas yang ditambahkan minimal 1." };
    }

    const newCart = JSON.parse(JSON.stringify(cart));
    const existingIndex = newCart.findIndex(item => item.id === product.id);

    if (existingIndex > -1) {
      const currentQty = newCart[existingIndex].qty;
      const targetQty = currentQty + qty;

      if (targetQty > 99) {
        return {
          success: false,
          cart,
          message: "Kuantitas maksimal keranjang per item adalah 99 barang."
        };
      }

      if (targetQty > product.stock) {
        return {
          success: false,
          cart,
          message: `Stok produk tidak mencukupi (sisa ${product.stock} barang).`
        };
      }

      newCart[existingIndex].qty = targetQty;
    } else {
      if (qty > 99) {
        return {
          success: false,
          cart,
          message: "Kuantitas maksimal per item adalah 99 barang."
        };
      }
      if (qty > product.stock) {
        return {
          success: false,
          cart,
          message: `Stok produk tidak mencukupi (tersedia ${product.stock} barang).`
        };
      }

      newCart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        stock: product.stock,
        qty: qty
      });
    }

    return {
      success: true,
      cart: newCart,
      message: `"${product.name}" berhasil ditambahkan ke keranjang.`
    };
  },

  /**
   * Memperbarui kuantitas barang dalam keranjang dengan boundary 1-99
   * @param {Array} cart
   * @param {number} productId
   * @param {number} newQty
   * @returns {{ success: boolean, cart: Array, message: string }}
   */
  updateQuantity(cart = [], productId, newQty) {
    const qty = parseInt(newQty, 10);
    if (isNaN(qty) || qty < 1) {
      return { success: false, cart, message: "Kuantitas minimal adalah 1. Gunakan tombol hapus untuk membatalkan." };
    }

    if (qty > 99) {
      return { success: false, cart, message: "Kuantitas maksimal per item adalah 99 barang." };
    }

    const newCart = JSON.parse(JSON.stringify(cart));
    const item = newCart.find(i => i.id === productId);

    if (!item) {
      return { success: false, cart, message: "Item tidak ditemukan di keranjang." };
    }

    if (qty > item.stock) {
      return { success: false, cart, message: `Stok hanya tersedia ${item.stock} unit.` };
    }

    item.qty = qty;
    return { success: true, cart: newCart, message: "Kuantitas berhasil diperbarui." };
  },

  /**
   * Menghapus produk dari keranjang
   * @param {Array} cart
   * @param {number} productId
   * @returns {{ success: boolean, cart: Array, message: string }}
   */
  removeItem(cart = [], productId) {
    const newCart = cart.filter(item => item.id !== productId);
    return { success: true, cart: newCart, message: "Item berhasil dihapus dari keranjang." };
  },

  /**
   * Menghitung subtotal dan jumlah total unit di keranjang
   * @param {Array} cart
   * @returns {{ totalItems: number, subtotal: number }}
   */
  calculateTotals(cart = []) {
    let totalItems = 0;
    let subtotal = 0;

    for (const item of cart) {
      const q = parseInt(item.qty, 10) || 0;
      const p = parseInt(item.price, 10) || 0;
      totalItems += q;
      subtotal += q * p;
    }

    return { totalItems, subtotal };
  }
};

if (typeof window !== "undefined") {
  window.CartLogic = CartLogic;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = CartLogic;
}
