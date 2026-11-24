/**
 * QuickShop SQA - Order Lifecycle & State Machine Logic
 * Dirancang untuk State Transition Testing (Modul 2, 3, 4).
 */

const OrderStateLogic = {
  STATUSES: {
    PENDING: "Pending Payment",
    PROCESSING: "Processing",
    SHIPPED: "Shipped",
    COMPLETED: "Completed",
    CANCELLED: "Cancelled"
  },

  /**
   * Menentukan apakah pesanan dapat dibatalkan oleh Customer
   * Aturan bisnis: Hanya status "Pending Payment" yang diizinkan untuk dicancel.
   * @param {string} currentStatus
   * @returns {boolean}
   */
  canCancelOrder(currentStatus) {
    return currentStatus === this.STATUSES.PENDING;
  },

  /**
   * Menentukan apakah pesanan dapat dikonfirmasi selesai oleh Customer
   * Aturan bisnis: Hanya pesanan berstatus "Shipped" yang bisa diselesaikan.
   * @param {string} currentStatus
   * @returns {boolean}
   */
  canConfirmReceipt(currentStatus) {
    return currentStatus === this.STATUSES.SHIPPED;
  },

  /**
   * Memvalidasi transisi status dari status lama ke status baru
   * @param {string} fromStatus
   * @param {string} toStatus
   * @returns {{ valid: boolean, message: string }}
   */
  validateTransition(fromStatus, toStatus) {
    const S = this.STATUSES;

    // Matriks transisi yang valid
    const validTransitions = {
      [S.PENDING]: [S.PROCESSING, S.CANCELLED],
      [S.PROCESSING]: [S.SHIPPED],
      [S.SHIPPED]: [S.COMPLETED],
      [S.COMPLETED]: [], // State terminal / akhir
      [S.CANCELLED]: []  // State terminal / akhir
    };

    if (!validTransitions[fromStatus]) {
      return { valid: false, message: `Status awal "${fromStatus}" tidak dikenali.` };
    }

    if (!validTransitions[fromStatus].includes(toStatus)) {
      return {
        valid: false,
        message: `Transisi tidak diizinkan: Dari "${fromStatus}" tidak dapat berpindah ke "${toStatus}".`
      };
    }

    return { valid: true, message: `Transisi status ke "${toStatus}" berhasil.` };
  },

  /**
   * Mengambil badge warna dan label teks untuk UI
   * @param {string} status
   * @returns {{ bg: string, text: string, label: string }}
   */
  getStatusBadgeInfo(status) {
    switch (status) {
      case "Pending Payment":
        return { bg: "badge-warning", text: "text-amber-800", label: "Menunggu Pembayaran" };
      case "Processing":
        return { bg: "badge-info", text: "text-blue-800", label: "Sedang Diproses" };
      case "Shipped":
        return { bg: "badge-primary", text: "text-indigo-800", label: "Dalam Pengiriman" };
      case "Completed":
        return { bg: "badge-success", text: "text-emerald-800", label: "Selesai" };
      case "Cancelled":
        return { bg: "badge-danger", text: "text-rose-800", label: "Dibatalkan" };
      default:
        return { bg: "badge-secondary", text: "text-gray-800", label: status };
    }
  }
};

if (typeof window !== "undefined") {
  window.OrderStateLogic = OrderStateLogic;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = OrderStateLogic;
}
