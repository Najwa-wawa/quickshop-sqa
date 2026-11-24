/**
 * QuickShop SQA - Storage Service
 * Mengelola persistensi data menggunakan localStorage dengan fungsi Reset Seed Data.
 */

const STORAGE_KEYS = {
  USERS: "qs_users",
  CURRENT_USER: "qs_current_user",
  PRODUCTS: "qs_products",
  CART: "qs_cart",
  ORDERS: "qs_orders",
  VOUCHERS: "qs_vouchers",
  REVIEWS: "qs_reviews",
  INITIALIZED: "qs_initialized_v2"
};

const StorageService = {
  init() {
    const isInit = localStorage.getItem(STORAGE_KEYS.INITIALIZED);
    if (!isInit || !localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
      this.resetToDefaults();
    }
  },

  resetToDefaults() {
    const initData = window.INITIAL_DATA || {
      users: [],
      products: [],
      vouchers: [],
      orders: []
    };

    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(initData.users || []));
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(initData.users ? initData.users[0] : null));
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(initData.products || []));
    localStorage.setItem(STORAGE_KEYS.VOUCHERS, JSON.stringify(initData.vouchers || []));
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(initData.orders || []));
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify([]));
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify([]));
    localStorage.setItem(STORAGE_KEYS.INITIALIZED, "true");
  },

  // Users
  getUsers() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS)) || [];
    } catch {
      return [];
    }
  },

  saveUsers(users) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  },

  getCurrentUser() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.CURRENT_USER));
    } catch {
      return null;
    }
  },

  setCurrentUser(user) {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
  },

  // Products
  getProducts() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.PRODUCTS)) || [];
    } catch {
      return [];
    }
  },

  saveProducts(products) {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  },

  // Vouchers
  getVouchers() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.VOUCHERS)) || [];
    } catch {
      return [];
    }
  },

  // Cart
  getCart() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.CART)) || [];
    } catch {
      return [];
    }
  },

  saveCart(cart) {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  },

  // Orders
  getOrders() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.ORDERS)) || [];
    } catch {
      return [];
    }
  },

  saveOrders(orders) {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  },

  // Reviews
  getReviews() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.REVIEWS)) || [];
    } catch {
      return [];
    }
  },

  saveReviews(reviews) {
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
  }
};

if (typeof window !== "undefined") {
  window.StorageService = StorageService;
}
