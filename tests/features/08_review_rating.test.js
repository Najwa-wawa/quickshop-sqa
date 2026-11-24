const { describe, it } = require('node:test');
const assert = require('node:assert');
const ValidationLogic = require('../../js/logic/validationLogic');

describe('RQ-008: Product Review & Customer Feedback Validation with Spy', () => {

    // ==========================================
    // TEST DOUBLE 5: SPY
    // Memantau frekuensi pemanggilan dan argumen validasi review tanpa mengubah fungsi aslinya
    // ==========================================
    const ReviewValidatorSpy = {
        callCount: 0,
        recordedArgs: [],
        spyValidate(rating, comment) {
            this.callCount++;
            this.recordedArgs.push({ rating, comment });
            const rRes = ValidationLogic.validateRating(rating);
            const cRes = ValidationLogic.validateComment(comment);
            return { valid: rRes.valid && cRes.valid, ratingRes: rRes, commentRes: cRes };
        }
    };

    it('TC-REVIEW-01: Ulasan valid dengan rating 5 bintang dan komentar 20 karakter', () => {
        // Arrange
        const rating = 5;
        const comment = "Produk sangat bagus dan pengiriman cepat sekali!";

        // Act
        const result = ReviewValidatorSpy.spyValidate(rating, comment);

        // Assert
        assert.strictEqual(result.valid, true);
        assert.strictEqual(ReviewValidatorSpy.callCount, 1);
        assert.strictEqual(ReviewValidatorSpy.recordedArgs[0].rating, 5);
    });

    it('TC-REVIEW-02: Rating di luar jangkauan 1-5 (contoh nilai 0 atau 6) harus ditolak', () => {
        // Arrange & Act
        const resZero = ValidationLogic.validateRating(0);
        const resSix = ValidationLogic.validateRating(6);

        // Assert
        assert.strictEqual(resZero.valid, false);
        assert.strictEqual(resSix.valid, false);
        assert.ok(resZero.message.includes("antara 1 sampai 5 bintang"));
    });

    it('TC-REVIEW-03: Komentar terlalu pendek (< 10 karakter) harus ditolak', () => {
        // Arrange
        const shortComment = "Bagus"; // Hanya 5 karakter

        // Act
        const res = ValidationLogic.validateComment(shortComment);

        // Assert
        assert.strictEqual(res.valid, false);
        assert.strictEqual(res.message, "Ulasan terlalu pendek (minimal 10 karakter).");
    });

    it('TC-REVIEW-04: Komentar melebihi 500 karakter harus ditolak', () => {
        // Arrange
        const longComment = "a".repeat(501);

        // Act
        const res = ValidationLogic.validateComment(longComment);

        // Assert
        assert.strictEqual(res.valid, false);
        assert.strictEqual(res.message, "Ulasan terlalu panjang (maksimal 500 karakter).");
    });
});
