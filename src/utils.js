const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
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

const formatRuntime = (totalMinutes) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
};

const THREE_DIGITS_REGEXP = /\B(?=(\d{3})+(?!\d))/g;
const formatNumberWithDelimeters = (number, delimeter) => number.toString().replace(THREE_DIGITS_REGEXP, delimeter);

const getMonthName = (date) => new Intl.DateTimeFormat(`en-US`, {month: `long`}).format(date);

const formatReleaseDate = (date) => {
  const day = date.getDate();
  const month = getMonthName(date);
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};

const createRange = (min, max) => {
  const range = [];
  for (let i = min; i <= max; i++) {
    range.push(i);
  }
  return range;
};

const castMonthFormat = (value) => String(value).padStart(2, `0`);
const castDayFormat = (value) => String(value).padStart(2, `0`);
const castTimeFormat = (value) => String(value).padStart(2, `0`);

const formatCommentDate = (date) => {
  const year = date.getFullYear();
  const month = castMonthFormat(date.getMonth() + 1);
  const day = castDayFormat(date.getDate());
  const hours = castTimeFormat(date.getHours());
  const minutes = castTimeFormat(date.getMinutes());

  return `${year}/${month}/${day} ${hours}:${minutes}`;
};

export {
  RenderPosition,
  createElement,
  render,
  getRandomBetween,
  getRandomArrayEntry,
  getRandomPastDate,
  getRandomSubsetOfArray,
  flipCoin,
  joinMapped,
  formatRuntime,
  formatReleaseDate,
  formatNumberWithDelimeters,
  createRange,
  formatCommentDate
};
