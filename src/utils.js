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

const getShuffledArray = (array) => {
  const shuffledArray = array.slice();

  // Алгоритм: "The Durstenfeld Shuffle" (оптимизированная версия "Fisher–Yates shuffle")
  // Алгоритм работает с конца до начала для простоты расчёта индекса j. 0 < j < i если работать начиная с конца, или i < j < (array.length - 1) если работать с начала
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = getRandomBetween(0, i);
    [shuffledArray[j], shuffledArray[i]] = [shuffledArray[i], shuffledArray[j]];
  }

  return shuffledArray;
};

const getRandomSubsetOfArray = (array) => getShuffledArray(array)
  .slice(0, getRandomBetween(0, array.length));

const flipCoin = () => Math.random() > 0.5;

const joinMapped = (data, createMarkup, delimiter = ``) => data
  .map(createMarkup)
  .join(delimiter);

export {
  createTemplateElement,
  render,
  getRandomBetween,
  getRandomArrayEntry,
  getRandomPastDate,
  getRandomSubsetOfArray,
  flipCoin,
  joinMapped
};
