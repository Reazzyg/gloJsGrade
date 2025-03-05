const calculator = () => {
  const type = document.querySelector('#calc-type');
  const material = document.querySelector('#calc-type-material');
  const square = document.querySelector('#calc-input');
  const res = document.querySelector('#calc-total');

  document.querySelector('#calc')?.addEventListener('input', (e) => {
    const typeValue = +type.options[type.selectedIndex].value;
    const materialValue = material.value !== '--' ? +material.value : 1;
    const squareValue = +square.value;

    if (typeValue && squareValue) {
      res.value = Math.ceil(typeValue * squareValue * materialValue);
    }
  });
};

export default calculator;
