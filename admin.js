/* ============================================
   茸茸食事所 · 管理后台逻辑
   ============================================ */

/* ---------- 演示订单数据 ---------- */
const DEMO_ORDERS = [
  { id: "DEMO-20260601-001", createdAt: "2026-06-01 10:23:45", customer: "王**", address: "北京市朝阳区建国路88号", items: [{ name: "鸡胸肉干", qty: 2, price: 39.9 }, { name: "冻干三文鱼", qty: 1, price: 59.9 }], total: 139.7, status: "已配送" },
  { id: "DEMO-20260602-002", createdAt: "2026-06-02 14:15:30", customer: "李**", address: "上海市浦东新区张江路100号", items: [{ name: "洁齿磨牙棒", qty: 3, price: 45.0 }, { name: "训练奖励粒", qty: 2, price: 29.9 }], total: 194.8, status: "已配送" },
  { id: "DEMO-20260603-003", createdAt: "2026-06-03 09:30:00", customer: "赵**", address: "深圳市南山区科技园南路", items: [{ name: "牛肉粒", qty: 2, price: 42.0 }, { name: "风干牛肋骨", qty: 1, price: 55.0 }, { name: "冻干鸡肝", qty: 2, price: 35.0 }], total: 209.0, status: "已配送" },
  { id: "DEMO-20260604-004", createdAt: "2026-06-04 16:45:22", customer: "陈**", address: "广州市天河区体育西路", items: [{ name: "鸡胸肉干", qty: 1, price: 39.9 }, { name: "鸭肉绕薯条", qty: 2, price: 49.9 }], total: 139.7, status: "配送中" },
  { id: "DEMO-20260605-005", createdAt: "2026-06-05 11:20:35", customer: "刘**", address: "杭州市西湖区文三路", items: [{ name: "冻干三文鱼", qty: 1, price: 59.9 }, { name: "冻干鸡肝", qty: 1, price: 35.0 }, { name: "训练奖励粒", qty: 3, price: 29.9 }], total: 184.6, status: "配送中" },
  { id: "DEMO-20260606-006", createdAt: "2026-06-06 08:15:10", customer: "张**", address: "成都市锦江区红星路三段", items: [{ name: "洁齿磨牙棒", qty: 2, price: 45.0 }, { name: "牛肉粒", qty: 1, price: 42.0 }], total: 132.0, status: "待配送" },
  { id: "DEMO-20260607-007", createdAt: "2026-06-07 13:50:08", customer: "周**", address: "武汉市洪山区鲁巷", items: [{ name: "风干牛肋骨", qty: 2, price: 55.0 }, { name: "鸭肉绕薯条", qty: 1, price: 49.9 }], total: 159.9, status: "待配送" },
  { id: "DEMO-20260608-008", createdAt: "2026-06-08 10:05:33", customer: "吴**", address: "南京市鼓楼区汉口路", items: [{ name: "鸡胸肉干", qty: 3, price: 39.9 }, { name: "训练奖励粒", qty: 4, price: 29.9 }, { name: "冻干鸡肝", qty: 2, price: 35.0 }], total: 310.3, status: "待配送" },
  { id: "DEMO-20260609-009", createdAt: "2026-06-09 15:30:00", customer: "郑**", address: "西安市雁塔区长安南路", items: [{ name: "冻干三文鱼", qty: 2, price: 59.9 }, { name: "牛肉粒", qty: 1, price: 42.0 }], total: 161.8, status: "待配送" },
  { id: "DEMO-20260610-010", createdAt: "2026-06-10 09:45:18", customer: "孙**", address: "长沙市岳麓区麓山南路", items: [{ name: "鸡胸肉干", qty: 1, price: 39.9 }, { name: "洁齿磨牙棒", qty: 1, price: 45.0 }, { name: "冻干三文鱼", qty: 1, price: 59.9 }], total: 144.8, status: "待配送" }
];

/* ---------- 商品数据（与前台一致） ---------- */
const DEFAULT_PRODUCTS = [
  { id: 1, name: "鸡胸肉干", category: "chicken", categoryLabel: "🐔 鸡肉", price: 39.9, spec: "100g / 包", desc: "精选去脂鸡胸肉，低温慢烘12小时，保留原生肉香", benefits: "高蛋白低脂肪，适合日常奖励", ingredients: "100% 鸡胸肉", suitable: "犬 / 猫通用", image: "assets/product-chicken.svg", sales: 1860 },
  { id: 2, name: "冻干三文鱼", category: "freezedry", categoryLabel: "❄️ 冻干", price: 59.9, spec: "50g / 罐", desc: "挪威三文鱼急速冻干，-35°C 锁住Omega-3", benefits: "美毛护肤，富含不饱和脂肪酸", ingredients: "100% 三文鱼", suitable: "犬 / 猫通用", image: "assets/product-freezedry.svg", sales: 1520 },
  { id: 3, name: "洁齿磨牙棒", category: "dental", categoryLabel: "🦷 洁齿", price: 45.0, spec: "12根 / 盒", desc: "螺旋纹设计帮助摩擦牙垢，添加薄荷清新口气", benefits: "洁齿护龈，缓解换牙不适", ingredients: "红薯淀粉、鸡肉粉、薄荷提取物", suitable: "犬用（3月龄以上）", image: "assets/product-dental.svg", sales: 2100 },
  { id: 4, name: "训练奖励粒", category: "training", categoryLabel: "🎯 训练奖励", price: 29.9, spec: "80g / 袋", desc: "迷你颗粒一口一粒，低卡路里适合高频奖励", benefits: "低脂低卡，训练好伴侣", ingredients: "鸡胸肉、南瓜、蓝莓", suitable: "犬 / 猫通用", image: "assets/product-training.svg", sales: 2380 },
  { id: 5, name: "鸭肉绕薯条", category: "chicken", categoryLabel: "🐔 鸡肉", price: 49.9, spec: "100g / 包", desc: "鸭肉包裹红薯条，双重口感层层美味", benefits: "鸭肉性凉，适合易上火宠物", ingredients: "鸭胸肉、红薯、迷迭香", suitable: "犬用", image: "assets/product-duck.svg", sales: 1740 },
  { id: 6, name: "牛肉粒", category: "beef", categoryLabel: "🥩 牛肉", price: 42.0, spec: "120g / 罐", desc: "澳洲草饲牛肉，切成适口小粒，浓郁肉香", benefits: "补铁补血，强壮体格", ingredients: "100% 牛肉", suitable: "犬用", image: "assets/product-beef.svg", sales: 980 },
  { id: 7, name: "风干牛肋骨", category: "beef", categoryLabel: "🥩 牛肉", price: 55.0, spec: "3根 / 包", desc: "整根牛肋骨低温风干，耐啃磨牙天然洁齿", benefits: "高钙耐啃，释放咀嚼天性", ingredients: "100% 牛肋骨", suitable: "犬用（中型犬以上）", image: "assets/product-rib.svg", sales: 1250 },
  { id: 8, name: "冻干鸡肝", category: "freezedry", categoryLabel: "❄️ 冻干", price: 35.0, spec: "40g / 罐", desc: "新鲜鸡肝冻干处理，天然维生素A来源", benefits: "补肝明目，挑食克星", ingredients: "100% 鸡肝", suitable: "犬 / 猫通用", image: "assets/product-chicken.svg", sales: 2030 }
];

/* ---------- 工具函数 ---------- */
function getRealOrders() {
  try {
    return JSON.parse(localStorage.getItem("lanhe-orders") || "[]");
  } catch { return []; }
}

function getCustomProducts() {
  try {
    return JSON.parse(localStorage.getItem("lanhe-products") || "[]");
  } catch { return []; }
}

function getAllProducts() {
  return [...DEFAULT_PRODUCTS, ...getCustomProducts()];
}

/* ---------- 状态 ---------- */
let currentOrderFilter = "all";

/* ---------- DOM 引用 ---------- */
const statsRevenue = document.getElementById("statRevenue");
const statsOrders = document.getElementById("statOrders");
const statsItems = document.getElementById("statItems");
const statsProducts = document.getElementById("statProducts");
const rankingsGrid = document.getElementById("rankingsGrid");
const salesTableBody = document.getElementById("salesTableBody");
const ordersTableBody = document.getElementById("ordersTableBody");
const productForm = document.getElementById("productForm");
const customProductsList = document.getElementById("customProductsList");

/* ---------- 计算统计 ---------- */
function computeStats() {
  const realOrders = getRealOrders();
  const allOrders = [...DEMO_ORDERS, ...realOrders];

  // 总营业额
  const totalRevenue = allOrders.reduce((sum, o) => sum + o.total, 0);
  // 总订单数
  const totalOrders = allOrders.length;
  // 售出件数
  const totalItems = allOrders.reduce((sum, o) => sum + o.items.reduce((s, i) => s + i.qty, 0), 0);
  // 商品种类
  const allProducts = getAllProducts();
  const totalProductTypes = allProducts.length;

  statsRevenue.textContent = "¥" + totalRevenue.toFixed(1);
  statsOrders.textContent = totalOrders;
  statsItems.textContent = totalItems;
  statsProducts.textContent = totalProductTypes;

  return { allOrders, allProducts, totalRevenue, totalOrders, totalItems };
}

/* ---------- 商品销量排行 ---------- */
function renderRankings(allOrders, allProducts) {
  // 统计每个商品在订单中的销量
  const salesMap = {};
  allOrders.forEach(order => {
    order.items.forEach(item => {
      const key = item.name;
      if (!salesMap[key]) salesMap[key] = { qty: 0, revenue: 0 };
      salesMap[key].qty += item.qty;
      salesMap[key].revenue += item.price * item.qty;
    });
  });

  // 合并默认销量（商品自带 sales 字段）
  allProducts.forEach(p => {
    if (!salesMap[p.name]) {
      salesMap[p.name] = { qty: 0, revenue: 0 };
    }
    salesMap[p.name].qty += p.sales || 0;
    salesMap[p.name].revenue += (p.sales || 0) * p.price;
  });

  // 排序
  const sorted = Object.entries(salesMap)
    .map(([name, data]) => ({ name, ...data }))
    .sort((a, b) => b.qty - a.qty);

  // 渲染排行卡片
  const top3 = sorted.slice(0, 3);
  rankingsGrid.innerHTML = top3.map((item, i) => {
    const medals = ["🥇", "🥈", "🥉"];
    return `
      <div class="ranking-card">
        <div class="ranking-medal">${medals[i]}</div>
        <div class="ranking-name">${item.name}</div>
        <div class="ranking-qty">已售 <strong>${item.qty}</strong> 件</div>
        <div class="ranking-revenue">销售额 ¥${item.revenue.toFixed(1)}</div>
      </div>
    `;
  }).join("");

  // 渲染销售明细表
  salesTableBody.innerHTML = sorted.map((item, i) => {
    const product = allProducts.find(p => p.name === item.name);
    return `
      <tr>
        <td>${i + 1}</td>
        <td><strong>${item.name}</strong></td>
        <td>${product ? product.categoryLabel : "-"}</td>
        <td>¥${product ? product.price.toFixed(1) : "-"}</td>
        <td>${item.qty}</td>
        <td>¥${item.revenue.toFixed(1)}</td>
      </tr>
    `;
  }).join("");
}

/* ---------- 渲染订单 ---------- */
function renderOrders(allOrders) {
  let filtered = allOrders;
  if (currentOrderFilter === "real") {
    filtered = getRealOrders();
  } else if (currentOrderFilter === "demo") {
    const realIds = new Set(getRealOrders().map(o => o.id));
    filtered = DEMO_ORDERS.filter(o => !realIds.has(o.id));
  }

  if (filtered.length === 0) {
    ordersTableBody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:var(--color-text-muted);padding:32px;">暂无订单</td></tr>';
    return;
  }

  ordersTableBody.innerHTML = filtered.map(order => {
    const itemsStr = order.items.map(i => `${i.name} ×${i.qty}`).join("<br>");
    return `
      <tr>
        <td class="order-id">${order.id}</td>
        <td>${order.createdAt}</td>
        <td>${order.customer || "游客"}</td>
        <td>${itemsStr}</td>
        <td><strong>¥${order.total.toFixed(1)}</strong></td>
        <td><span class="order-status status-${order.status === "已配送" ? "delivered" : order.status === "配送中" ? "shipping" : "pending"}">${order.status || "待配送"}</span></td>
      </tr>
    `;
  }).join("");
}

/* ---------- 全量渲染 ---------- */
function renderAll() {
  const { allOrders, allProducts } = computeStats();
  renderRankings(allOrders, allProducts);
  renderOrders(allOrders);
  renderCustomProducts();
}

/* ---------- 自定义商品管理 ---------- */
function renderCustomProducts() {
  const products = getCustomProducts();
  if (products.length === 0) {
    customProductsList.innerHTML = '<p style="color:var(--color-text-muted);font-size:0.9rem;padding:12px 0;">暂无自定义商品</p>';
    return;
  }
  customProductsList.innerHTML = products.map((p, i) => `
    <div class="custom-product-item">
      <img src="${p.image}" alt="${p.name}" class="custom-product-img">
      <div class="custom-product-info">
        <strong>${p.name}</strong>
        <span>${p.categoryLabel} · ¥${p.price.toFixed(1)} · ${p.spec}</span>
      </div>
      <button class="btn btn-outline btn-sm" onclick="deleteCustomProduct(${i})">删除</button>
    </div>
  `).join("");
}

function deleteCustomProduct(index) {
  const products = getCustomProducts();
  products.splice(index, 1);
  localStorage.setItem("lanhe-products", JSON.stringify(products));
  renderCustomProducts();
}

/* ---------- 新品上架表单 ---------- */
productForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("formName").value.trim();
  const category = document.getElementById("formCategory").value;
  const price = parseFloat(document.getElementById("formPrice").value);
  const spec = document.getElementById("formSpec").value.trim();
  const desc = document.getElementById("formDesc").value.trim();
  const benefits = document.getElementById("formBenefits").value.trim();
  const ingredients = document.getElementById("formIngredients").value.trim();
  const suitable = document.getElementById("formSuitable").value.trim();
  const image = document.getElementById("formImage").value;

  if (!name || !price) {
    toast("请填写商品名称和价格");
    return;
  }

  const categoryMap = {
    chicken: "🐔 鸡肉",
    freezedry: "❄️ 冻干",
    dental: "🦷 洁齿",
    training: "🎯 训练奖励",
    beef: "🥩 牛肉"
  };

  const products = getCustomProducts();
  const newId = Date.now();
  const newProduct = {
    id: newId,
    name,
    category,
    categoryLabel: categoryMap[category] || category,
    price,
    spec: spec || "标准装",
    desc: desc || name,
    benefits: benefits || "优质天然食材",
    ingredients: ingredients || "天然食材",
    suitable: suitable || "犬 / 猫通用",
    image,
    sales: 0
  };

  products.push(newProduct);
  localStorage.setItem("lanhe-products", JSON.stringify(products));

  // 重置表单
  productForm.reset();
  toast("✅ 商品「" + name + "」已上架！刷新前台即可查看。");
  renderCustomProducts();
});

/* ---------- Toast ---------- */
function toast(msg) {
  let el = document.getElementById("adminToast");
  if (!el) {
    el = document.createElement("div");
    el.id = "adminToast";
    el.style.cssText = "position:fixed;bottom:30px;left:50%;transform:translateX(-50%) translateY(80px);background:#2c2a28;color:#fff;font-size:0.85rem;padding:12px 24px;border-radius:50px;box-shadow:0 16px 48px rgba(44,42,40,0.12);z-index:500;opacity:0;pointer-events:none;transition:all 0.35s ease;white-space:nowrap;";
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.style.opacity = "1";
  el.style.transform = "translateX(-50%) translateY(0)";
  clearTimeout(el._timer);
  el._timer = setTimeout(() => {
    el.style.opacity = "0";
    el.style.transform = "translateX(-50%) translateY(80px)";
  }, 2500);
}

/* ---------- 导航切换 ---------- */
document.querySelectorAll(".admin-nav-link").forEach(link => {
  link.addEventListener("click", (e) => {
    document.querySelectorAll(".admin-nav-link").forEach(l => l.classList.remove("active"));
    link.classList.add("active");
  });
});

/* ---------- 订单筛选 ---------- */
document.querySelectorAll(".order-filters .filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".order-filters .filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentOrderFilter = btn.dataset.filter;
    const realOrders = getRealOrders();
    const allOrders = [...DEMO_ORDERS, ...realOrders];
    renderOrders(allOrders);
  });
});

/* ---------- 初始化 ---------- */
renderAll();
