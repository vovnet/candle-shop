/**
 * Модуль карусели отзывов
 */

// Данные отзывов (потом можно вынести в Google Sheets по аналогии с каталогом)
const TESTIMONIALS = [
  {
    name: "Анна К.",
    rating: 5,
    text: 'Свеча "Earl Grey" стала моим вечерним ритуалом. Аромат невероятно тонкий, не химозный — настоящий бергамот. Горит ровно, хватает надолго.',
  },
  {
    name: "Михаил Д.",
    rating: 5,
    text: "Заказывал набор в подарок жене на годовщину. Упаковка выше всяких похвал — даже дарить приятно. Жена в восторге!",
  },
  {
    name: "Екатерина С.",
    rating: 5,
    text: "Перепробовала кучу свечей в разных магазинах, но эти — особенные. Чувствуется, что сделано с душой. Теперь только у вас.",
  },
  {
    name: "Ольга В.",
    rating: 4,
    text: "Очень уютные свечи, создают атмосферу. Единственное — хотелось бы больше вариантов ароматов. Но качество на высоте!",
  },
  {
    name: "Дмитрий П.",
    rating: 5,
    text: "Брал свечу в керамической чашке — после того как догорит, использую чашку для чая. Гениальная идея!",
  },
  {
    name: "Ирина М.",
    rating: 5,
    text: "Заказываю уже третий раз. Доставка быстрая, упаковка аккуратная, а ароматы — просто волшебные. Особенно жасмин.",
  },
];

let currentSlide = 0;
let cardsPerView = 3;

/**
 * Инициализация карусели
 */
export function initTestimonials() {
  const track = document.getElementById("testimonials-track");
  const dotsContainer = document.getElementById("carousel-dots");
  const prevBtn = document.querySelector(".carousel-btn-prev");
  const nextBtn = document.querySelector(".carousel-btn-next");

  if (!track || !dotsContainer) return;

  // Рендерим карточки
  track.innerHTML = TESTIMONIALS.map(renderTestimonialCard).join("");

  // Рендерим точки
  renderDots(dotsContainer);

  // Обработчики
  prevBtn.addEventListener("click", () => slide(-1));
  nextBtn.addEventListener("click", () => slide(1));

  // Обработка изменения размера окна
  window.addEventListener("resize", handleResize);

  // Автопрокрутка (опционально)
  let autoplayInterval = setInterval(() => slide(1), 6000);

  // Останавливаем автопрокрутку при наведении
  const carousel = document.querySelector(".testimonials-carousel");
  carousel.addEventListener("mouseenter", () => clearInterval(autoplayInterval));
  carousel.addEventListener("mouseleave", () => {
    autoplayInterval = setInterval(() => slide(1), 6000);
  });

  // Первоначальная настройка
  handleResize();
  updateCarousel();
}

/**
 * Рендер одной карточки отзыва
 */
function renderTestimonialCard(testimonial) {
  const stars = "★".repeat(testimonial.rating) + "☆".repeat(5 - testimonial.rating);
  const initials = testimonial.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return `
    <article class="testimonial-card">
      <div class="testimonial-header">
        <div class="testimonial-avatar">${initials}</div>
        <div class="testimonial-info">
          <div class="testimonial-name">${testimonial.name}</div>
          <div class="testimonial-stars">${stars}</div>
        </div>
      </div>
      <p class="testimonial-text">${testimonial.text}</p>
    </article>
  `;
}

/**
 * Рендер точек-индикаторов
 */
function renderDots(container) {
  const totalDots = Math.ceil(TESTIMONIALS.length / cardsPerView);
  container.innerHTML = "";

  for (let i = 0; i < totalDots; i++) {
    const dot = document.createElement("button");
    dot.className = "carousel-dot" + (i === 0 ? " active" : "");
    dot.setAttribute(
      "aria-label",
      `Перейти к отзывам ${i * cardsPerView + 1}-${Math.min((i + 1) * cardsPerView, TESTIMONIALS.length)}`,
    );
    dot.addEventListener("click", () => goToSlide(i));
    container.appendChild(dot);
  }
}

/**
 * Определяет количество карточек в зависимости от ширины экрана
 */
function getCardsPerView() {
  const width = window.innerWidth;
  if (width <= 600) return 1;
  if (width <= 900) return 2;
  return 3;
}

/**
 * Обрабатывает изменение размера окна
 */
function handleResize() {
  const newCardsPerView = getCardsPerView();
  if (newCardsPerView !== cardsPerView) {
    cardsPerView = newCardsPerView;
    currentSlide = 0;
    renderDots(document.getElementById("carousel-dots"));
    updateCarousel();
  }
}

/**
 * Переключает слайды на заданное количество шагов
 */
function slide(direction) {
  const totalSlides = Math.ceil(TESTIMONIALS.length / cardsPerView);
  currentSlide += direction;

  // Циклическая прокрутка
  if (currentSlide < 0) currentSlide = totalSlides - 1;
  if (currentSlide >= totalSlides) currentSlide = 0;

  updateCarousel();
}

/**
 * Переходит к конкретному слайду
 */
function goToSlide(index) {
  currentSlide = index;
  updateCarousel();
}

/**
 * Обновляет положение карусели и активные точки
 */
function updateCarousel() {
  const track = document.getElementById("testimonials-track");
  const dots = document.querySelectorAll(".carousel-dot");

  // Вычисляем смещение
  const cardWidth = track.children[0].offsetWidth;
  const gap = 24;
  const offset = currentSlide * cardsPerView * (cardWidth + gap);

  track.style.transform = `translateX(-${offset}px)`;

  // Обновляем точки
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSlide);
  });
}
