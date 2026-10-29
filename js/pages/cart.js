import { renderHeader } from "../header.js";
import {
  getCartWithProducts,
  updateQuantity,
  removeFromCart,
  clearCart,
  getCartTotal,
  onCartUpdate,
} from "../cart.js";
import { formatPrice } from "../products.js";
import { submitOrder } from "../api.js";
import { renderFooter } from "../footer.js";

document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderCart();
  renderFooter();

  // Перерисовываем корзину при любых изменениях
  onCartUpdate(renderCart);
});

function renderCart() {
  const container = document.getElementById("cart-content");
  const items = getCartWithProducts();

  if (items.length === 0) {
    container.innerHTML = `
      <div class="empty-cart">
        <h2>🛒 Корзина пуста</h2>
        <p>Добавьте товары из <a href="catalog.html">каталога</a></p>
      </div>
    `;
    return;
  }

  const total = getCartTotal();

  container.innerHTML = `
    <div class="cart-layout">
      <div class="cart-items">
        ${items.map((item) => renderCartItem(item)).join("")}
      </div>
      
      <aside class="cart-summary">
        <h3>Итого</h3>
        <div class="summary-row">
          <span>Товаров:</span>
          <span>${items.reduce((s, i) => s + i.quantity, 0)} шт.</span>
        </div>
        <div class="summary-row total">
          <span>К оплате:</span>
          <span>${formatPrice(total)}</span>
        </div>
        
        <form id="checkout-form" class="checkout-form">
          <h3>Оформление заказа</h3>
          <input type="text" name="name" placeholder="Ваше имя" required>
          <input type="tel" name="phone" placeholder="+7 (999) 123-45-67" required>
          <input type="email" name="email" placeholder="Email" required>
          <textarea name="comment" placeholder="Комментарий"></textarea>
          <button type="submit" class="btn btn-primary btn-full">
            Оформить заказ
          </button>
        </form>
      </aside>
    </div>
  `;

  // Обработчики для кнопок количества и удаления
  container.addEventListener("click", handleCartActions);

  // Обработчик оформления заказа
  document.getElementById("checkout-form").addEventListener("submit", handleCheckout);
}

function renderCartItem(item) {
  const { product, quantity } = item;
  return `
    <div class="cart-item" data-id="${product.id}">
      <img src="${product.image}" alt="${product.name}" class="cart-item-image">
      <div class="cart-item-info">
        <h3>${product.name}</h3>
        <p class="cart-item-price">${formatPrice(product.price)} за шт.</p>
      </div>
      <div class="cart-item-quantity">
        <button class="qty-btn" data-action="decrease" data-id="${product.id}">−</button>
        <span class="qty-value">${quantity}</span>
        <button class="qty-btn" data-action="increase" data-id="${product.id}">+</button>
      </div>
      <div class="cart-item-total">
        ${formatPrice(product.price * quantity)}
      </div>
      <button class="remove-btn" data-action="remove" data-id="${product.id}">
        ✕
      </button>
    </div>
  `;
}

function handleCartActions(e) {
  const btn = e.target.closest("button[data-action]");
  if (!btn) return;

  const { action, id } = btn.dataset;

  switch (action) {
    case "increase": {
      const item = getCartWithProducts().find((i) => i.product.id === id);
      if (item) updateQuantity(id, item.quantity + 1);
      break;
    }
    case "decrease": {
      const item = getCartWithProducts().find((i) => i.product.id === id);
      if (item) updateQuantity(id, item.quantity - 1);
      break;
    }
    case "remove":
      removeFromCart(id);
      break;
  }
}

async function handleCheckout(e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const items = getCartWithProducts();
  const total = getCartTotal();

  const orderData = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    comment: formData.get("comment"),
    product: items.map((i) => `${i.product.name} x${i.quantity}`).join(", "),
    quantity: items.reduce((s, i) => s + i.quantity, 0),
    total,
  };

  const result = await submitOrder(orderData);

  if (result.success) {
    clearCart();
    alert("✅ Заказ успешно оформлен! Мы свяжемся с вами.");
    window.location.href = "index.html";
  } else {
    alert("❌ Ошибка при оформлении заказа. Попробуйте еще раз.");
  }
}
