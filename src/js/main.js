import smoothScroll from './services/smoothScroll';
import { initValidation } from './services/validation';
import modals from './services/modal';
import initSliders from './services/Slider';
import { initCountdownTimer } from './services/Сountdown';
import scaleImages from './services/scaleImages';

document.addEventListener('DOMContentLoaded', () => {
  smoothScroll();
  initValidation();
  modals();
  initSliders();
  initCountdownTimer();
  scaleImages();
});
