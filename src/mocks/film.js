import {generateComments} from './comment.js';
import {
  getRandomBetween,
  getRandomArrayEntry,
  getRandomSubsetOfArray,
  getRandomPastDate,
  flipCoin
} from '../utils.js';
import {RatingScoreSettings} from '../const.js';

const TITLES = [
  `Побег из Шоушенка`,
  `Зелёная миля`,
  `Форрест Гамп`,
  `Список Шиндлера`,
  `1 + 1`,
  `Начало`,
  `Леон`,
  `Король Лев`,
  `Бойцовской клуб`,
  `Иван Васильевич меняет профессию`,
  `Жизнь прекрасна`,
  `Достучаться до небес`,
  `Крестный отец`,
  `Криминальное чтиво`,
  `Престиж`
];
const POSTERS = [
  `./images/posters/made-for-each-other.png`,
  `./images/posters/popeye-meets-sinbad.png`,
  `./images/posters/sagebrush-trail.jpg`,
  `./images/posters/santa-claus-conquers-the-martians.jpg`,
  `./images/posters/the-dance-of-life.jpg`,
  `./images/posters/the-great-flamarion.jpg`,
  `./images/posters/the-man-with-the-golden-arm.jpg`
];
const DIRECTORS = [
  `Steven Spielberg`,
  `Martin Scorsese`,
  `Alfred Hitchcock`,
  `Stanley Kubrick`,
  `Quentin Tarantino`,
  `Orson Welles`
];
const WRITERS = [
  `Ingmar Bergman`,
  `Stanley Kubrick`,
  `Paul Thomas Anderson`,
  `Billy Wilder`,
  `Woody Allen`
];
const ACTORS = [
  `Tom Hanks`,
  `Jack Nicholson`,
  `Robert DeNiro`,
  `Johnny Depp`,
  `Al Pacino`,
  `Leonardo Di Caprio`,
  `Marlon Brando`,
  `Morgan Freeman`,
  `Daniel Day Lewis`
];
const COUNTRIES = [
  `Russia`,
  `Wakaliwood`,
  `Mutishi`,
  `Seven Kingdoms`,
  `Mordor`,
  `Gondor`
];
const GENRES = [
  `Comedy`,
  `Drama`,
  `Waste of time`,
  `Thriller`,
  `Fantasy`
];
const AgeRating = {
  MIN: 0,
  MAX: 18
};
const Runtime = {
  MIN: 1,
  MAX: 300
};
const MOCKUP_SENTENCES = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];
const COMMENTS_COUNT_MAX = 100;

const generateTitle = () => getRandomArrayEntry(TITLES);

const generateTotalRating = () => Math.round(Math.random() * 100) / 10;

const generatePoster = () => getRandomArrayEntry(POSTERS);

const generateAgeRating = () => getRandomBetween(AgeRating.MIN, AgeRating.MAX);

const generateDirector = () => getRandomArrayEntry(DIRECTORS);

const generateWriters = () => getRandomSubsetOfArray(WRITERS);

const generateActors = () => getRandomSubsetOfArray(ACTORS);

const generateReleaseDate = () => getRandomPastDate().getTime();

const generateReleaseCountry = () => getRandomArrayEntry(COUNTRIES);

const generateRuntime = () => getRandomBetween(Runtime.MIN, Runtime.MAX);

const generateGenre = () => getRandomSubsetOfArray(GENRES);

const generateDescription = () => getRandomSubsetOfArray(MOCKUP_SENTENCES)
  .join(` `);

const generatePersonalRating = () => getRandomBetween(RatingScoreSettings.SCORE_MIN, RatingScoreSettings.SCORE_MAX);

const generateWatchlist = () => flipCoin();

const generateAlreadyWatched = () => flipCoin();

const generateWatchingDate = (alreadyWatched) => alreadyWatched ? getRandomPastDate().toISOString() : ``;

const generateFavorite = () => flipCoin();

const generateFilm = () => {
  const comments = generateComments(getRandomBetween(0, COMMENTS_COUNT_MAX));
  const alreadyWatched = generateAlreadyWatched();
  return {
    comments,
    filmInfo: {
      title: generateTitle(),
      alternativeTitle: generateTitle(),
      totalRating: generateTotalRating(),
      poster: generatePoster(),
      ageRating: generateAgeRating(),
      director: generateDirector(),
      writers: generateWriters(),
      actors: generateActors(),
      release: {
        date: generateReleaseDate(),
        releaseCountry: generateReleaseCountry()
      },
      runtime: generateRuntime(),
      genre: generateGenre(),
      description: generateDescription()
    },
    userDetails: {
      personalRating: generatePersonalRating(),
      watchlist: generateWatchlist(),
      alreadyWatched,
      watchingDate: generateWatchingDate(alreadyWatched),
      favorite: generateFavorite()
    }
  };
};

const generateFilms = (count) => {
  const films = [];
  for (let i = 0; i < count; i++) {
    films.push(generateFilm());
  }
  return films;
};

export {generateFilm, generateFilms};
