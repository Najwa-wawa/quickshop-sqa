const { describe, it } = require('node:test');
const assert = require('node:assert');
const DiscountLogic = require('../js/logic/discountLogic');

describe('White-Box Testing: DiscountLogic.calculateShippingCost', () => {

    // ==========================================
    // TEST DOUBLE 1: STUB
    // Menyediakan nilai kembalian tetap tarif kurir
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
    // TEST DOUBLE 2: MOCK
    // Merekam dan memverifikasi interaksi pemanggilan
    // ==========================================
    const AuditLoggerMock = {
        logs: [],
        logShipping(city, service, cost) {
            this.logs.push({ city, service, cost, timestamp: Date.now() });
        },
        verifyCalledWith(expectedCity, expectedService) {
            return this.logs.some(l => l.city === expectedCity && l.service === expectedService);
        }
    };

    it('TC-01: Tujuan Malang + Layanan Reguler (Base rate Malang)', () => {
        // Arrange
        const city = "Malang";
        const service = "reguler";

        // Act
        const result = DiscountLogic.calculateShippingCost(city, service);
        AuditLoggerMock.logShipping(city, service, result.cost);

        // Assert
        assert.strictEqual(result.cost, 10000);
        assert.strictEqual(result.estimatedDays, "1-2 hari");
        assert.ok(AuditLoggerMock.verifyCalledWith("Malang", "reguler"));
    });

    it('TC-02: Tujuan Surabaya + Layanan Express (Gerbangkertosusila + Express 1.7x)', () => {
        // Arrange
        const city = "Surabaya";
        const service = "express";

        // Act
        const result = DiscountLogic.calculateShippingCost(city, service);
        AuditLoggerMock.logShipping(city, service, result.cost);

        // Assert
        assert.strictEqual(result.cost, 25500); // 15000 * 1.7 = 25500
        assert.strictEqual(result.estimatedDays, "1 hari (Kilat)");
        assert.ok(AuditLoggerMock.verifyCalledWith("Surabaya", "express"));
    });

    it('TC-03: Tujuan Jakarta + Layanan Same-Day (Megapolitan + Same-Day 2.5x)', () => {
        // Arrange
        const city = "Jakarta";
        const service = "same-day";

        // Act
        const result = DiscountLogic.calculateShippingCost(city, service);
        AuditLoggerMock.logShipping(city, service, result.cost);

        // Assert
        assert.strictEqual(result.cost, 55000); // 22000 * 2.5 = 55000
        assert.strictEqual(result.estimatedDays, "Hari ini sampai");
        assert.ok(AuditLoggerMock.verifyCalledWith("Jakarta", "same-day"));
    });

    it('TC-04: Tujuan Denpasar (Luar Jawa) + Layanan Reguler (Tarif luar kota)', () => {
        // Arrange
        const city = "Denpasar";
        const service = "reguler";

        // Act
        const result = DiscountLogic.calculateShippingCost(city, service);
        AuditLoggerMock.logShipping(city, service, result.cost);

        // Assert
        assert.strictEqual(result.cost, 38000);
        assert.strictEqual(result.estimatedDays, "3-5 hari");
        assert.ok(AuditLoggerMock.verifyCalledWith("Denpasar", "reguler"));
    });
});
