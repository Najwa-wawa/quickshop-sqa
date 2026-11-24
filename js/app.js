/**
 * QuickShop SQA - Main Application Controller
 * Mengintegrasikan UI, Event Handlers, LocalStorage, dan Pure Logic Modules
 */

document.addEventListener("DOMContentLoaded", () => {
  // Inisialisasi Storage
  StorageService.init();

  // State runtime aktif
  let activeTab = "catalog";
  let appliedVoucher = null;
  let simulatedOtp = null;
  let resetTargetEmail = null;

  // DOM Elements - Navigation & Auth
  const navUserGuest = document.getElementById("nav-user-guest");
  const navUserLogged = document.getElementById("nav-user-logged");
  const navUserName = document.getElementById("nav-user-name");
  const btnShowLogin = document.getElementById("btn-show-login");
  const btnShowRegister = document.getElementById("btn-show-register");
  const btnLogout = document.getElementById("btn-logout");
  const btnResetDb = document.getElementById("btn-reset-db");
  const cartCounter = document.getElementById("cart-counter");
  const ordersBadge = document.getElementById("orders-badge");

  // DOM Elements - Tabs & Views
  const tabItems = document.querySelectorAll(".tab-item");
  const viewCatalog = document.getElementById("view-catalog");
  const viewOrders = document.getElementById("view-orders");
  const viewProfile = document.getElementById("view-profile");

  // DOM Elements - Catalog
  const searchInput = document.getElementById("search-input");
  const filterCategory = document.getElementById("filter-category");
  const filterSort = document.getElementById("filter-sort");
  const productsContainer = document.getElementById("products-container");

  // DOM Elements - Cart Modal
  const btnOpenCart = document.getElementById("btn-open-cart");
  const modalCart = document.getElementById("modal-cart");
  const cartItemsContainer = document.getElementById("cart-items-container");
  const cartSubtotalDisplay = document.getElementById("cart-subtotal-display");
  const btnClearCart = document.getElementById("btn-clear-cart");
  const btnOpenCheckout = document.getElementById("btn-open-checkout");

  // DOM Elements - Checkout Modal
  const modalCheckout = document.getElementById("modal-checkout");
  const coName = document.getElementById("co-name");
  const coAddress = document.getElementById("co-address");
  const coCity = document.getElementById("co-city");
  const coCourier = document.getElementById("co-courier");
  const coVoucherInput = document.getElementById("co-voucher-input");
  const btnApplyVoucher = document.getElementById("btn-apply-voucher");
  const coVoucherMsg = document.getElementById("co-voucher-msg");
  const coSubtotal = document.getElementById("co-subtotal");
  const coShippingCost = document.getElementById("co-shipping-cost");
  const coDiscountAmount = document.getElementById("co-discount-amount");
  const coShippingDiscount = document.getElementById("co-shipping-discount");
  const coTotalPayment = document.getElementById("co-total-payment");
  const coPaymentMethod = document.getElementById("co-payment-method");
  const btnSubmitOrder = document.getElementById("btn-submit-order");

  // DOM Elements - Orders View
  const ordersTbody = document.getElementById("orders-tbody");

  // DOM Elements - Profile View
  const formUpdateProfile = document.getElementById("form-update-profile");
  const profName = document.getElementById("prof-name");
  const profEmail = document.getElementById("prof-email");
  const profPhone = document.getElementById("prof-phone");
  const profPhoneErr = document.getElementById("prof-phone-err");
  const profAddress = document.getElementById("prof-address");
  const formChangePassword = document.getElementById("form-change-password");
  const cpCurrent = document.getElementById("cp-current");
  const cpNew = document.getElementById("cp-new");
  const cpNewErr = document.getElementById("cp-new-err");

  // DOM Elements - Auth Modals
  const modalLogin = document.getElementById("modal-login");
  const formLogin = document.getElementById("form-login");
  const loginEmail = document.getElementById("login-email");
  const loginPassword = document.getElementById("login-password");
  const loginEmailErr = document.getElementById("login-email-err");
  const loginPassErr = document.getElementById("login-pass-err");
  const btnSwitchToRegister = document.getElementById("btn-switch-to-register");

  const modalRegister = document.getElementById("modal-register");
  const formRegister = document.getElementById("form-register");
  const regName = document.getElementById("reg-name");
  const regEmail = document.getElementById("reg-email");
  const regPhone = document.getElementById("reg-phone");
  const regPassword = document.getElementById("reg-password");
  const regConfirm = document.getElementById("reg-confirm");
  const regEmailErr = document.getElementById("reg-email-err");
  const regPhoneErr = document.getElementById("reg-phone-err");
  const regPassErr = document.getElementById("reg-pass-err");
  const regConfirmErr = document.getElementById("reg-confirm-err");
  const btnSwitchToLogin = document.getElementById("btn-switch-to-login");

  const modalForgot = document.getElementById("modal-forgot");
  const linkForgotPassword = document.getElementById("link-forgot-password");
  const forgotStep1 = document.getElementById("forgot-step-1");
  const forgotStep2 = document.getElementById("forgot-step-2");
  const formForgotRequest = document.getElementById("form-forgot-request");
  const forgotEmail = document.getElementById("forgot-email");
  const forgotEmailErr = document.getElementById("forgot-email-err");
  const displayOtpCode = document.getElementById("display-otp-code");
  const formForgotReset = document.getElementById("form-forgot-reset");
  const resetOtpInput = document.getElementById("reset-otp-input");
  const resetNewPassword = document.getElementById("reset-new-password");
  const resetConfirmPassword = document.getElementById("reset-confirm-password");
  const resetPassErr = document.getElementById("reset-pass-err");
  const resetConfirmErr = document.getElementById("reset-confirm-err");

  // DOM Elements - Review Modal
  const modalReview = document.getElementById("modal-review");
  const formReview = document.getElementById("form-review");
  const revProductId = document.getElementById("rev-product-id");
  const revOrderId = document.getElementById("rev-order-id");
  const revProductName = document.getElementById("rev-product-name");
  const revRating = document.getElementById("rev-rating");
  const revComment = document.getElementById("rev-comment");
  const revCommentErr = document.getElementById("rev-comment-err");

  // ==========================================
  // HELPER FUNCTIONS (Toasts & Modals)
  // ==========================================
  function showToast(message, type = "info") {
    const container = document.getElementById("toast-container");
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    let icon = "ℹ️";
    if (type === "success") icon = "✅";
    if (type === "error") icon = "⚠️";
    if (type === "warning") icon = "🔔";

    toast.innerHTML = `
      <span style="font-size: 1.25rem;">${icon}</span>
      <div>
        <div style="font-size: 0.85rem; font-weight: 500;">${message}</div>
      </div>
    `;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = "0";
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  function openModal(modal) {
    if (modal) modal.classList.add("active");
  }

  function closeModal(modal) {
    if (modal) modal.classList.remove("active");
  }

  // Handle all close modal triggers
  document.querySelectorAll("[data-close-modal]").forEach(btn => {
    btn.addEventListener("click", () => {
      const modalId = btn.getAttribute("data-close-modal");
      closeModal(document.getElementById(modalId));
    });
  });

  // Close modal when clicking outside box
  document.querySelectorAll(".modal-overlay").forEach(overlay => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        closeModal(overlay);
      }
    });
  });

  // ==========================================
  // AUTH UI & SESSION HANDLING
  // ==========================================
  function updateAuthUI() {
    const user = StorageService.getCurrentUser();
    if (user) {
      navUserGuest.style.display = "none";
      navUserLogged.style.display = "flex";
      navUserName.textContent = `Pelanggan: ${user.name}`;
      
      // Populate profile view
      profName.value = user.name || "";
      profEmail.value = user.email || "";
      profPhone.value = user.phone || "";
      profAddress.value = user.address || "";
    } else {
      navUserGuest.style.display = "flex";
      navUserLogged.style.display = "none";
    }
  }

  btnShowLogin.addEventListener("click", () => {
    loginEmailErr.classList.remove("visible");
    loginPassErr.classList.remove("visible");
    openModal(modalLogin);
  });

  btnShowRegister.addEventListener("click", () => {
    regEmailErr.classList.remove("visible");
    regPhoneErr.classList.remove("visible");
    regPassErr.classList.remove("visible");
    regConfirmErr.classList.remove("visible");
    openModal(modalRegister);
  });

  btnSwitchToRegister.addEventListener("click", () => {
    closeModal(modalLogin);
    openModal(modalRegister);
  });

  btnSwitchToLogin.addEventListener("click", () => {
    closeModal(modalRegister);
    openModal(modalLogin);
  });

  btnLogout.addEventListener("click", () => {
    StorageService.setCurrentUser(null);
    updateAuthUI();
    showToast("Anda telah keluar dari akun.", "info");
    switchTab("catalog");
  });

  btnResetDb.addEventListener("click", () => {
    if (confirm("Reset seluruh data ke kondisi bawaan (seed data awal)?")) {
      StorageService.resetToDefaults();
      appliedVoucher = null;
      updateAuthUI();
      renderCatalog();
      renderCartUI();
      renderOrders();
      showToast("Data berhasil direset ke pengaturan awal!", "success");
    }
  });

  // ==========================================
  // FEATURE 1: USER REGISTRATION
  // ==========================================
  formRegister.addEventListener("submit", (e) => {
    e.preventDefault();
    regEmailErr.classList.remove("visible");
    regPhoneErr.classList.remove("visible");
    regPassErr.classList.remove("visible");
    regConfirmErr.classList.remove("visible");

    const name = regName.value.trim();
    const email = regEmail.value.trim();
    const phone = regPhone.value.trim();
    const pass = regPassword.value;
    const confirm = regConfirm.value;

    // 1. Validasi Email
    const emailVal = ValidationLogic.validateEmail(email);
    if (!emailVal.valid) {
      regEmailErr.textContent = emailVal.message;
      regEmailErr.classList.add("visible");
      return;
    }

    // Cek duplikasi email
    const users = StorageService.getUsers();
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      regEmailErr.textContent = "Email sudah terdaftar. Silakan gunakan email lain atau login.";
      regEmailErr.classList.add("visible");
      return;
    }

    // 2. Validasi Nomor Telepon
    const phoneVal = ValidationLogic.validatePhone(phone);
    if (!phoneVal.valid) {
      regPhoneErr.textContent = phoneVal.message;
      regPhoneErr.classList.add("visible");
      return;
    }

    // 3. Validasi Password
    const passVal = ValidationLogic.validatePassword(pass);
    if (!passVal.valid) {
      regPassErr.textContent = passVal.message;
      regPassErr.classList.add("visible");
      return;
    }

    // 4. Validasi Konfirmasi Password
    if (pass !== confirm) {
      regConfirmErr.textContent = "Konfirmasi password tidak cocok dengan password di atas.";
      regConfirmErr.classList.add("visible");
      return;
    }

    // Simpan pengguna baru
    const newUser = {
      id: "usr-" + Date.now(),
      name,
      email,
      phone,
      password: pass,
      address: "",
      role: "Customer"
    };

    users.push(newUser);
    StorageService.saveUsers(users);
    StorageService.setCurrentUser(newUser);

    formRegister.reset();
    closeModal(modalRegister);
    updateAuthUI();
    showToast(`Registrasi berhasil! Selamat datang, ${name}.`, "success");
  });

  // ==========================================
  // FEATURE 2: USER LOGIN
  // ==========================================
  formLogin.addEventListener("submit", (e) => {
    e.preventDefault();
    loginEmailErr.classList.remove("visible");
    loginPassErr.classList.remove("visible");

    const email = loginEmail.value.trim();
    const password = loginPassword.value;

    const emailVal = ValidationLogic.validateEmail(email);
    if (!emailVal.valid) {
      loginEmailErr.textContent = emailVal.message;
      loginEmailErr.classList.add("visible");
      return;
    }

    const users = StorageService.getUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      loginEmailErr.textContent = "Akun dengan email ini tidak ditemukan.";
      loginEmailErr.classList.add("visible");
      return;
    }

    if (user.password !== password) {
      loginPassErr.textContent = "Password yang Anda masukkan salah.";
      loginPassErr.classList.add("visible");
      return;
    }

    StorageService.setCurrentUser(user);
    updateAuthUI();
    formLogin.reset();
    closeModal(modalLogin);
    showToast(`Berhasil masuk! Selamat berbelanja, ${user.name}.`, "success");
  });

  // ==========================================
  // FEATURE 3: FORGOT & RESET PASSWORD
  // ==========================================
  linkForgotPassword.addEventListener("click", (e) => {
    e.preventDefault();
    closeModal(modalLogin);
    forgotStep1.style.display = "block";
    forgotStep2.style.display = "none";
    forgotEmailErr.classList.remove("visible");
    formForgotRequest.reset();
    formForgotReset.reset();
    openModal(modalForgot);
  });

  formForgotRequest.addEventListener("submit", (e) => {
    e.preventDefault();
    forgotEmailErr.classList.remove("visible");
    const email = forgotEmail.value.trim();

    const emailVal = ValidationLogic.validateEmail(email);
    if (!emailVal.valid) {
      forgotEmailErr.textContent = emailVal.message;
      forgotEmailErr.classList.add("visible");
      return;
    }

    const users = StorageService.getUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      forgotEmailErr.textContent = "Email ini belum terdaftar di sistem QuickShop.";
      forgotEmailErr.classList.add("visible");
      return;
    }

    // Generate random 6-digit OTP code
    simulatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    resetTargetEmail = email;

    forgotStep1.style.display = "none";
    forgotStep2.style.display = "block";
    displayOtpCode.textContent = simulatedOtp;
    showToast("Kode OTP berhasil digenerate!", "info");
  });

  formForgotReset.addEventListener("submit", (e) => {
    e.preventDefault();
    resetPassErr.classList.remove("visible");
    resetConfirmErr.classList.remove("visible");

    const enteredOtp = resetOtpInput.value.trim();
    const newPass = resetNewPassword.value;
    const confirmPass = resetConfirmPassword.value;

    if (enteredOtp !== simulatedOtp) {
      showToast("Kode OTP salah atau tidak cocok.", "error");
      return;
    }

    const passVal = ValidationLogic.validatePassword(newPass);
    if (!passVal.valid) {
      resetPassErr.textContent = passVal.message;
      resetPassErr.classList.add("visible");
      return;
    }

    if (newPass !== confirmPass) {
      resetConfirmErr.textContent = "Konfirmasi password baru tidak cocok.";
      resetConfirmErr.classList.add("visible");
      return;
    }

    // Simpan password baru
    const users = StorageService.getUsers();
    const userIdx = users.findIndex(u => u.email.toLowerCase() === resetTargetEmail.toLowerCase());
    if (userIdx > -1) {
      users[userIdx].password = newPass;
      StorageService.saveUsers(users);

      // Jika user sedang aktif adalah target, perbarui session
      const current = StorageService.getCurrentUser();
      if (current && current.email.toLowerCase() === resetTargetEmail.toLowerCase()) {
        current.password = newPass;
        StorageService.setCurrentUser(current);
      }
    }

    closeModal(modalForgot);
    showToast("Password berhasil diperbarui! Silakan masuk dengan password baru.", "success");
    openModal(modalLogin);
  });

  // ==========================================
  // TABS NAVIGATION (Catalog, Orders, Profile)
  // ==========================================
  function switchTab(targetTab) {
    activeTab = targetTab;
    tabItems.forEach(tab => {
      if (tab.getAttribute("data-tab") === targetTab) {
        tab.classList.add("active");
      } else {
        tab.classList.remove("active");
      }
    });

    viewCatalog.style.display = targetTab === "catalog" ? "block" : "none";
    viewOrders.style.display = targetTab === "orders" ? "block" : "none";
    viewProfile.style.display = targetTab === "profile" ? "block" : "none";

    if (targetTab === "orders") {
      renderOrders();
    }
  }

  tabItems.forEach(tab => {
    tab.addEventListener("click", () => {
      const tabName = tab.getAttribute("data-tab");
      if (tabName === "profile") {
        const user = StorageService.getCurrentUser();
        if (!user) {
          showToast("Silakan masuk terlebih dahulu untuk melihat profil.", "warning");
          openModal(modalLogin);
          return;
        }
      }
      switchTab(tabName);
    });
  });

  // ==========================================
  // FEATURE 4: PRODUCT CATALOG (Search, Filter, BVA)
  // ==========================================
  function renderCatalog() {
    const products = StorageService.getProducts();
    const query = searchInput.value.toLowerCase().trim();
    const category = filterCategory.value;
    const sort = filterSort.value;

    let filtered = products.filter(p => {
      const matchQuery = p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query);
      const matchCat = category === "ALL" || p.category === category;
      return matchQuery && matchCat;
    });

    if (sort === "price-asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sort === "rating-desc") {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    productsContainer.innerHTML = "";

    if (filtered.length === 0) {
      productsContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
          <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🔍</div>
          <h4>Produk tidak ditemukan</h4>
          <p style="font-size: 0.85rem;">Coba gunakan kata kunci pencarian atau filter kategori yang berbeda.</p>
        </div>
      `;
      return;
    }

    filtered.forEach(p => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.setAttribute("data-cy", `product-card-${p.id}`);

      card.innerHTML = `
        <img src="${p.image}" alt="${p.name}" class="product-image" loading="lazy">
        <div class="product-body">
          <div class="product-category">${p.category}</div>
          <h3 class="product-title">${p.name}</h3>
          <p class="product-description">${p.description}</p>
          <div class="product-meta">
            <div>
              <span style="color: #f59e0b; font-weight: 700;">★ ${p.rating}</span>
              <span style="color: var(--text-muted); font-size: 0.75rem;">(${p.reviewsCount} ulasan)</span>
            </div>
            <div class="product-stock" data-cy="product-stock-${p.id}">Stok: <strong>${p.stock}</strong></div>
          </div>
          <div class="product-price" data-cy="product-price-${p.id}">Rp ${p.price.toLocaleString("id-ID")}</div>

          <div style="margin-top: 1rem; display: flex; gap: 0.5rem; align-items: center;">
            <div class="qty-control">
              <button class="qty-btn btn-dec" data-id="${p.id}" data-cy="catalog-dec-btn-${p.id}">-</button>
              <input type="text" class="qty-input" id="catalog-qty-${p.id}" data-cy="catalog-qty-input-${p.id}" value="1">
              <button class="qty-btn btn-inc" data-id="${p.id}" data-cy="catalog-inc-btn-${p.id}">+</button>
            </div>
            <button class="btn btn-primary btn-sm btn-add-cart" style="flex:1;" data-id="${p.id}" data-cy="add-to-cart-btn-${p.id}">
              + Keranjang
            </button>
          </div>
        </div>
      `;
      productsContainer.appendChild(card);
    });

    // Attach Event Listeners to Catalog Buttons
    document.querySelectorAll(".btn-dec").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        const input = document.getElementById(`catalog-qty-${id}`);
        let val = parseInt(input.value, 10) || 1;
        if (val > 1) input.value = val - 1;
      });
    });

    document.querySelectorAll(".btn-inc").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        const p = products.find(prod => prod.id == id);
        const input = document.getElementById(`catalog-qty-${id}`);
        let val = parseInt(input.value, 10) || 1;
        if (val < 99 && val < (p ? p.stock : 99)) {
          input.value = val + 1;
        } else {
          showToast("Batas maksimal kuantitas tercapai.", "warning");
        }
      });
    });

    document.querySelectorAll(".btn-add-cart").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = parseInt(btn.getAttribute("data-id"), 10);
        const p = products.find(prod => prod.id === id);
        const input = document.getElementById(`catalog-qty-${id}`);
        const qtyVal = input ? input.value : 1;

        const cart = StorageService.getCart();
        const result = CartLogic.addItem(cart, p, qtyVal);

        if (!result.success) {
          showToast(result.message, "error");
        } else {
          StorageService.saveCart(result.cart);
          renderCartUI();
          showToast(result.message, "success");
        }
      });
    });
  }

  searchInput.addEventListener("input", renderCatalog);
  filterCategory.addEventListener("change", renderCatalog);
  filterSort.addEventListener("change", renderCatalog);

  // ==========================================
  // FEATURE 5: SHOPPING CART MANAGEMENT (CRUD & BVA)
  // ==========================================
  function renderCartUI() {
    const cart = StorageService.getCart();
    const totals = CartLogic.calculateTotals(cart);

    cartCounter.textContent = totals.totalItems;
    cartSubtotalDisplay.textContent = `Rp ${totals.subtotal.toLocaleString("id-ID")}`;

    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `
        <div style="text-align: center; padding: 2rem 0; color: var(--text-muted);">
          <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🛒</div>
          <h4>Keranjang Belanja Masih Kosong</h4>
          <p style="font-size: 0.85rem;">Yuk pilih produk impian Anda dari katalog!</p>
        </div>
      `;
      btnOpenCheckout.disabled = true;
      return;
    }

    btnOpenCheckout.disabled = false;

    cart.forEach(item => {
      const itemRow = document.createElement("div");
      itemRow.setAttribute("data-cy", `cart-item-row-${item.id}`);
      itemRow.style.cssText = "display: flex; align-items: center; justify-content: space-between; padding: 0.75rem 0; border-bottom: 1px solid var(--border);";

      itemRow.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.75rem; flex: 1;">
          <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: var(--radius);">
          <div>
            <div style="font-weight: 600; font-size: 0.9rem;" data-cy="cart-item-name-${item.id}">${item.name}</div>
            <div style="font-size: 0.8rem; color: #047857; font-weight: 700;">Rp ${item.price.toLocaleString("id-ID")}</div>
          </div>
        </div>

        <div style="display: flex; align-items: center; gap: 1rem;">
          <div class="qty-control">
            <button class="qty-btn cart-dec" data-id="${item.id}" data-cy="cart-dec-btn-${item.id}">-</button>
            <input type="text" class="qty-input cart-qty-input" data-id="${item.id}" data-cy="cart-qty-input-${item.id}" value="${item.qty}">
            <button class="qty-btn cart-inc" data-id="${item.id}" data-cy="cart-inc-btn-${item.id}">+</button>
          </div>
          <div style="font-weight: 700; font-size: 0.9rem; min-width: 90px; text-align: right;" data-cy="cart-item-subtotal-${item.id}">
            Rp ${(item.qty * item.price).toLocaleString("id-ID")}
          </div>
          <button class="btn btn-outline btn-sm cart-remove" data-id="${item.id}" data-cy="cart-remove-btn-${item.id}" style="color: var(--danger); border-color: var(--danger);">
            ✕
          </button>
        </div>
      `;
      cartItemsContainer.appendChild(itemRow);
    });

    // Cart actions handlers
    document.querySelectorAll(".cart-dec").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = parseInt(btn.getAttribute("data-id"), 10);
        const item = cart.find(i => i.id === id);
        if (item && item.qty > 1) {
          const res = CartLogic.updateQuantity(cart, id, item.qty - 1);
          if (res.success) {
            StorageService.saveCart(res.cart);
            renderCartUI();
          }
        } else {
          showToast("Kuantitas minimal adalah 1. Klik tanda silang (✕) jika ingin menghapus.", "warning");
        }
      });
    });

    document.querySelectorAll(".cart-inc").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = parseInt(btn.getAttribute("data-id"), 10);
        const item = cart.find(i => i.id === id);
        if (item) {
          const res = CartLogic.updateQuantity(cart, id, item.qty + 1);
          if (res.success) {
            StorageService.saveCart(res.cart);
            renderCartUI();
          } else {
            showToast(res.message, "warning");
          }
        }
      });
    });

    document.querySelectorAll(".cart-qty-input").forEach(input => {
      input.addEventListener("change", () => {
        const id = parseInt(input.getAttribute("data-id"), 10);
        const val = input.value;
        const res = CartLogic.updateQuantity(cart, id, val);
        if (res.success) {
          StorageService.saveCart(res.cart);
          renderCartUI();
          showToast(res.message, "success");
        } else {
          showToast(res.message, "error");
          renderCartUI(); // Reset to valid value
        }
      });
    });

    document.querySelectorAll(".cart-remove").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = parseInt(btn.getAttribute("data-id"), 10);
        const res = CartLogic.removeItem(cart, id);
        StorageService.saveCart(res.cart);
        renderCartUI();
        showToast(res.message, "info");
      });
    });
  }

  btnOpenCart.addEventListener("click", () => {
    renderCartUI();
    openModal(modalCart);
  });

  btnClearCart.addEventListener("click", () => {
    const cart = StorageService.getCart();
    if (cart.length === 0) return;
    if (confirm("Kosongkan semua barang di keranjang?")) {
      StorageService.saveCart([]);
      renderCartUI();
      showToast("Keranjang belanja dikosongkan.", "info");
    }
  });

  // ==========================================
  // FEATURE 6: CHECKOUT & VOUCHER DISCOUNT LOGIC (Decision Table, Multi-Condition)
  // ==========================================
  btnOpenCheckout.addEventListener("click", () => {
    const user = StorageService.getCurrentUser();
    if (!user) {
      showToast("Silakan masuk terlebih dahulu sebelum melakukan checkout.", "warning");
      closeModal(modalCart);
      openModal(modalLogin);
      return;
    }

    const cart = StorageService.getCart();
    if (cart.length === 0) {
      showToast("Keranjang belanja Anda masih kosong.", "warning");
      return;
    }

    // Prefill user data
    coName.value = user.name;
    coAddress.value = user.address || "Jl. Raya Tlogomas No. 246, Malang";
    appliedVoucher = null;
    coVoucherInput.value = "";
    coVoucherMsg.textContent = "";

    closeModal(modalCart);
    updateCheckoutCalculation();
    openModal(modalCheckout);
  });

  function updateCheckoutCalculation() {
    const cart = StorageService.getCart();
    const totals = CartLogic.calculateTotals(cart);
    const shipping = DiscountLogic.calculateShippingCost(coCity.value, coCourier.value);

    let discountAmount = 0;
    let shippingDiscount = 0;

    if (appliedVoucher) {
      discountAmount = appliedVoucher.discountAmount || 0;
      shippingDiscount = appliedVoucher.shippingDiscount || 0;
    }

    const finalTotal = DiscountLogic.calculateFinalTotal(
      totals.subtotal,
      discountAmount,
      shipping.cost,
      shippingDiscount
    );

    coSubtotal.textContent = `Rp ${totals.subtotal.toLocaleString("id-ID")}`;
    coShippingCost.textContent = `Rp ${shipping.cost.toLocaleString("id-ID")} (${shipping.estimatedDays})`;
    coDiscountAmount.textContent = `- Rp ${discountAmount.toLocaleString("id-ID")}`;
    coShippingDiscount.textContent = `- Rp ${shippingDiscount.toLocaleString("id-ID")}`;
    coTotalPayment.textContent = `Rp ${finalTotal.toLocaleString("id-ID")}`;
  }

  coCity.addEventListener("change", updateCheckoutCalculation);
  coCourier.addEventListener("change", updateCheckoutCalculation);

  btnApplyVoucher.addEventListener("click", () => {
    const code = coVoucherInput.value.trim();
    const cart = StorageService.getCart();
    const totals = CartLogic.calculateTotals(cart);
    const shipping = DiscountLogic.calculateShippingCost(coCity.value, coCourier.value);
    const vouchers = StorageService.getVouchers();

    const result = DiscountLogic.applyVoucher(totals.subtotal, code, vouchers, shipping.cost);

    if (!result.valid) {
      appliedVoucher = null;
      coVoucherMsg.textContent = `❌ ${result.message}`;
      coVoucherMsg.style.color = "var(--danger)";
      showToast(result.message, "error");
    } else {
      appliedVoucher = {
        code: code.toUpperCase(),
        discountAmount: result.discountAmount,
        shippingDiscount: result.shippingDiscount
      };
      coVoucherMsg.textContent = `✅ ${result.message}`;
      coVoucherMsg.style.color = "var(--success)";
      showToast(result.message, "success");
    }
    updateCheckoutCalculation();
  });

  btnSubmitOrder.addEventListener("click", () => {
    const name = coName.value.trim();
    const address = coAddress.value.trim();
    if (!name || !address) {
      showToast("Harap lengkapi nama penerima dan alamat pengiriman.", "error");
      return;
    }

    const user = StorageService.getCurrentUser();
    const cart = StorageService.getCart();
    const totals = CartLogic.calculateTotals(cart);
    const shipping = DiscountLogic.calculateShippingCost(coCity.value, coCourier.value);

    let discountAmount = appliedVoucher ? appliedVoucher.discountAmount : 0;
    let shippingDiscount = appliedVoucher ? appliedVoucher.shippingDiscount : 0;
    const finalTotal = DiscountLogic.calculateFinalTotal(totals.subtotal, discountAmount, shipping.cost, shippingDiscount);

    // Buat objek order baru
    const orderId = "QS-" + new Date().toISOString().slice(0, 10).replace(/-/g, "") + "-" + Math.floor(100 + Math.random() * 900);
    const now = new Date();
    const dateFormatted = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newOrder = {
      orderId,
      date: dateFormatted,
      userId: user ? user.id : "usr-guest",
      customerName: name,
      items: cart,
      subtotal: totals.subtotal,
      discount: discountAmount + shippingDiscount,
      shippingCost: shipping.cost,
      totalPayment: finalTotal,
      shippingAddress: `${address}, ${coCity.value}`,
      paymentMethod: coPaymentMethod.value,
      status: OrderStateLogic.STATUSES.PENDING,
      canCancel: true
    };

    const orders = StorageService.getOrders();
    orders.unshift(newOrder);
    StorageService.saveOrders(orders);

    // Kurangi stok produk
    const products = StorageService.getProducts();
    cart.forEach(cartItem => {
      const p = products.find(prod => prod.id === cartItem.id);
      if (p) {
        p.stock = Math.max(0, p.stock - cartItem.qty);
      }
    });
    StorageService.saveProducts(products);

    // Kosongkan keranjang & tutup modal
    StorageService.saveCart([]);
    renderCartUI();
    renderCatalog();
    closeModal(modalCheckout);

    showToast(`Pesanan #${orderId} berhasil dibuat! Menunggu pembayaran.`, "success");
    switchTab("orders");
  });

  // ==========================================
  // FEATURE 7: ORDER STATUS TRACKING & STATE TRANSITIONS
  // ==========================================
  function renderOrders() {
    const orders = StorageService.getOrders();
    const user = StorageService.getCurrentUser();
    const filteredOrders = user ? orders.filter(o => o.userId === user.id) : orders;

    ordersTbody.innerHTML = "";
    ordersBadge.style.display = filteredOrders.length > 0 ? "inline-block" : "none";
    ordersBadge.textContent = filteredOrders.length;

    if (filteredOrders.length === 0) {
      ordersTbody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align: center; padding: 2rem; color: var(--text-muted);">
            Belum ada riwayat pesanan untuk akun ini. Buat pesanan dari katalog produk!
          </td>
        </tr>
      `;
      return;
    }

    filteredOrders.forEach(o => {
      const badgeInfo = OrderStateLogic.getStatusBadgeInfo(o.status);
      const row = document.createElement("tr");
      row.setAttribute("data-cy", `order-row-${o.orderId}`);

      // Daftar ringkasan barang
      const itemsHtml = o.items.map(i => `${i.name} (x${i.qty})`).join("<br>");

      // Tombol aksi dinamis berdasarkan State Machine
      let actionButtons = "";
      if (o.status === OrderStateLogic.STATUSES.PENDING) {
        actionButtons = `
          <div style="display: flex; gap: 0.35rem; flex-wrap: wrap;">
            <button class="btn btn-sm btn-primary btn-pay-order" data-id="${o.orderId}" data-cy="btn-pay-${o.orderId}">
              💳 Bayar Sekarang
            </button>
            <button class="btn btn-sm btn-outline btn-cancel-order" data-id="${o.orderId}" data-cy="btn-cancel-${o.orderId}" style="color: var(--danger); border-color: var(--danger);">
              ✕ Batalkan
            </button>
          </div>
        `;
      } else if (o.status === OrderStateLogic.STATUSES.PROCESSING) {
        actionButtons = `
          <button class="btn btn-sm btn-outline btn-track-order" data-id="${o.orderId}" data-cy="btn-track-${o.orderId}">
            📍 Lacak Pesanan
          </button>
        `;
      } else if (o.status === OrderStateLogic.STATUSES.SHIPPED) {
        actionButtons = `
          <div style="display: flex; gap: 0.35rem; flex-wrap: wrap;">
            <button class="btn btn-sm btn-outline btn-track-order" data-id="${o.orderId}" data-cy="btn-track-${o.orderId}">
              📍 Lacak Pesanan
            </button>
            <button class="btn btn-sm btn-primary btn-confirm-receipt" data-id="${o.orderId}" data-cy="btn-confirm-${o.orderId}">
              📦 Konfirmasi Pesanan Diterima
            </button>
          </div>
        `;
      } else if (o.status === OrderStateLogic.STATUSES.COMPLETED) {
        actionButtons = `
          <button class="btn btn-sm btn-outline btn-review-order" data-id="${o.orderId}" data-cy="btn-review-${o.orderId}">
            ⭐ Beri Ulasan
          </button>
        `;
      } else if (o.status === OrderStateLogic.STATUSES.CANCELLED) {
        actionButtons = `<span style="color: var(--text-muted); font-size: 0.8rem;">Pesanan Dibatalkan</span>`;
      }

      row.innerHTML = `
        <td style="font-weight: 700;" data-cy="order-id-${o.orderId}">${o.orderId}</td>
        <td style="font-size: 0.8rem; color: var(--text-muted);">${o.date}</td>
        <td style="font-size: 0.825rem;">${itemsHtml}</td>
        <td style="font-weight: 700; color: #047857;" data-cy="order-total-${o.orderId}">Rp ${o.totalPayment.toLocaleString("id-ID")}</td>
        <td>
          <span class="badge ${badgeInfo.bg}" data-cy="order-status-badge-${o.orderId}">
            ${o.status}
          </span>
        </td>
        <td>${actionButtons}</td>
      `;
      ordersTbody.appendChild(row);
    });

    // Event listener: Bayar Sekarang (Pending -> Processing)
    document.querySelectorAll(".btn-pay-order").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        changeOrderStatus(id, OrderStateLogic.STATUSES.PROCESSING, "Pembayaran berhasil diverifikasi!");
      });
    });

    // Event listener: Batalkan Pesanan (Pending -> Cancelled)
    document.querySelectorAll(".btn-cancel-order").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        if (confirm(`Yakin ingin membatalkan pesanan #${id}?`)) {
          changeOrderStatus(id, OrderStateLogic.STATUSES.CANCELLED, "Pesanan telah dibatalkan.");
        }
      });
    });

    // Event listener: Lacak Pesanan (Processing -> Shipped / Info Tracking)
    document.querySelectorAll(".btn-track-order").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        const orders = StorageService.getOrders();
        const o = orders.find(order => order.orderId === id);
        if (o && o.status === OrderStateLogic.STATUSES.PROCESSING) {
          changeOrderStatus(id, OrderStateLogic.STATUSES.SHIPPED, `No. Resi: JNE-${id.slice(-6)} | Penjual telah menyerahkan paket ke kurir dan pesanan dalam pengiriman.`);
        } else {
          showToast(`No. Resi: JNE-${id.slice(-6)} | Kurir sedang dalam perjalanan menuju alamat tujuan.`, "info");
        }
      });
    });

    // Event listener: Konfirmasi Terima (Shipped -> Completed)
    document.querySelectorAll(".btn-confirm-receipt").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        changeOrderStatus(id, OrderStateLogic.STATUSES.COMPLETED, "Terima kasih! Pesanan telah selesai.");
      });
    });

    // Event listener: Buka Modal Ulasan
    document.querySelectorAll(".btn-review-order").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        const orders = StorageService.getOrders();
        const o = orders.find(order => order.orderId === id);
        if (o && o.items.length > 0) {
          const firstProduct = o.items[0];
          revProductId.value = firstProduct.id;
          revOrderId.value = o.orderId;
          revProductName.value = firstProduct.name;
          revRating.value = "5";
          revComment.value = "";
          revCommentErr.classList.remove("visible");
          openModal(modalReview);
        }
      });
    });
  }

  function changeOrderStatus(orderId, nextStatus, successMsg) {
    const orders = StorageService.getOrders();
    const order = orders.find(o => o.orderId === orderId);
    if (!order) return;

    const validation = OrderStateLogic.validateTransition(order.status, nextStatus);
    if (!validation.valid) {
      showToast(validation.message, "error");
      return;
    }

    order.status = nextStatus;
    order.canCancel = OrderStateLogic.canCancelOrder(nextStatus);
    StorageService.saveOrders(orders);
    renderOrders();
    showToast(successMsg, "success");
  }

  // ==========================================
  // FEATURE 8: CUSTOMER PROFILE & PRODUCT REVIEW
  // ==========================================
  formUpdateProfile.addEventListener("submit", (e) => {
    e.preventDefault();
    profPhoneErr.classList.remove("visible");

    const user = StorageService.getCurrentUser();
    if (!user) return;

    const phone = profPhone.value.trim();
    const phoneVal = ValidationLogic.validatePhone(phone);
    if (!phoneVal.valid) {
      profPhoneErr.textContent = phoneVal.message;
      profPhoneErr.classList.add("visible");
      return;
    }

    user.name = profName.value.trim();
    user.phone = phone;
    user.address = profAddress.value.trim();

    StorageService.setCurrentUser(user);

    // Update in users collection
    const users = StorageService.getUsers();
    const idx = users.findIndex(u => u.id === user.id);
    if (idx > -1) {
      users[idx] = user;
      StorageService.saveUsers(users);
    }

    updateAuthUI();
    showToast("Profil pelanggan berhasil diperbarui!", "success");
  });

  formChangePassword.addEventListener("submit", (e) => {
    e.preventDefault();
    cpNewErr.classList.remove("visible");

    const user = StorageService.getCurrentUser();
    if (!user) return;

    if (cpCurrent.value !== user.password) {
      showToast("Password saat ini salah.", "error");
      return;
    }

    const passVal = ValidationLogic.validatePassword(cpNew.value);
    if (!passVal.valid) {
      cpNewErr.textContent = passVal.message;
      cpNewErr.classList.add("visible");
      return;
    }

    user.password = cpNew.value;
    StorageService.setCurrentUser(user);

    const users = StorageService.getUsers();
    const idx = users.findIndex(u => u.id === user.id);
    if (idx > -1) {
      users[idx].password = cpNew.value;
      StorageService.saveUsers(users);
    }

    formChangePassword.reset();
    showToast("Password berhasil diganti!", "success");
  });

  formReview.addEventListener("submit", (e) => {
    e.preventDefault();
    revCommentErr.classList.remove("visible");

    const ratingVal = revRating.value;
    const commentVal = revComment.value.trim();

    const rCheck = ValidationLogic.validateRating(ratingVal);
    if (!rCheck.valid) {
      showToast(rCheck.message, "error");
      return;
    }

    const cCheck = ValidationLogic.validateComment(commentVal);
    if (!cCheck.valid) {
      revCommentErr.textContent = cCheck.message;
      revCommentErr.classList.add("visible");
      return;
    }

    const user = StorageService.getCurrentUser();
    const newReview = {
      id: "rev-" + Date.now(),
      orderId: revOrderId.value,
      productId: parseInt(revProductId.value, 10),
      userName: user ? user.name : "Pelanggan",
      rating: parseInt(ratingVal, 10),
      comment: commentVal,
      date: new Date().toLocaleDateString("id-ID")
    };

    const reviews = StorageService.getReviews();
    reviews.push(newReview);
    StorageService.saveReviews(reviews);

    closeModal(modalReview);
    formReview.reset();
    showToast("Ulasan dan rating bintang Anda berhasil dikirim!", "success");
  });

  // Initial App Load
  updateAuthUI();
  renderCatalog();
  renderCartUI();
  renderOrders();
});
