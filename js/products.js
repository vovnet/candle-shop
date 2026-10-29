import { CONFIG } from "./config.js";

let productsCache = null;
const CACHE_KEY = "candle_catalog_cache";

/**
 * Загружает товары из Google Таблицы с умным кэшированием
 */
export async function loadProducts() {
  // 1. Проверяем кэш в оперативной памяти (работает мгновенно)
  if (productsCache) {
    return productsCache;
  }

  // 2. Проверяем кэш в sessionStorage (при переходе между страницами)
  const cachedData = sessionStorage.getItem(CACHE_KEY);
  if (cachedData) {
    try {
      productsCache = JSON.parse(cachedData);
      console.log("📦 Каталог загружен из кэша (мгновенно)");
      return productsCache;
    } catch (e) {
      console.warn("Ошибка парсинга кэша каталога, очищаем...", e);
      sessionStorage.removeItem(CACHE_KEY);
    }
  }

  // 3. Если кэша нет, делаем реальный запрос к Google Таблице
  console.log("🌐 Загрузка каталога из Google Sheets...");
  try {
    const response = await fetch(CONFIG.CATALOG_API_URL);
    const data = await response.json();

    if (data.error) {
      console.error("Ошибка от Google Sheets:", data.error);
      return [];
    }

    // Сохраняем и в память, и в sessionStorage для следующих страниц
    productsCache = data;
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(data));

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
