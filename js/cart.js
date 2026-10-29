import { storage } from "./storage.js";
import { getProductById, loadProducts } from "./products.js"; // 🆕 Добавили loadProducts

const CART_STORAGE_KEY = "cart";

export function getCartItems() {
  return storage.get(CART_STORAGE_KEY, []);
}

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

export function removeFromCart(productId) {
  const items = getCartItems().filter((item) => item.productId !== productId);
  storage.set(CART_STORAGE_KEY, items);
  dispatchCartEvent("cart-updated");
  return items;
}

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

export function clearCart() {
  storage.remove(CART_STORAGE_KEY);
  dispatchCartEvent("cart-updated");
}

export function getCartCount() {
  // Эту функцию можно оставить синхронной, ей не нужны данные о товарах
  return getCartItems().reduce((sum, item) => sum + item.quantity, 0);
}

// 🆕 1. Делаем асинхронной и ждем загрузку товаров
export async function getCartTotal() {
  await loadProducts(); // Гарантируем, что кэш заполнен

  return getCartItems().reduce((sum, item) => {
    const product = getProductById(item.productId);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);
}

// 🆕 2. Делаем асинхронной и ждем загрузку товаров
export async function getCartWithProducts() {
  await loadProducts(); // Гарантируем, что кэш заполнен

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
