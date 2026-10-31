// js/footer.js

import { CONFIG } from "./config.js";

/**
 * Рендерит подвал на странице
 * Вызывать в каждой странице после загрузки DOM
 */
export function renderFooter() {
  const footerContainer = document.getElementById("footer-placeholder");
  if (!footerContainer) return;

  // Получаем текущий год для копирайта
  const currentYear = new Date().getFullYear();

  footerContainer.innerHTML = `
    <footer class="site-footer">
      <div class="container footer-content">
        <div class="footer-section">
          <h4>${CONFIG.SITE.name}</h4>
          <p>${CONFIG.SITE.description}</p>
          <div class="social-links">
            <a href="${CONFIG.SITE.social.telegram}" class="social-link" aria-label="Telegram"><i class="ph ph-telegram-logo"></i></a>
          </div>
        </div>
        
        <div class="footer-section">
          <h4>Навигация</h4>
          <ul>
            <li><a href="index.html">Главная</a></li>
            <li><a href="catalog.html">Каталог</a></li>
            <li><a href="cart.html">Корзина</a></li>
            <li><a href="offer.html">Оферта</a></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h4>Помощь</h4>
          <ul>
            <li><a href="#delivery">Доставка и оплата</a></li>
            <li><a href="#care">Уход за свечами</a></li>
            <li><a href="#faq">Частые вопросы</a></li>
            <li><a href="/index.html#advantages">О нас</a></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h4>Контакты</h4>
          <ul>
            <li>📧 <a href="mailto:${CONFIG.SITE.contacts.email}">${CONFIG.SITE.contacts.email}</a></li>
            <li>📱 <a href="tel:${CONFIG.SITE.contacts.phone}">${CONFIG.SITE.contacts.phoneFormatted}</a></li>
            <li>🕐 ${CONFIG.SITE.contacts.workHours}</li>
          </ul>
        </div>
      </div>
      
      <div class="footer-bottom">
        <div class="container">
          <p>© ${currentYear} ${CONFIG.SITE.name}. Все права защищены.</p>
          <p class="footer-made-with">Сделано с 🕯️ и любовью</p>
        </div>
      </div>
    </footer>
  `;
}
