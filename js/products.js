import { CONFIG } from "./config.js";

let productsCache = null;

/**
 * Загружает товары из Google Таблицы (с кэшированием)
 */
export async function loadProducts() {
  // Если уже загружали, возвращаем из памяти
  if (productsCache) {
    return productsCache;
  }

  try {
    const response = await fetch(CONFIG.CATALOG_API_URL);
    const data = await response.json();

    if (data.error) {
      console.error("Ошибка от Google Sheets:", data.error);
      return [];
    }

    productsCache = data;
    return productsCache;
  } catch (error) {
    console.error("Не удалось загрузить каталог:", error);
    return [];
  }
}

/**
 * Получить товар по ID (работает только после вызова loadProducts)
 */
export function getProductById(id) {
  if (!productsCache) return null;
  return productsCache.find((p) => p.id === id) || null;
}

/**
 * Форматировать цену
 */
export function formatPrice(price) {
  return new Intl.NumberFormat("ru-RU").format(price) + " ₽";
}
