/**
 * Класс для создания слайдера с возможностью изменения количества активных слайдов при ресайзе.
 */
import { Debouncer } from '../utils/Debouncer.js';

class Slider {
  /**
   * @param {Object} classes - Классы для элементов слайдера.
   * @param {string} classes.slider - Основной контейнер слайдера.
   * @param {string} classes.sliderWrapper - Обертка для слайдов.
   * @param {string} classes.sliderItems - Класс элементов-слайдов.
   * @param {string} classes.arrowNext - Класс кнопки "вперед".
   * @param {string} classes.arrowPrev - Класс кнопки "назад".
   * @param {number} [activeSlides=3] - Количество активных слайдов по умолчанию.
   * @param {number} [resizeSlides=1] - Количество активных слайдов при уменьшении экрана.
   */
  constructor(classes, activeSlides = 3, resizeSlides = 1) {
    this.classes = classes;
    this.defaultActiveSlides = activeSlides;
    this.activeSlidesAmmount = activeSlides;
    this.resizeSlides = resizeSlides;
    this.debouncer = new Debouncer();
  }

  /**
   * Получает и сохраняет DOM-элементы слайдера.
   */
  getElements() {
    this.$slider = document.querySelector(this.classes.slider);
    this.$sliderWrapper = document.querySelector(this.classes.sliderWrapper);
    this.$sliderItems = this.$sliderWrapper.querySelectorAll(
      this.classes.sliderItems,
    );
    this.$arrowNext = document.querySelector(this.classes.arrowNext);
    this.$arrowPrev = document.querySelector(this.classes.arrowPrev);
    this.sliderItems = Array.from(this.$sliderItems);
    this.activeSlides = this.sliderItems.slice(0, this.activeSlidesAmmount);
  }

  /**
   * Инициализирует слайдер: получает элементы, добавляет обработчики событий и рендерит слайды.
   */
  init() {
    this.getElements();
    this.addEventListeners();
    this.render();
  }

  /**
   * Добавляет обработчики событий для стрелок и ресайза окна.
   */
  addEventListeners() {
    this.$arrowNext.addEventListener('click', () => this.next());
    this.$arrowPrev.addEventListener('click', () => this.prev());

    window.addEventListener(
      'resize',
      this.debouncer.debounce(() => this.handleResize(), 300),
    );
  }

  /**
   * Обрабатывает изменение размера экрана, изменяя количество активных слайдов.
   */
  handleResize() {
    if (window.innerWidth < 576) {
      this.$sliderWrapper.style.justifyContent = 'center';
      this.activeSlidesAmmount = this.resizeSlides;
    } else {
      this.$sliderWrapper.style.justifyContent = 'flex-start';
      this.activeSlidesAmmount = this.defaultActiveSlides;
    }
    this.activeSlides = this.sliderItems.slice(0, this.activeSlidesAmmount);
    this.render();
  }

  /**
   * Рендерит текущие активные слайды.
   */
  render() {
    this.$sliderWrapper.innerHTML = '';
    this.activeSlides.forEach((slide) => {
      this.$sliderWrapper.appendChild(slide);
    });
  }

  /**
   * Переключает слайдер вперед.
   */
  next() {
    if (this.activeSlides.length < this.activeSlidesAmmount) return;

    let lastSlideIndex = this.sliderItems.indexOf(
      this.activeSlides[this.activeSlides.length - 1],
    );
    let nextSlideIndex = (lastSlideIndex + 1) % this.sliderItems.length;

    this.activeSlides.shift();
    this.activeSlides.push(this.sliderItems[nextSlideIndex]);
    this.render();
  }

  /**
   * Переключает слайдер назад.
   */
  prev() {
    if (this.activeSlides.length < this.activeSlidesAmmount) return;

    let firstSlideIndex = this.sliderItems.indexOf(this.activeSlides[0]);
    let prevSlideIndex =
      (firstSlideIndex - 1 + this.sliderItems.length) % this.sliderItems.length;

    this.activeSlides.pop();
    this.activeSlides.unshift(this.sliderItems[prevSlideIndex]);
    this.render();
  }
}

/**
 * Инициализирует слайдеры на странице.
 */
const initSliders = () => {
  const benefitsSlider = new Slider(
    {
      slider: '.benefits-inner',
      sliderWrapper: '.benefits-wrap',
      sliderItems: '.benefits__item',
      arrowNext: '.benefits__arrow--right',
      arrowPrev: '.benefits__arrow--left',
    },
    3,
    1,
  );

  const servicesSlider = new Slider(
    {
      slider: '#services .row',
      sliderWrapper: '#services .row',
      sliderItems: '.col-md-12.col-lg-6',
      arrowNext: '.services__arrow--right',
      arrowPrev: '.services__arrow--left',
    },
    2,
    1,
  );

  servicesSlider.init();
  benefitsSlider.init();
};

export default initSliders;
