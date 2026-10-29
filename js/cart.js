import { storage } from "./storage.js";
import { getProductById } from "./products.js";

const CART_STORAGE_KEY = "cart";

/**
 * Получить все товары из корзины
 */
export function getCartItems() {
  return storage.get(CART_STORAGE_KEY, []);
}

/**
 * Добавить товар в корзину
 */
export function addToCart(productId, quantity = 1) {
  const items = getCartItems();
  const existingItem = items.find((item) => item.productId === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    items.push({ productId, quantity });
  }

  storage.set(CART_STORAGE_KEY, items);
  dispatchCartEvent("cart-updated");
  return getCartItems();
}

/**
 * Удалить товар из корзины
 */
export function removeFromCart(productId) {
  const items = getCartItems().filter((item) => item.productId !== productId);
  storage.set(CART_STORAGE_KEY, items);
  dispatchCartEvent("cart-updated");
  return items;
}

/**
 * Изменить количество товара
 */
export function updateQuantity(productId, quantity) {
  if (quantity <= 0) {
    return removeFromCart(productId);
  }

  const items = getCartItems();
  const item = items.find((i) => i.productId === productId);
  if (item) {
    item.quantity = quantity;
    storage.set(CART_STORAGE_KEY, items);
    dispatchCartEvent("cart-updated");
  }
  return items;
}

/**
 * Очистить корзину
 */
export function clearCart() {
  storage.remove(CART_STORAGE_KEY);
  dispatchCartEvent("cart-updated");
}

/**
 * Получить количество товаров в корзине (для бейджа в шапке)
 */
export function getCartCount() {
  return getCartItems().reduce((sum, item) => sum + item.quantity, 0);
}

/**
 * Получить общую сумму корзины
 */
export function getCartTotal() {
  return getCartItems().reduce((sum, item) => {
    const product = getProductById(item.productId);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);
}

/**
 * Получить корзину с полными данными о товарах
 */
export function getCartWithProducts() {
  return getCartItems()
    .map((item) => ({
      ...item,
      product: getProductById(item.productId),
    }))
    .filter((item) => item.product !== null);
}

// === Система событий для обновления UI ===

const cartListeners = new Set();

export function onCartUpdate(callback) {
  cartListeners.add(callback);
  return () => cartListeners.delete(callback);
}

function dispatchCartEvent(eventName) {
  cartListeners.forEach((callback) => {
    try {
      callback({ type: eventName, cart: getCartItems() });
    } catch (error) {
      console.error("Ошибка в обработчике события корзины:", error);
    }
  });
}
