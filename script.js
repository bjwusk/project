/* ============================================
   茸茸食事所 · 交互逻辑
   ============================================ */

/* ---------- 商品数据 ---------- */
const PRODUCTS = [
  { id: 1, name: "鸡胸肉干", category: "chicken", categoryLabel: "🐔 鸡肉", price: 39.9, spec: "100g / 包", desc: "精选去脂鸡胸肉，低温慢烘12小时，保留原生肉香", benefits: "高蛋白低脂肪，适合日常奖励", ingredients: "100% 鸡胸肉", suitable: "犬 / 猫通用", image: "assets/product-chicken.svg", sales: 1860 },
  { id: 2, name: "冻干三文鱼", category: "freezedry", categoryLabel: "❄️ 冻干", price: 59.9, spec: "50g / 罐", desc: "挪威三文鱼急速冻干，-35°C 锁住Omega-3", benefits: "美毛护肤，富含不饱和脂肪酸", ingredients: "100% 三文鱼", suitable: "犬 / 猫通用", image: "assets/product-freezedry.svg", sales: 1520 },
  { id: 3, name: "洁齿磨牙棒", category: "dental", categoryLabel: "🦷 洁齿", price: 45.0, spec: "12根 / 盒", desc: "螺旋纹设计帮助摩擦牙垢，添加薄荷清新口气", benefits: "洁齿护龈，缓解换牙不适", ingredients: "红薯淀粉、鸡肉粉、薄荷提取物", suitable: "犬用（3月龄以上）", image: "assets/product-dental.svg", sales: 2100 },
  { id: 4, name: "训练奖励粒", category: "training", categoryLabel: "🎯 训练奖励", price: 29.9, spec: "80g / 袋", desc: "迷你颗粒一口一粒，低卡路里适合高频奖励", benefits: "低脂低卡，训练好伴侣", ingredients: "鸡胸肉、南瓜、蓝莓", suitable: "犬 / 猫通用", image: "assets/product-training.svg", sales: 2380 },
  { id: 5, name: "鸭肉绕薯条", category: "chicken", categoryLabel: "🐔 鸡肉", price: 49.9, spec: "100g / 包", desc: "鸭肉包裹红薯条，双重口感层层美味", benefits: "鸭肉性凉，适合易上火宠物", ingredients: "鸭胸肉、红薯、迷迭香", suitable: "犬用", image: "assets/product-duck.svg", sales: 1740 },
  { id: 6, name: "牛肉粒", category: "beef", categoryLabel: "🥩 牛肉", price: 42.0, spec: "120g / 罐", desc: "澳洲草饲牛肉，切成适口小粒，浓郁肉香", benefits: "补铁补血，强壮体格", ingredients: "100% 牛肉", suitable: "犬用", image: "assets/product-beef.svg", sales: 980 },
  { id: 7, name: "风干牛肋骨", category: "beef", categoryLabel: "🥩 牛肉", price: 55.0, spec: "3根 / 包", desc: "整根牛肋骨低温风干，耐啃磨牙天然洁齿", benefits: "高钙耐啃，释放咀嚼天性", ingredients: "100% 牛肋骨", suitable: "犬用（中型犬以上）", image: "assets/product-rib.svg", sales: 1250 },
  { id: 8, name: "冻干鸡肝", category: "freezedry", categoryLabel: "❄️ 冻干", price: 35.0, spec: "40g / 罐", desc: "新鲜鸡肝冻干处理，天然维生素A来源", benefits: "补肝明目，挑食克星", ingredients: "100% 鸡肝", suitable: "犬 / 猫通用", image: "assets/product-chicken.svg", sales: 2030 }
];

/* ---------- 用户状态 ---------- */
// userState: null (未进入), "guest" (游客), "logged" (已登录)
let userState = null;
let currentUser = null;
let userAddresses = [];

/* ---------- 购物车 ---------- */
let cart = [];

/* ---------- 工具 ---------- */
function toast(msg) {
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(el._timer);
  el._timer = setTimeout(() => el.classList.remove("show"), 2500);
}

/* ---------- DOM 引用 ---------- */
const productGrid = document.getElementById("productGrid");
const hotSellersGrid = document.getElementById("hotSellersGrid");
const filterBar = document.getElementById("filterBar");
const cartToggle = document.getElementById("cartToggle");
const cartSidebar = document.getElementById("cartSidebar");
const cartOverlay = document.getElementById("cartOverlay");
const cartClose = document.getElementById("cartClose");
const cartItems = document.getElementById("cartItems");
const cartFooter = document.getElementById("cartFooter");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");
const heroCartCount = document.getElementById("heroCartCount");
const checkoutBtn = document.getElementById("checkoutBtn");
const productModal = document.getElementById("productModal");
const modalClose = document.getElementById("modalClose");
const modalBody = document.getElementById("modalBody");
const successModal = document.getElementById("successModal");
const successClose = document.getElementById("successClose");
const successAddress = document.getElementById("successAddress");

// Entry
const entryOverlay = document.getElementById("entryOverlay");
const entryLoginBtn = document.getElementById("entryLoginBtn");
const entryGuestBtn = document.getElementById("entryGuestBtn");

// Login
const loginOverlay = document.getElementById("loginOverlay");
const loginClose = document.getElementById("loginClose");
const loginSubmit = document.getElementById("loginSubmit");
const loginGuestBtn = document.getElementById("loginGuestBtn");
const loginUsername = document.getElementById("loginUsername");
const loginPassword = document.getElementById("loginPassword");
const loginError = document.getElementById("loginError");

// User
const userArea = document.getElementById("userArea");
const userBtn = document.getElementById("userBtn");
const userName = document.getElementById("userName");
const userAvatar = document.getElementById("userAvatar");
const userDropdown = document.getElementById("userDropdown");
const dropdownAccount = document.getElementById("dropdownAccount");
const dropdownAddress = document.getElementById("dropdownAddress");
const dropdownLogout = document.getElementById("dropdownLogout");

// Address
const addressOverlay = document.getElementById("addressOverlay");
const addressClose = document.getElementById("addressClose");
const addressList = document.getElementById("addressList");
const addressAddBtn = document.getElementById("addressAddBtn");
const addressForm = document.getElementById("addressForm");
const addressFormTitle = document.getElementById("addressFormTitle");
const addrName = document.getElementById("addrName");
const addrPhone = document.getElementById("addrPhone");
const addrDetail = document.getElementById("addrDetail");
const addrSaveBtn = document.getElementById("addrSaveBtn");
const addrCancelBtn = document.getElementById("addrCancelBtn");
const addrError = document.getElementById("addrError");

/* ---------- 入口：登录/游客选择 ---------- */
entryLoginBtn.addEventListener("click", () => {
  entryOverlay.classList.add("hidden");
  openLoginModal();
});

entryGuestBtn.addEventListener("click", () => {
  enterAsGuest();
});

function enterAsGuest() {
  userState = "guest";
  entryOverlay.classList.add("hidden");
  updateUserUI();
  mainInit();
}

/* ---------- 登录弹窗 ---------- */
function openLoginModal() {
  loginUsername.value = "";
  loginPassword.value = "";
  loginError.textContent = "";
  loginOverlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeLoginModal() {
  loginOverlay.classList.remove("open");
  document.body.style.overflow = "";
}

loginClose.addEventListener("click", () => {
  closeLoginModal();
  // If user never entered, re-show entry overlay
  if (userState === null) {
    entryOverlay.classList.remove("hidden");
  }
});

loginOverlay.addEventListener("click", (e) => {
  if (e.target === loginOverlay) {
    closeLoginModal();
    if (userState === null) {
      entryOverlay.classList.remove("hidden");
    }
  }
});

loginSubmit.addEventListener("click", () => {
  const username = loginUsername.value.trim();
  const password = loginPassword.value.trim();
  if (!username || !password) {
    loginError.textContent = "请填写用户名和密码";
    return;
  }
  // Simple mock login - any username/password works
  userState = "logged";
  currentUser = username;
  closeLoginModal();
  updateUserUI();
  toast(`欢迎回来，${username}！`);
  
  // If user has no addresses yet, prompt
  if (userAddresses.length === 0) {
    setTimeout(() => {
      toast("请先添加收货地址");
      openAddressModal();
    }, 500);
  }
  
  mainInit();
});

loginGuestBtn.addEventListener("click", () => {
  closeLoginModal();
  if (userState === null) {
    enterAsGuest();
    toast("您正在以游客身份浏览");
  }
});

/* ---------- 用户 UI ---------- */
function updateUserUI() {
  if (userState === "logged") {
    userName.textContent = currentUser;
    userAvatar.textContent = currentUser.charAt(0);
    userArea.style.display = "block";
  } else if (userState === "guest") {
    userName.textContent = "游客";
    userAvatar.textContent = "👤";
    userArea.style.display = "block";
  }
}

// 用户下拉菜单
userBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  userDropdown.classList.toggle("open");
});

document.addEventListener("click", (e) => {
  if (!userArea.contains(e.target)) {
    userDropdown.classList.remove("open");
  }
});

dropdownAccount.addEventListener("click", () => {
  userDropdown.classList.remove("open");
  if (userState === "guest") {
    toast("请先登录");
    openLoginModal();
    return;
  }
  openAddressModal();
});

dropdownAddress.addEventListener("click", () => {
  userDropdown.classList.remove("open");
  if (userState === "guest") {
    toast("请先登录");
    openLoginModal();
    return;
  }
  openAddressModal();
});

dropdownLogout.addEventListener("click", () => {
  userDropdown.classList.remove("open");
  userState = null;
  currentUser = null;
  userAddresses = [];
  cart = [];
  userArea.style.display = "none";
  entryOverlay.classList.remove("hidden");
  updateCartUI();
  toast("已退出登录");
});

/* ---------- 地址管理 ---------- */
function openAddressModal() {
  renderAddressList();
  addressOverlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeAddressModal() {
  addressOverlay.classList.remove("open");
  document.body.style.overflow = "";
  addressForm.style.display = "none";
  addrError.textContent = "";
}

addressClose.addEventListener("click", closeAddressModal);
addressOverlay.addEventListener("click", (e) => {
  if (e.target === addressOverlay) closeAddressModal();
});

function renderAddressList() {
  if (userAddresses.length === 0) {
    addressList.innerHTML = '<div style="text-align:center;color:var(--color-text-muted);padding:20px 0;font-size:0.85rem;">还没有收货地址<br>请添加一个地址以便下单</div>';
    return;
  }
  addressList.innerHTML = userAddresses.map((addr, i) => `
    <div class="address-item ${addr.isDefault ? "default" : ""}">
      <div class="address-item-info">
        <div class="address-item-name">${addr.name} <span>${addr.phone}</span></div>
        <div class="address-item-detail">${addr.detail}</div>
        ${addr.isDefault ? '<span class="address-item-tag">默认地址</span>' : ""}
      </div>
      <div class="address-item-actions">
        ${!addr.isDefault ? `<button class="addr-default" data-idx="${i}">设为默认</button>` : ""}
        <button class="addr-edit" data-idx="${i}">编辑</button>
        <button class="addr-del" data-idx="${i}">删除</button>
      </div>
    </div>
  `).join("");

  // Bind actions
  addressList.querySelectorAll(".addr-del").forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = parseInt(btn.dataset.idx);
      if (confirm("确认删除此地址？")) {
        userAddresses.splice(idx, 1);
        if (userAddresses.some(a => a.isDefault)) {}
        else if (userAddresses.length > 0) userAddresses[0].isDefault = true;
        renderAddressList();
      }
    });
  });
  addressList.querySelectorAll(".addr-edit").forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = parseInt(btn.dataset.idx);
      showAddressForm(userAddresses[idx], idx);
    });
  });
  addressList.querySelectorAll(".addr-default").forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = parseInt(btn.dataset.idx);
      userAddresses.forEach((a, i) => a.isDefault = (i === idx));
      renderAddressList();
    });
  });
}

let editingAddrIdx = null;

function showAddressForm(addr = null, idx = null) {
  addressForm.style.display = "block";
  editingAddrIdx = idx;
  addrError.textContent = "";
  if (addr) {
    addressFormTitle.textContent = "编辑地址";
    addrName.value = addr.name || "";
    addrPhone.value = addr.phone || "";
    addrDetail.value = addr.detail || "";
  } else {
    addressFormTitle.textContent = "添加新地址";
    addrName.value = "";
    addrPhone.value = "";
    addrDetail.value = "";
  }
}

addressAddBtn.addEventListener("click", () => showAddressForm());

addrCancelBtn.addEventListener("click", () => {
  addressForm.style.display = "none";
  editingAddrIdx = null;
});

addrSaveBtn.addEventListener("click", () => {
  const name = addrName.value.trim();
  const phone = addrPhone.value.trim();
  const detail = addrDetail.value.trim();
  if (!name || !phone || !detail) {
    addrError.textContent = "请填写完整信息";
    return;
  }
  if (editingAddrIdx !== null) {
    // Edit existing
    userAddresses[editingAddrIdx] = { name, phone, detail, isDefault: userAddresses[editingAddrIdx].isDefault };
  } else {
    // Add new
    const isDefault = userAddresses.length === 0;
    userAddresses.push({ name, phone, detail, isDefault });
  }
  addressForm.style.display = "none";
  editingAddrIdx = null;
  renderAddressList();
});

/* ---------- 结算时需要登录检查 ---------- */
function requireLoginForCheckout() {
  if (userState === "guest") {
    toast("请先登录后再下单");
    closeCart();
    setTimeout(() => openLoginModal(), 400);
    return false;
  }
  if (userState === "logged" && userAddresses.length === 0) {
    toast("请先添加收货地址");
    closeCart();
    setTimeout(() => openAddressModal(), 400);
    return false;
  }
  return true;
}

/* ---------- 渲染热销榜 ---------- */
function renderHotSellers() {
  const sorted = [...PRODUCTS].sort((a, b) => b.sales - a.sales).slice(0, 4);
  hotSellersGrid.innerHTML = sorted.map((p, i) => {
    const rank = i + 1;
    const rankClass = rank <= 3 ? `rank-${rank}` : "rank-4";
    const rankBadge = rank <= 3 ? `rank-badge rank-${rank}` : "rank-badge rank-4";
    return `
      <div class="hot-card" data-id="${p.id}">
        <div class="${rankBadge}">#${rank}</div>
        <img src="${p.image}" alt="${p.name}" class="hot-card-img" loading="lazy">
        <div class="hot-card-body">
          <div class="hot-card-category">${p.categoryLabel}</div>
          <h3 class="hot-card-title">${p.name}</h3>
          <div class="hot-card-bottom">
            <span class="hot-card-price">¥${p.price.toFixed(1)}</span>
            <span class="hot-card-sales">🔥 ${(p.sales / 10).toFixed(0)} 人已购</span>
          </div>
        </div>
      </div>
    `;
  }).join("");

  document.querySelectorAll(".hot-card").forEach(card => {
    card.addEventListener("click", () => {
      const id = parseInt(card.dataset.id);
      const product = PRODUCTS.find(p => p.id === id);
      if (product) openModal(product);
    });
  });
}

/* ---------- 渲染商品 ---------- */
function renderProducts(filter = "all") {
  const filtered = filter === "all" ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);
  productGrid.innerHTML = filtered.map(p => `
    <div class="product-card" data-id="${p.id}">
      <img src="${p.image}" alt="${p.name}" class="product-card-img" loading="lazy">
      <div class="product-card-body">
        <div class="product-card-category">${p.categoryLabel}</div>
        <h3 class="product-card-title">${p.name}</h3>
        <p class="product-card-desc">${p.desc}</p>
        <div class="product-card-bottom">
          <span class="product-card-price">¥${p.price.toFixed(1)}</span>
          <span class="product-card-spec">${p.spec}</span>
        </div>
      </div>
    </div>
  `).join("");

  document.querySelectorAll(".product-card").forEach(card => {
    card.addEventListener("click", () => {
      const id = parseInt(card.dataset.id);
      const product = PRODUCTS.find(p => p.id === id);
      if (product) openModal(product);
    });
  });
}

/* ---------- 筛选 ---------- */
filterBar.addEventListener("click", (e) => {
  const btn = e.target.closest(".filter-btn");
  if (!btn) return;
  filterBar.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  renderProducts(btn.dataset.filter);
});

/* ---------- 商品详情弹窗 ---------- */
function openModal(product) {
  modalBody.innerHTML = `
    <img src="${product.image}" alt="${product.name}" class="modal-detail-img">
    <div class="modal-detail-body">
      <div class="modal-detail-category">${product.categoryLabel}</div>
      <h3 class="modal-detail-title">${product.name}</h3>
      <div class="modal-detail-price">¥${product.price.toFixed(1)} <span style="font-size:0.75rem;font-weight:400;color:var(--color-text-muted)">${product.spec}</span></div>
      <div class="modal-detail-section">
        <h4>📝 描述</h4>
        <p>${product.desc}</p>
      </div>
      <div class="modal-detail-section">
        <h4>✨ 卖点</h4>
        <p>${product.benefits}</p>
      </div>
      <div class="modal-detail-section">
        <h4>🧾 成分</h4>
        <p>${product.ingredients}</p>
      </div>
      <div class="modal-detail-section">
        <h4>🎯 适用宠物</h4>
        <p>${product.suitable}</p>
      </div>
      <button class="btn btn-primary btn-full modal-add-cart" data-id="${product.id}">
        加入购物车 — ¥${product.price.toFixed(1)}
      </button>
    </div>
  `;
  productModal.classList.add("open");
  document.body.style.overflow = "hidden";

  modalBody.querySelector(".modal-add-cart").addEventListener("click", () => {
    addToCart(product.id);
    productModal.classList.remove("open");
    document.body.style.overflow = "";
    openCart();
  });
}

modalClose.addEventListener("click", closeModal);
productModal.addEventListener("click", (e) => {
  if (e.target === productModal) closeModal();
});

function closeModal() {
  productModal.classList.remove("open");
  document.body.style.overflow = "";
}

/* ---------- 购物车操作 ---------- */
function addToCart(id) {
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    const product = PRODUCTS.find(p => p.id === id);
    cart.push({ ...product, qty: 1 });
  }
  updateCartUI();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCartUI();
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(id);
    return;
  }
  updateCartUI();
}

function updateCartUI() {
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  cartCount.textContent = totalItems;
  cartCount.classList.toggle("show", totalItems > 0);
  heroCartCount.textContent = totalItems;

  if (cart.length === 0) {
    cartItems.innerHTML = '<div class="cart-empty">购物车是空的<br>快去给毛孩子选零食吧 🐶</div>';
    cartFooter.style.display = "none";
  } else {
    cartItems.innerHTML = cart.map(item => `
      <div class="cart-item" data-id="${item.id}">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-info">
          <div class="cart-item-title">${item.name}</div>
          <div class="cart-item-spec">${item.spec}</div>
          <div class="cart-item-bottom">
            <span class="cart-item-price">¥${(item.price * item.qty).toFixed(1)}</span>
            <div style="display:flex;align-items:center;gap:4px;">
              <div class="cart-qty">
                <button class="qty-minus" data-id="${item.id}">−</button>
                <span>${item.qty}</span>
                <button class="qty-plus" data-id="${item.id}">+</button>
              </div>
              <button class="cart-item-remove" data-id="${item.id}">删除</button>
            </div>
          </div>
        </div>
      </div>
    `).join("");
    cartFooter.style.display = "block";
    cartTotal.textContent = `¥${totalPrice.toFixed(1)}`;

    document.querySelectorAll(".qty-minus").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        changeQty(parseInt(btn.dataset.id), -1);
      });
    });
    document.querySelectorAll(".qty-plus").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        changeQty(parseInt(btn.dataset.id), 1);
      });
    });
    document.querySelectorAll(".cart-item-remove").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        removeFromCart(parseInt(btn.dataset.id));
      });
    });
  }
}

/* ---------- 购物车侧栏 ---------- */
cartToggle.addEventListener("click", toggleCart);

function openCart() {
  cartSidebar.classList.add("open");
  cartOverlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeCart() {
  cartSidebar.classList.remove("open");
  cartOverlay.classList.remove("open");
  document.body.style.overflow = "";
}

function toggleCart() {
  if (cartSidebar.classList.contains("open")) {
    closeCart();
  } else {
    openCart();
  }
}

cartClose.addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);
document.getElementById("heroCartBtn").addEventListener("click", (e) => {
  e.preventDefault();
  openCart();
});

/* ---------- 结算 ---------- */
checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) return;
  if (!requireLoginForCheckout()) return;
  closeCart();

  // Find default address
  const defaultAddr = userAddresses.find(a => a.isDefault) || userAddresses[0];
  successAddress.textContent = `📍 送至：${defaultAddr.name} ${defaultAddr.phone} · ${defaultAddr.detail}`;

  successModal.classList.add("open");
  document.body.style.overflow = "hidden";
  cart = [];
  updateCartUI();
});

successClose.addEventListener("click", () => {
  successModal.classList.remove("open");
  document.body.style.overflow = "";
});

successModal.addEventListener("click", (e) => {
  if (e.target === successModal) {
    successModal.classList.remove("open");
    document.body.style.overflow = "";
  }
});

/* ---------- 初始化 ---------- */
function mainInit() {
  renderHotSellers();
  renderProducts();
  updateCartUI();
}
