import { renderHeader } from "../header.js";
import { PRODUCTS, formatPrice } from "../products.js";
import { addToCart } from "../cart.js";
import { renderFooter } from "../footer.js";

document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderProducts();
  renderFooter();
});

function renderProducts() {
  const grid = document.getElementById("products-grid");

  grid.innerHTML = PRODUCTS.map(
    (product) => `
    <article class="product-card" data-id="${product.id}">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}" 
             onerror="this.src='assets/images/placeholder.jpg'">
      </div>
      <div class="product-info">
        <h2 class="product-title">${product.name}</h2>
        <p class="product-description">${product.description}</p>
        <ul class="product-features">
          ${product.features.map((f) => `<li>${f}</li>`).join("")}
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
  ).join("");

  // Навешиваем обработчики на кнопки
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
