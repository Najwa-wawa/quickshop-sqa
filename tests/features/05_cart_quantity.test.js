const { describe, it } = require('node:test');
const assert = require('node:assert');
const ValidationLogic = require('../../js/logic/validationLogic');

describe('RQ-005: Shopping Cart Boundary Limits - validateQuantity (BVA)', () => {
    it('TC-CART-05: BVA Batas Bawah Valid (Nilai 1)', () => {
        // Arrange
        const qty = 1;
        const stock = 50;

        // Act
        const result = ValidationLogic.validateQuantity(qty, stock);

        // Assert
        assert.strictEqual(result.valid, true);
        assert.strictEqual(result.sanitizedQty, 1);
    });

    it('TC-CART-06: BVA Batas Atas Valid (Nilai 99)', () => {
        // Arrange
        const qty = 99;
        const stock = 100;

        // Act
        const result = ValidationLogic.validateQuantity(qty, stock);

        // Assert
        assert.strictEqual(result.valid, true);
        assert.strictEqual(result.sanitizedQty, 99);
    });

    it('TC-CART-07: BVA Di Bawah Minimum (Nilai 0) harus ditolak', () => {
        // Arrange
        const qty = 0;
        const stock = 50;

        // Act
        const result = ValidationLogic.validateQuantity(qty, stock);

        // Assert
        assert.strictEqual(result.valid, false);
        assert.strictEqual(result.message, "Kuantitas minimal adalah 1 barang.");
    });

    it('TC-CART-08: BVA Di Atas Maksimum (Nilai 100) harus ditolak', () => {
        // Arrange
        const qty = 100;
        const stock = 150;

        // Act
        const result = ValidationLogic.validateQuantity(qty, stock);

        // Assert
        assert.strictEqual(result.valid, false);
        assert.strictEqual(result.message, "Kuantitas maksimal per item adalah 99 barang.");
    });

    it('TC-CART-09: BVA Melebihi Stok Gudang (Input 30 saat stok hanya 20)', () => {
        // Arrange
        const qty = 30;
        const stock = 20;

        // Act
        const result = ValidationLogic.validateQuantity(qty, stock);

        // Assert
        assert.strictEqual(result.valid, false);
        assert.strictEqual(result.message, "Kuantitas melebihi stok yang tersedia (20 barang).");
    });
});
