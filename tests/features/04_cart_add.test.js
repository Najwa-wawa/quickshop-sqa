const { describe, it } = require('node:test');
const assert = require('node:assert');
const CartLogic = require('../../js/logic/cartLogic');

describe('RQ-004: Shopping Cart - Add Product to Cart with Dummy Double', () => {

    // ==========================================
    // TEST DOUBLE 1: DUMMY
    // Objek dummy untuk memenuhi metadata promosi dan analitik yang tidak dieksekusi dalam unit ini
    // ==========================================
    const dummyAnalyticsTracker = {
        trackEvent: () => { throw new Error("Dummy should never be called during unit test"); }
    };

    it('TC-CART-01: Menambahkan produk baru ke keranjang kosong (AAA Pattern)', () => {
        // Arrange
        const initialCart = [];
        const product = {
            id: 1,
            name: "Wireless Headphones",
            price: 750000,
            category: "Electronics",
            stock: 120,
            _dummyMeta: dummyAnalyticsTracker // Penerapan Dummy Object
        };
        const qtyToAdd = 2;

        // Act
        const result = CartLogic.addItem(initialCart, product, qtyToAdd);

        // Assert
        assert.strictEqual(result.success, true);
        assert.strictEqual(result.cart.length, 1);
        assert.strictEqual(result.cart[0].qty, 2);
        assert.strictEqual(result.cart[0].price, 750000);
    });

    it('TC-CART-02: Menambahkan produk yang sudah ada di keranjang harus mengakumulasi kuantitas', () => {
        // Arrange
        const initialCart = [
            { id: 1, name: "Wireless Headphones", price: 750000, qty: 3, stock: 120 }
        ];
        const product = { id: 1, name: "Wireless Headphones", price: 750000, stock: 120 };
        const qtyToAdd = 4;

        // Act
        const result = CartLogic.addItem(initialCart, product, qtyToAdd);

        // Assert
        assert.strictEqual(result.success, true);
        assert.strictEqual(result.cart.length, 1);
        assert.strictEqual(result.cart[0].qty, 7); // 3 + 4 = 7
    });

    it('TC-CART-03: Menolak penambahan produk jika akumulasi melebihi batas maksimal 99 unit', () => {
        // Arrange
        const initialCart = [
            { id: 1, name: "Wireless Headphones", price: 750000, qty: 95, stock: 120 }
        ];
        const product = { id: 1, name: "Wireless Headphones", price: 750000, stock: 120 };
        const qtyToAdd = 10; // Total 105 > 99

        // Act
        const result = CartLogic.addItem(initialCart, product, qtyToAdd);

        // Assert
        assert.strictEqual(result.success, false);
        assert.strictEqual(result.message, "Kuantitas maksimal keranjang per item adalah 99 barang.");
    });

    it('TC-CART-04: Menolak penambahan jika data produk tidak valid (id kosong)', () => {
        // Arrange
        const initialCart = [];
        const invalidProduct = { name: "Tanpa ID" };

        // Act
        const result = CartLogic.addItem(initialCart, invalidProduct, 1);

        // Assert
        assert.strictEqual(result.success, false);
        assert.strictEqual(result.message, "Produk tidak valid.");
    });
});
