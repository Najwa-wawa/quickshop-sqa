const { describe, it } = require('node:test');
const assert = require('node:assert');
const OrderStateLogic = require('../../js/logic/orderStateLogic');

describe('RQ-007: Order Lifecycle - State Machine Transitions with Fake Repository', () => {

    // ==========================================
    // TEST DOUBLE 4: FAKE
    // Implementasi database in-memory ringan untuk menyimpan status order saat testing
    // ==========================================
    class FakeOrderRepository {
        constructor() {
            this.orders = [];
        }
        createOrder(orderId, initialStatus) {
            this.orders.push({ orderId, status: initialStatus, history: [initialStatus] });
        }
        updateStatus(orderId, nextStatus) {
            const order = this.orders.find(o => o.orderId === orderId);
            if (!order) return false;
            const validation = OrderStateLogic.validateTransition(order.status, nextStatus);
            if (validation.valid) {
                order.status = nextStatus;
                order.history.push(nextStatus);
                return true;
            }
            return false;
        }
        getOrderStatus(orderId) {
            const order = this.orders.find(o => o.orderId === orderId);
            return order ? order.status : null;
        }
    }

    it('TC-ORDER-01: Transisi legal Pending Payment -> Processing berhasil disimpan di Fake Repository', () => {
        // Arrange
        const repo = new FakeOrderRepository();
        repo.createOrder("ORD-001", "Pending Payment");

        // Act
        const success = repo.updateStatus("ORD-001", "Processing");

        // Assert
        assert.strictEqual(success, true);
        assert.strictEqual(repo.getOrderStatus("ORD-001"), "Processing");
    });

    it('TC-ORDER-02: Transisi legal Processing -> Shipped berhasil', () => {
        // Arrange
        const repo = new FakeOrderRepository();
        repo.createOrder("ORD-002", "Processing");

        // Act
        const success = repo.updateStatus("ORD-002", "Shipped");

        // Assert
        assert.strictEqual(success, true);
        assert.strictEqual(repo.getOrderStatus("ORD-002"), "Shipped");
    });

    it('TC-ORDER-03: Transisi ilegal Shipped -> Cancelled harus ditolak (barang dalam perjalanan)', () => {
        // Arrange
        const repo = new FakeOrderRepository();
        repo.createOrder("ORD-003", "Shipped");

        // Act
        const success = repo.updateStatus("ORD-003", "Cancelled");

        // Assert
        assert.strictEqual(success, false);
        assert.strictEqual(repo.getOrderStatus("ORD-003"), "Shipped"); // Status tetap Shipped
    });

    it('TC-ORDER-04: Customer diizinkan cancel hanya saat status Pending Payment', () => {
        // Arrange & Act & Assert
        assert.strictEqual(OrderStateLogic.canCancelOrder("Pending Payment"), true);
        assert.strictEqual(OrderStateLogic.canCancelOrder("Processing"), false);
        assert.strictEqual(OrderStateLogic.canCancelOrder("Shipped"), false);
    });
});
