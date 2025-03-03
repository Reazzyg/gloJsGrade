/**
 * Класс CountdownTimer создает обратный отсчет до определенной даты и отображает оставшееся
 * время (дни, часы, минуты) в указанных HTML элементах. Целевая дата сохраняется в `localStorage`
 * для сохранения данных при обновлении страницы.
 */
export class CountdownTimer {
  /**
   * Создает экземпляр CountdownTimer.
   * @param {HTMLElement} section - HTML элемент, содержащий таймер.
   */
  constructor(section, targetDate) {
    this.$section = section;
    this;
    /**
     * Получаем целевую дату из атрибута `data-time`, установленного на секции.
     * @type {number} - Количество миллисекунд до целевой даты.
     */
    const targetDateAttr = targetDate;
    if (!targetDateAttr) {
      console.error('Отсутствует атрибут data-time для целевой даты.');
      return;
    }

    // const [day, month, year] = targetDateAttr.split('.').map(Number);
    // this.targetDate = new Date(year, month - 1, day).getTime();
    this.targetDate = targetDate;

    /**
     * Элементы для отображения оставшегося времени (дней, часов, минут).
     * @type {HTMLElement}
     */
    this.daysElem = this.$section.querySelector('.count_1 span');
    this.hoursElem = this.$section.querySelector('.count_2 span');
    this.minutesElem = this.$section.querySelector('.count_3 span');
    this.secondsElem = this.$section.querySelector('.count_4 span');
    /**
     * Идентификатор интервала для обновления таймера.
     * @type {number}
     */
    this.countdownInterval = null;

    // Запуск таймера
    this.start();
  }

  /**
   * Обновляет значения обратного отсчета и отображает оставшееся время в HTML элементах.
   * Если время истекло, таймер останавливается и показывает нули.
   */
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

    // Обновляем значения в HTML
    this.daysElem.textContent = this.addZero(days);
    this.hoursElem.textContent = this.addZero(hours);
    this.minutesElem.textContent = this.addZero(minutes);
    this.secondsElem.textContent = this.addZero(seconds);
  }
  /**
   * Добавляет ноль если число однозначное.
   */
  addZero(value) {
    return value < 10 ? '0' + value : value;
  }
  /**
   * Запускает таймер, устанавливая начальные значения и обновляя их каждую секунду.
   */
  start() {
    this.updateCountdown(); // Первоначальный вызов для отображения начальных значений
    this.countdownInterval = setInterval(() => this.updateCountdown(), 1000);
  }
}

/**
 * Инициализация обратного отсчета.
 * Проверяет наличие элемента таймера на странице и, если он присутствует, создает экземпляр CountdownTimer.
 */
export const initCountdownTimer = function () {
  document.querySelectorAll('.countdown')?.forEach((el) => {
    const targetDate = Date.now() + 1000 * 60 * 60 * 24 * 3;
    new CountdownTimer(el, targetDate);
  });
};
