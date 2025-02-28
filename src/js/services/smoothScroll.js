const smoothScroll = () => {
  document.querySelector(' .smooth-scroll').addEventListener('click', () => {
    document.body.scrollIntoView({
      behavior: 'smooth',
    });
  });
};

export default smoothScroll;
