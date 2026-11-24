const { describe, it } = require('node:test');
const assert = require('node:assert');
const ValidationLogic = require('../../js/logic/validationLogic');

describe('RQ-002: User Login & Security - Password Strength Validation', () => {
    it('TC-AUTH-05: Password kuat dengan kombinasi lengkap (>= 8 char, angka, simbol, huruf besar)', () => {
        // Arrange
        const passwordInput = "QuickShop2026!Secure";

        // Act
        const result = ValidationLogic.validatePassword(passwordInput);

        // Assert
        assert.strictEqual(result.valid, true);
        assert.strictEqual(result.strength, "strong");
    });

    it('TC-AUTH-06: Password kurang dari batas minimal 8 karakter harus ditolak', () => {
        // Arrange
        const passwordInput = "Pass1!";

        // Act
        const result = ValidationLogic.validatePassword(passwordInput);

        // Assert
        assert.strictEqual(result.valid, false);
        assert.strictEqual(result.message, "Password minimal 8 karakter.");
    });

    it('TC-AUTH-07: Password tanpa huruf kapital harus ditolak', () => {
        // Arrange
        const passwordInput = "password12345!";

        // Act
        const result = ValidationLogic.validatePassword(passwordInput);

        // Assert
        assert.strictEqual(result.valid, false);
        assert.ok(result.message.includes("kombinasi"));
    });

    it('TC-AUTH-08: Password tanpa angka harus ditolak', () => {
        // Arrange
        const passwordInput = "PasswordSecure!";

        // Act
        const result = ValidationLogic.validatePassword(passwordInput);

        // Assert
        assert.strictEqual(result.valid, false);
        assert.ok(result.message.includes("kombinasi"));
    });
});
