export const CONFIG = {
  GOOGLE_SCRIPT_URL:
    "https://script.google.com/macros/s/AKfycbzZf1ky9t7ObOBE5Eyg-OYE8pxyzN_BWuWKJQJ5FbNB1Fe4pff5DHSb3I6k3fS2nWhL/exec",

  CATALOG_API_URL:
    "https://script.google.com/macros/s/AKfycbwT6jek6Yhf2A2RbTMGoNv_WM0BSezRjYuRWxvNMqQiI7R0WTCb-pd712B16NT8UAnlAw/exec",

  PRODUCT: {
    name: "Ароматическая свеча",
    price: 1500,
    defaultQuantity: 1,
  },

  // 🆕 Данные сайта (используются в подвале)
  SITE: {
    name: "ACFES",
    description:
      "Многоразовые свечи ручной работы: премиальная эстетика живого огня без копоти и лишних расходов",
    social: {
      instagram: "https://instagram.com/warm_candles",
      telegram: "https://t.me/warm_candles",
      vk: "https://vk.com/warm_candles",
    },
    contacts: {
      email: "hello@warmcandles.ru",
      phone: "+79886708838",
      phoneFormatted: "+7 (988) 670-88-38",
      workHours: "Пн-Пт: 10:00 — 19:00",
    },
  },

  VALIDATION: {
    NAME_MIN_LENGTH: 2,
    PHONE_PATTERN: /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
    EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },

  MESSAGES: {
    SUCCESS: "✅ Спасибо! Ваш заказ принят. Мы свяжемся с вами в ближайшее время.",
    ERROR: "❌ Произошла ошибка при отправке. Пожалуйста, попробуйте еще раз.",
    VALIDATION_ERROR: "Пожалуйста, заполните все обязательные поля корректно.",
  },
};
