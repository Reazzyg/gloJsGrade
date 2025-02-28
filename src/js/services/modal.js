const modals = () => {
  const modals = document.querySelectorAll('.fancyboxModal');
  const overlay = document.querySelector('.overlay');

  modals.forEach((modal) => {
    modal.addEventListener('click', (e) => {
      e.preventDefault();
      const target = e.target.closest('.fancyboxModal').getAttribute('href');
      const modalWindow = document.querySelector(target);
      const close = document.createElement('div');

      close.classList.add('modal__close');
      close.innerHTML = 'x';

      if (!modalWindow.querySelector('.modal__close')) {
        modalWindow.appendChild(close);
      }

      modalWindow.style.display = 'block';
      overlay.style.display = 'block';

      document.body.addEventListener('click', (e) => {
        if (
          e.target === overlay ||
          e.target === modalWindow.querySelector('.modal__close')
        ) {
          modalWindow.style.display = 'none';
          overlay.style.display = 'none';
        }
      });
    });
  });
};

export default modals;
