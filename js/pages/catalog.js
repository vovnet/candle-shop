import { renderHeader } from "../header.js";
import { renderFooter } from "../footer.js";
import { loadProducts, formatPrice } from "../products.js";
import { addToCart } from "../cart.js";

document.addEventListener("DOMContentLoaded", async () => {
  renderHeader();
  renderFooter();
  await renderProducts(); // 🆕 Ждем загрузку данных
});

async function renderProducts() {
  const grid = document.getElementById("products-grid");

  // 1. Показываем спиннер загрузки
  grid.innerHTML = `
    <div style="grid-column: 1/-1; text-align: center; padding: 60px; color: #8b6f47;">
      <div class="spinner" style="border-top-color: #8b6f47; margin: 0 auto 15px;"></div>
      <p>Загружаем ароматы...</p>
    </div>
  `;

  // 2. Загружаем данные
  const products = await loadProducts();

  // 3. Рендерим или показываем ошибку
  if (products.length === 0) {
    grid.innerHTML =
      '<p style="grid-column: 1/-1; text-align: center;">Не удалось загрузить каталог. Попробуйте обновить страницу.</p>';
    return;
  }

  grid.innerHTML = products
    .map(
      (product) => `
    <article class="product-card" data-id="${product.id}">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}" 
             onerror="this.src='https://via.placeholder.com/300x200?text=No+Image'">
      </div>
      <div class="product-info">
        <h3 class="product-title">${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <ul class="product-features" style="list-style: none; padding: 0; margin-bottom: 15px; font-size: 13px; color: #666;">
          ${product.features.map((f) => `<li>• ${f}</li>`).join("")}
        </ul>
        <div class="product-footer">
          <span class="product-price">${formatPrice(product.price)}</span>
          <button class="btn btn-primary add-to-cart-btn" data-id="${product.id}">
            В корзину
          </button>
        </div>
      </div>
    </article>
  `,
    )
    .join("");

  // Обработчик добавления в корзину
  grid.addEventListener("click", (e) => {
    const btn = e.target.closest(".add-to-cart-btn");
    if (btn) {
      const productId = btn.dataset.id;
      addToCart(productId);
      showAddedFeedback(btn);
    }
  });
}

function showAddedFeedback(button) {
  const originalText = button.textContent;
  button.textContent = "✓ Добавлено";
  button.classList.add("btn-success");
  setTimeout(() => {
    button.textContent = originalText;
    button.classList.remove("btn-success");
  }, 1500);
}
