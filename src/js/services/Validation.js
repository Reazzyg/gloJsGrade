/**
 * Класс для валидации и отправки формы.
 */
export default class Validation {
  /**
   * @param {HTMLFormElement} form - Форма, к которой применяется валидация.
   */
  constructor(form) {
    this.$form = form;
  }

  /**
   * Инициализация валидации: получение элементов формы и добавление слушателей событий.
   */
  init() {
    this.getElements();
    this.addEventListeners();
  }

  /**
   * Получает все необходимые элементы формы.
   */
  getElements() {
    this.$inputs = this.$form.querySelectorAll('input:not([type="hidden"])');
  }

  /**
   * Добавляет обработчики событий на отправку формы и ввод данных.
   */
  addEventListeners() {
    this.$form?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.$form
        .querySelectorAll('.input__error, .form-message')
        ?.forEach((el) => el.remove());

      let isFormValid = true;

      this.$inputs.forEach((input) => {
        if (this.checkIfEmpty(input)) {
          isFormValid = false;
          const error = document.createElement('span');
          error.classList.add('input__error');
          error.style.color = 'red';
          error.textContent = 'Заполните это поле';
          input.after(error);
        }
      });

      if (isFormValid) {
        this.send();
      }
    });

    this.$inputs?.forEach((input) =>
      input.addEventListener('input', (e) => this.validateInputs(e)),
    );
  }

  /**
   * Вызывает соответствующую валидацию для определенного типа поля.
   * @param {Event} event - Событие ввода в поле формы.
   */
  validateInputs(event) {
    let inputType = event.target.getAttribute('name');
    switch (inputType) {
      case 'phone':
        this.validatePhone(event.target);
        break;
      case 'fio':
        this.validateText(event.target);
        break;
    }
  }

  /**
   * Валидирует текстовые поля (ФИО).
   * Разрешены только буквы, пробелы и дефис.
   * @param {HTMLInputElement} input - Поле ввода.
   */
  validateText(input) {
    input.value = input.value.replace(/[^a-zA-Zа-яА-ЯёЁ\s-]/g, '');
  }

  /**
   * Валидирует телефонный номер.
   * Разрешены только цифры, `+`, `()`, `-`, пробелы. Ограничение 16 символов.
   * @param {HTMLInputElement} input - Поле ввода телефона.
   */
  validatePhone(input) {
    input.value = input.value.replace(/[^+0-9()\-\s]/g, '').slice(0, 16);
  }

  /**
   * Проверяет, является ли поле пустым.
   * @param {HTMLInputElement} input - Поле ввода.
   * @returns {boolean} `true`, если поле пустое, иначе `false`.
   */
  checkIfEmpty(input) {
    return input.value.trim() === '';
  }

  /**
   * Собирает данные формы и отправляет их на сервер.
   */
  send() {
    const formData = Object.fromEntries(
      Array.from(this.$inputs).map((input) => [
        input.getAttribute('name'),
        input.value,
      ]),
    );

    fetch('/send.php', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Ошибка отправки');
        }
        return res.json();
      })
      .then(() => {
        this.showMessage('Форма успешно отправлена', 'green');
      })
      .catch((err) => {
        this.showMessage(err.message, 'red');
      });
  }

  /**
   * Отображает сообщение об ошибке или успешной отправке.
   * @param {string} text - Текст сообщения.
   * @param {string} color - Цвет сообщения (например, 'red' или 'green').
   */
  showMessage(text, color) {
    this.$form.querySelectorAll('.form-message')?.forEach((el) => el.remove());
    const message = document.createElement('span');
    message.classList.add('form-message');
    message.style.color = color;
    message.textContent = text;
    this.$form.append(message);
  }
}

/**
 * Инициализирует валидацию для всех форм на странице.
 */
export function initValidation() {
  document.querySelectorAll('form')?.forEach(($form) => {
    if (!$form.closest('.box-modal')) {
      const validator = new Validation($form);
      validator.init();
    }
  });
}
