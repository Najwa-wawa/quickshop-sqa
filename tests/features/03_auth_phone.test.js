const { describe, it } = require('node:test');
const assert = require('node:assert');
const ValidationLogic = require('../../js/logic/validationLogic');

describe('RQ-003: Account Recovery & OTP - Phone Format Validation', () => {
    it('TC-AUTH-09: Nomor telepon format 08xx valid (10-13 digit)', () => {
        // Arrange
        const phoneInput = "081234567890";

        // Act
        const result = ValidationLogic.validatePhone(phoneInput);

        // Assert
        assert.strictEqual(result.valid, true);
        assert.strictEqual(result.message, "Nomor telepon valid.");
    });

    it('TC-AUTH-10: Nomor telepon dengan kode negara +628xx harus valid', () => {
        // Arrange
        const phoneInput = "+6281298765432";

        // Act
        const result = ValidationLogic.validatePhone(phoneInput);

        // Assert
        assert.strictEqual(result.valid, true);
        assert.strictEqual(result.message, "Nomor telepon valid.");
    });

    it('TC-AUTH-11: Nomor telepon kosong harus ditolak', () => {
        // Arrange
        const phoneInput = "";

        // Act
        const result = ValidationLogic.validatePhone(phoneInput);

        // Assert
        assert.strictEqual(result.valid, false);
        assert.strictEqual(result.message, "Nomor telepon tidak boleh kosong.");
    });

    it('TC-AUTH-12: Nomor telepon non-Indonesia atau terlalu pendek harus ditolak', () => {
        // Arrange
        const phoneInput = "02176543";

        // Act
        const result = ValidationLogic.validatePhone(phoneInput);

        // Assert
        assert.strictEqual(result.valid, false);
        assert.ok(result.message.includes("format Indonesia valid"));
    });
});
