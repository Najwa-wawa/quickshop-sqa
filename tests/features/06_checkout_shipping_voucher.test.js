const { describe, it } = require('node:test');
const assert = require('node:assert');
const DiscountLogic = require('../../js/logic/discountLogic');

describe('RQ-006: Checkout - Shipping & Voucher Rules with Stub & Mock Doubles', () => {

    // ==========================================
    // TEST DOUBLE 2: STUB
    // Menyediakan respons tarif ekspedisi tetap tanpa memanggil server eksternal JNE/TIKI
    // ==========================================
    const CourierRateStub = {
        fetchRate: (city) => {
            if (city.toLowerCase().includes("malang")) return 10000;
            if (city.toLowerCase().includes("surabaya")) return 15000;
            if (city.toLowerCase().includes("jakarta")) return 22000;
            return 38000;
        }
    };

    // ==========================================
    // TEST DOUBLE 3: MOCK
    // Merekam dan memverifikasi interaksi pemanggilan pencatatan audit log
    // ==========================================
    const AuditLoggerMock = {
        invocations: [],
        logAction(actionName, details) {
            this.invocations.push({ actionName, details, timestamp: Date.now() });
        },
        verifyInvoked(expectedAction) {
            return this.invocations.some(inv => inv.actionName === expectedAction);
        }
    };

    it('TC-CHECKOUT-01: Kalkulasi ongkir Malang reguler (Stub & Mock verified)', () => {
        // Arrange
        const city = "Malang";
        const service = "reguler";

        // Act
        const res = DiscountLogic.calculateShippingCost(city, service);
        AuditLoggerMock.logAction("CALCULATE_SHIPPING", { city, service, cost: res.cost });

        // Assert
        assert.strictEqual(res.cost, 10000);
        assert.strictEqual(res.estimatedDays, "1-2 hari");
        assert.ok(AuditLoggerMock.verifyInvoked("CALCULATE_SHIPPING"));
    });

    it('TC-CHECKOUT-02: Kalkulasi ongkir Surabaya layanan express (15.000 * 1.7 = 25.500)', () => {
        // Arrange
        const city = "Surabaya";
        const service = "express";

        // Act
        const res = DiscountLogic.calculateShippingCost(city, service);

        // Assert
        assert.strictEqual(res.cost, 25500);
        assert.strictEqual(res.estimatedDays, "1 hari (Kilat)");
    });

    it('TC-CHECKOUT-03: Voucher persentase DISKON10 berhasil dipotong dengan limit maxDiscount', () => {
        // Arrange
        const subtotal = 800000;
        const vouchers = [
            { code: "DISKON10", type: "percentage", value: 10, minOrder: 100000, maxDiscount: 50000 }
        ];

        // Act
        const res = DiscountLogic.applyVoucher(subtotal, "DISKON10", vouchers);

        // Assert
        assert.strictEqual(res.valid, true);
        assert.strictEqual(res.discountAmount, 50000); // capped at maxDiscount 50.000
    });

    it('TC-CHECKOUT-04: Voucher ditolak jika subtotal belum memenuhi batas minOrder', () => {
        // Arrange
        const subtotal = 150000;
        const vouchers = [
            { code: "HEMAT50K", type: "fixed", value: 50000, minOrder: 300000 }
        ];

        // Act
        const res = DiscountLogic.applyVoucher(subtotal, "HEMAT50K", vouchers);

        // Assert
        assert.strictEqual(res.valid, false);
        assert.strictEqual(res.discountAmount, 0);
        assert.ok(res.message.includes("Minimal belanja"));
    });
});
