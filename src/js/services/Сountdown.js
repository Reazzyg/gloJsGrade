export class CountdownTimer {
  constructor(section, targetDate) {
    this.$section = section;

    const targetDateAttr = targetDate;
    if (!targetDateAttr) {
      console.error('Отсутствует атрибут data-time для целевой даты.');
      return;
    }

    this.targetDate = targetDate;

    this.daysElem = this.$section.querySelector('.count_1 span');
    this.hoursElem = this.$section.querySelector('.count_2 span');
    this.minutesElem = this.$section.querySelector('.count_3 span');
    this.secondsElem = this.$section.querySelector('.count_4 span');

    this.countdownInterval = null;

    this.start();
  }

  updateCountdown() {
    const now = Date.now();
    const timeRemaining = this.targetDate - now;

    if (timeRemaining <= 0) {
      clearInterval(this.countdownInterval);
      this.daysElem.textContent = '0';
      this.hoursElem.textContent = '0';
      this.minutesElem.textContent = '0';
      this.secondsElem.textContent = '0';
      return;
    }

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor(
      (timeRemaining % (1000 * 60 * 60)) / (1000 * 60),
    );
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    this.daysElem.textContent = this.addZero(days);
    this.hoursElem.textContent = this.addZero(hours);
    this.minutesElem.textContent = this.addZero(minutes);
    this.secondsElem.textContent = this.addZero(seconds);
  }

  addZero(value) {
    return value < 10 ? '0' + value : value;
  }

  start() {
    this.updateCountdown();
    this.countdownInterval = setInterval(() => this.updateCountdown(), 1000);
  }
}

export const initCountdownTimer = function () {
  document.querySelectorAll('.countdown')?.forEach((el) => {
    const targetDate = Date.now() + 1000 * 60 * 60 * 24 * 3;
    new CountdownTimer(el, targetDate);
  });
};
