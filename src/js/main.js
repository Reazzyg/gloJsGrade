import smoothScroll from './services/smoothScroll';
import modals from './services/modal';
import initSliders from './services/Slider';
import { initCountdownTimer } from './services/Сountdown';
import scaleImages from './services/scaleImages';

document.addEventListener('DOMContentLoaded', () => {
  smoothScroll();
  modals();
  initSliders();
  initCountdownTimer();
  scaleImages();
});
