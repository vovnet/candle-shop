// В реальном проекте это может приходить с сервера
export const PRODUCTS = [
  {
    id: "phaser-book",
    name: 'Книга "Phaser 4 для начинающих"',
    price: 1500,
    description: "Полное руководство по созданию игр на Phaser 4 с нуля.",
    image: "assets/images/phaser-book.jpg",
    features: [
      "300+ страниц практического материала",
      "Примеры кода для всех глав",
      "Доступ к закрытому Telegram-чату",
      "Бесплатные обновления навсегда",
    ],
  },
  {
    id: "phaser-advanced",
    name: 'Книга "Phaser 4: Продвинутые техники"',
    price: 2500,
    description: "Шейдеры, оптимизация, мультиплеер и архитектура.",
    image: "assets/images/phaser-advanced.jpg",
    features: [
      "Продвинутые шейдеры и эффекты",
      "Оптимизация производительности",
      "Сетевой код и мультиплеер",
      "Паттерны архитектуры",
    ],
  },
  {
    id: "game-design",
    name: 'Курс "Геймдизайн с нуля"',
    price: 4900,
    description: "Научитесь создавать увлекательные игровые механики.",
    image: "assets/images/game-design.jpg",
    features: [
      "20 видеоуроков",
      "Практические задания",
      "Разбор реальных игр",
      "Сертификат по окончании",
    ],
  },
];

/**
 * Получить товар по ID
 */
export function getProductById(id) {
  return PRODUCTS.find((p) => p.id === id) || null;
}

/**
 * Форматировать цену
 */
export function formatPrice(price) {
  return new Intl.NumberFormat("ru-RU").format(price) + " ₽";
}
