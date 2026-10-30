import { renderHeader } from "../header.js";
import { loadProducts, formatPrice } from "../products.js";
import { renderFooter } from "../footer.js";
import { addToCart } from "../cart.js";
import { initTestimonials } from "../testimonials.js";

document.addEventListener("DOMContentLoaded", async () => {
  renderHeader();
  renderFooter();
  await renderPopularProducts();
  initTestimonials();
  setupSmoothScroll();
});

/**
 * Рендерит блок "Популярные товары" (первые 3 товара)
 */
async function renderPopularProducts() {
  const grid = document.getElementById("popular-grid");
  if (!grid) return;

  const products = await loadProducts();
  const popularProducts = products.slice(0, 3);

  grid.innerHTML = popularProducts
    .map(
      (product) => `
    <article class="product-card" data-id="${product.id}">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}" 
             onerror="this.src='assets/images/placeholder.jpg'">
      </div>
      <div class="product-info">
        <h3 class="product-title">${product.name}</h3>
        <p class="product-description">${product.description}</p>
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

  // Обработчик добавления в корзину (делегирование событий)
  grid.addEventListener("click", (e) => {
    const btn = e.target.closest(".add-to-cart-btn");
    if (btn) {
      const productId = btn.dataset.id;
      addToCart(productId);
      showAddedFeedback(btn);
    }
  });
}

/**
 * Показывает обратную связь после добавления в корзину
 */
function showAddedFeedback(button) {
  const originalText = button.textContent;
  button.textContent = "✓ Добавлено";
  button.classList.add("btn-success");

  setTimeout(() => {
    button.textContent = originalText;
    button.classList.remove("btn-success");
  }, 1500);
}

/**
 * Плавная прокрутка к якорям (например, #advantages)
 */
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (targetId === "#") return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}
