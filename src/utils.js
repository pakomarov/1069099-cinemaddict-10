const createTemplateElement = (template) => {
  const templateElement = document.createElement(`template`);
  templateElement.innerHTML = template;
  return templateElement;
};

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

// Добавление единицы необходимо, чтобы включить максимальное значение. Math.random() считает от 0 включительно до 1, не включая единицу
const getRandomBetween = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomArrayEntry = (array) => array[getRandomBetween(0, (array.length - 1))];

const getRandomPastDate = () => new Date(getRandomBetween(0, Date.now()));

export {
  createTemplateElement,
  render,
  getRandomArrayEntry,
  getRandomPastDate
};
