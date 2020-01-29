import {joinMapped, formatReleaseDate, formatRuntime} from '../utils';

const getGenresTitle = (genres) => genres.length < 2 ? `Genre` : `Genres`;

const setupGenreTemplate = (genre) => {
  return `<span class="film-details__genre">${genre}</span>`;
};

const createGenreMarkup = (genre) => {
  return setupGenreTemplate(genre);
};

const getGenresInfo = (genres) => {
  return joinMapped(genres, createGenreMarkup, `\n`);
};

const getTableData = ({
  filmInfo: {
    director,
    writers,
    actors,
    release: {
      date: releaseDate,
      releaseCountry
    },
    runtime,
    genre: genres
  }
}) => {
  return [
    {title: `Director`, info: director},
    {title: `Writers`, info: writers.join(`, `)},
    {title: `Actors`, info: actors.join(`, `)},
    {title: `Release Date`, info: formatReleaseDate(new Date(releaseDate))},
    {title: `Runtime`, info: formatRuntime(runtime)},
    {title: `Country`, info: releaseCountry},
    {title: getGenresTitle(genres), info: getGenresInfo(genres)}
  ];
};

const setupTableRowTemplate = (title, info) => {
  return `<tr class="film-details__row">
    <td class="film-details__term">${title}</td>
    <td class="film-details__cell">${info}</td>
  </tr>`;
};

const createTableRowMarkup = ({title, info}) => {
  return setupTableRowTemplate(title, info);
};

const setupInfoTableTemplate = (tableRowsMarkup) => {
  return `<table class="film-details__table">
    ${tableRowsMarkup}
  </table>`;
};

const createInfoTableMarkup = (film) => {
  const tableData = getTableData(film);
  const tableRowsMarkup = joinMapped(tableData, createTableRowMarkup, `\n`);
  return setupInfoTableTemplate(tableRowsMarkup);
};

export {createInfoTableMarkup};
