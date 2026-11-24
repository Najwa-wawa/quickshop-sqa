const { describe, it } = require('node:test');
const assert = require('node:assert');
const ValidationLogic = require('../../js/logic/validationLogic');

describe('RQ-001: User Registration - Email Format Validation', () => {
    it('TC-AUTH-01: Email format standar valid harus diterima (AAA Pattern)', () => {
        // Arrange
        const emailInput = "najwah.student@umm.ac.id";

        // Act
        const result = ValidationLogic.validateEmail(emailInput);

        // Assert
        assert.strictEqual(result.valid, true);
        assert.strictEqual(result.message, "Email valid.");
    });

    it('TC-AUTH-02: Email kosong atau whitespace harus ditolak', () => {
        // Arrange
        const emailInput = "";

        // Act
        const result = ValidationLogic.validateEmail(emailInput);

        // Assert
        assert.strictEqual(result.valid, false);
        assert.strictEqual(result.message, "Email tidak boleh kosong.");
    });

    it('TC-AUTH-03: Email tanpa simbol @ harus ditolak', () => {
        // Arrange
        const emailInput = "najwahstudent.umm.ac.id";

        // Act
        const result = ValidationLogic.validateEmail(emailInput);

        // Assert
        assert.strictEqual(result.valid, false);
        assert.strictEqual(result.message, "Format email tidak valid (contoh: user@domain.com).");
    });

    it('TC-AUTH-04: Email di bawah panjang minimal 5 karakter harus ditolak', () => {
        // Arrange
        const emailInput = "a@b.";

        // Act
        const result = ValidationLogic.validateEmail(emailInput);

        // Assert
        assert.strictEqual(result.valid, false);
        assert.strictEqual(result.message, "Panjang email harus antara 5 hingga 100 karakter.");
    });
});
