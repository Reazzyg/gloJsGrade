export default class Validation {
  constructor(form) {
    this.$form = form;
  }

  init() {
    this.getElements();
    this.addEventListeners();
  }

  getElements() {
    this.$inputs = this.$form.querySelectorAll('input:not([type="hidden"])');
  }

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

  validateText(input) {
    input.value = input.value.replace(/[^a-zA-Zа-яА-ЯёЁ\s-]/g, '');
  }

  validatePhone(input) {
    input.value = input.value.replace(/[^+0-9()\-\s]/g, '').slice(0, 16);
  }

  checkIfEmpty(input) {
    return input.value.trim() === '';
  }

  send() {
    const formData = Object.fromEntries(
      Array.from(this.$inputs).map((input) => [
        input.getAttribute('name'),
        input.value,
      ]),
    );
    if (document.querySelector('#calc-total')?.value) {
      formData['calc-total'] = document.querySelector('#calc-total')?.value;
    }

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

  showMessage(text, color) {
    this.$form.querySelectorAll('.form-message')?.forEach((el) => el.remove());
    const message = document.createElement('span');
    message.classList.add('form-message');
    message.style.color = color;
    message.textContent = text;
    this.$form.append(message);

    setTimeout(() => {
      message.remove();
    }, 2000);
  }
}

export function initValidation() {
  document.querySelectorAll('form')?.forEach(($form) => {
    if (!$form.closest('.box-modal')) {
      const validator = new Validation($form);
      validator.init();
    }
  });
}
