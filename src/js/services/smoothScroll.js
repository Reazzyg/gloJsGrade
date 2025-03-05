const smoothScroll = () => {
  const scrollButton = document.querySelector('.smooth-scroll');
  const section = document.querySelector('#offer');

  scrollButton.style.display = 'none';

  window.addEventListener('scroll', () => {
    if (window.scrollY > section.offsetHeight) {
      scrollButton.style.display = 'block';
    } else {
      scrollButton.style.display = 'none';
    }
  });

  scrollButton.addEventListener('click', () => {
    document.body.scrollIntoView({
      behavior: 'smooth',
    });
  });
};

export default smoothScroll;
