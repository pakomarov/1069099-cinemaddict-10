import {
  getRandomArrayEntry,
  getRandomPastDate
} from '../utils.js';
import {NewCommentSettings} from '../const.js';

const NAMES = [
  `Иван Иванович Иванов`,
  `John Doe`,
  `Jack Sparrow`,
  `Cool Guy`,
  `Сын маминой подруги`,
  `Вчерашний ты`
];
const COMMENT_MESSAGES = [
  `Interesting setting and a good cast`,
  `Booooooooooring`,
  `Very very old. Meh`,
  `Almost two hours? Seriously?`,
  `Жизнь за окном и та интереснее`,
  `Спецэфекты так себе`
];

const generateAuthor = () => getRandomArrayEntry(NAMES);

const generateCommentMessage = () => getRandomArrayEntry(COMMENT_MESSAGES);

const generateDate = () => getRandomPastDate();

const generateEmotion = () => getRandomArrayEntry(NewCommentSettings.EMOTIONS);

const generateComment = () => {
  return {
    author: generateAuthor(),
    comment: generateCommentMessage(),
    date: generateDate(),
    emotion: generateEmotion()
  };
};

const generateComments = (count) => {
  const comments = [];
  for (let i = 0; i < count; i++) {
    comments.push(generateComment());
  }
  return comments;
};

export {generateComments};
