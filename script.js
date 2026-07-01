/* ============================================
   茸茸食事所 · 交互逻辑
   ============================================ */

/* ---------- 商品数据 ---------- */
const PRODUCTS = [
  {
    id: 1,
    name: "鸡胸肉干",
    category: "chicken",
    categoryLabel: "🐔 鸡肉",
    price: 39.9,
    spec: "100g / 包",
    desc: "精选去脂鸡胸肉，低温慢烘12小时，保留原生肉香",
    benefits: "高蛋白低脂肪，适合日常奖励",
    ingredients: "100% 鸡胸肉",
    suitable: "犬 / 猫通用",
    image: "assets/product-chicken.svg"
  },
  {
    id: 2,
    name: "冻干三文鱼",
    category: "freezedry",
    categoryLabel: "❄️ 冻干",
    price: 59.9,
    spec: "50g / 罐",
    desc: "挪威三文鱼急速冻干，-35°C 锁住Omega-3",
    benefits: "美毛护肤，富含不饱和脂肪酸",
    ingredients: "100% 三文鱼",
    suitable: "犬 / 猫通用",
    image: "assets/product-freezedry.svg"
  },
  {
    id: 3,
    name: "洁齿磨牙棒",
    category: "dental",
    categoryLabel: "🦷 洁齿",
    price: 45.0,
    spec: "12根 / 盒",
    desc: "螺旋纹设计帮助摩擦牙垢，添加薄荷清新口气",
    benefits: "洁齿护龈，缓解换牙不适",
    ingredients: "红薯淀粉、鸡肉粉、薄荷提取物",
    suitable: "犬用（3月龄以上）",
    image: "assets/product-dental.svg"
  },
  {
    id: 4,
    name: "训练奖励粒",
    category: "training",
    categoryLabel: "🎯 训练奖励",
    price: 29.9,
    spec: "80g / 袋",
    desc: "迷你颗粒一口一粒，低卡路里适合高频奖励",
    benefits: "低脂低卡，训练好伴侣",
    ingredients: "鸡胸肉、南瓜、蓝莓",
    suitable: "犬 / 猫通用",
    image: "assets/product-training.svg"
  },
  {
    id: 5,
    name: "鸭肉绕薯条",
    category: "chicken",
    categoryLabel: "🐔 鸡肉",
    price: 49.9,
    spec: "100g / 包",
    desc: "鸭肉包裹红薯条，双重口感层层美味",
    benefits: "鸭肉性凉，适合易上火宠物",
    ingredients: "鸭胸肉、红薯、迷迭香",
    suitable: "犬用",
    image: "assets/product-duck.svg"
  },
  {
    id: 6,
    name: "牛肉粒",
    category: "beef",
    categoryLabel: "🥩 牛肉",
    price: 42.0,
    spec: "120g / 罐",
    desc: "澳洲草饲牛肉，切成适口小粒，浓郁肉香",
    benefits: "补铁补血，强壮体格",
    ingredients: "100% 牛肉",
    suitable: "犬用",
    image: "assets/product-beef.svg"
  },
  {
    id: 7,
    name: "风干牛肋骨",
    category: "beef",
    categoryLabel: "🥩 牛肉",
    price: 55.0,
    spec: "3根 / 包",
    desc: "整根牛肋骨低温风干，耐啃磨牙天然洁齿",
    benefits: "高钙耐啃，释放咀嚼天性",
    ingredients: "100% 牛肋骨",
    suitable: "犬用（中型犬以上）",
    image: "assets/product-rib.svg"
  },
  {
    id: 8,
    name: "冻干鸡肝",
    category: "freezedry",
    categoryLabel: "❄️ 冻干",
    price: 35.0,
    spec: "40g / 罐",
    desc: "新鲜鸡肝冻干处理，天然维生素A来源",
    benefits: "补肝明目，挑食克星",
    ingredients: "100% 鸡肝",
    suitable: "犬 / 猫通用",
    image: "assets/product-chicken.svg"
  }
];

/* ---------- 购物车 ---------- */
let cart = [];

/* ---------- DOM 引用 ---------- */
const productGrid = document.getElementById("productGrid");
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

  // 点击卡片打开详情
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

  // 点击加入购物车
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

  // 更新角标
  cartCount.textContent = totalItems;
  cartCount.classList.toggle("show", totalItems > 0);
  heroCartCount.textContent = totalItems;

  // 更新侧栏
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

    // 绑定数量事件
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

/* 首屏购物车按钮 */
document.getElementById("heroCartBtn").addEventListener("click", (e) => {
  e.preventDefault();
  openCart();
});

/* ---------- 结算 ---------- */
checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) return;
  closeCart();
  // 显示成功弹窗
  successModal.classList.add("open");
  document.body.style.overflow = "hidden";
  // 清空购物车
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
renderProducts();
updateCartUI();
