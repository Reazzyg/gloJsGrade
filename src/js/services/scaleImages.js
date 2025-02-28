const scaleImages = () => {
  const images = document.querySelectorAll('#documents .sertificate-document');
  const modal = document.createElement('div');
  const overlay = document.querySelector('.overlay');
  const close = document.createElement('div');

  modal.classList.add('box-modal', 'modal__images');

  close.classList.add('modal__close');
  close.innerHTML = 'x';

  images.forEach((img) => {
    img.addEventListener('click', (e) => {
      e.preventDefault();

      img = e.target.closest('.sertificate-document').querySelector('img');
      modal.innerHTML = img.outerHTML;
      modal.appendChild(close);

      document.body.appendChild(modal);
      modal.style.display = 'flex';
      overlay.style.display = 'block';

      document.body.addEventListener('click', (e) => {
        if (
          e.target === overlay ||
          e.target === modal.querySelector('.modal__close')
        ) {
          modal.style.display = 'none';
          overlay.style.display = 'none ';
        }
      });
    });
  });
};
export default scaleImages;
