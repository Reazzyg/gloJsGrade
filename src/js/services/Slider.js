import { Debouncer } from '../utils/Debouncer.js';

class Slider {
  constructor(classes, activeSlides = 3, resizeSlides = 1) {
    this.classes = classes;
    this.defaultActiveSlides = activeSlides;
    this.activeSlidesAmmount = activeSlides;
    this.resizeSlides = resizeSlides;
    this.debouncer = new Debouncer();
  }

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

  init() {
    this.getElements();
    this.addEventListeners();
    this.render();
  }

  addEventListeners() {
    this.$arrowNext.addEventListener('click', () => this.next());
    this.$arrowPrev.addEventListener('click', () => this.prev());

    window.addEventListener(
      'resize',
      this.debouncer.debounce(() => this.handleResize(), 300),
    );
  }

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

  render() {
    this.$sliderWrapper.innerHTML = '';
    this.activeSlides.forEach((slide) => {
      this.$sliderWrapper.appendChild(slide);
    });
  }

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
