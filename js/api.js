import { CONFIG } from "./config.js";

/**
 * Отправляет данные заказа в Google Таблицу через Apps Script
 * @param {Object} orderData - Данные заказа (имя, телефон, товары, сумма)
 * @returns {Promise<Object>} Результат отправки
 */
export async function submitOrder(orderData) {
  try {
    await fetch(CONFIG.GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors", // Обязательно для Google Apps Script (блокирует чтение ответа, но разрешает отправку)
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    // При mode: 'no-cors' браузер не дает прочитать ответ от Google,
    // но если код дошел сюда и не выбросил ошибку в catch, значит запрос ушел.
    return { success: true };
  } catch (error) {
    console.error("Ошибка отправки заказа:", error);
    return { success: false, error: error.message };
  }
}
