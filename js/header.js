import { getCartCount, onCartUpdate } from "./cart.js";

/**
 * Рендерит шапку на странице
 * Вызывать в каждой странице после загрузки DOM
 */
export function renderHeader() {
  const headerContainer = document.getElementById("header-placeholder");
  if (!headerContainer) return;

  headerContainer.innerHTML = `
    <header class="site-header">
      <div class="container header-content">
        <a href="index.html" class="logo">ACFES</a>
        
        <nav class="main-nav">
          <a href="index.html" class="nav-link">Главная</a>
          <a href="catalog.html" class="nav-link">Каталог</a>
          <a href="cart.html" class="nav-link cart-link">
            🛒 Корзина
            <span class="cart-badge" id="cart-badge">0</span>
          </a>
        </nav>
      </div>
    </header>
  `;

  updateCartBadge();
  onCartUpdate(updateCartBadge);
}

function updateCartBadge() {
  const badge = document.getElementById("cart-badge");
  if (badge) {
    const count = getCartCount();
    badge.textContent = count;
    badge.style.display = count > 0 ? "inline-block" : "none";
  }
}
