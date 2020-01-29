const PROFILE_RANKS = [
  {borderCount: 0, rank: ``},
  {borderCount: 10, rank: `Novice`},
  {borderCount: 20, rank: `Fan`},
  {borderCount: Infinity, rank: `Movie Buff`},
];

const SiteMenuSettings = {
  FILTER_TITLES: [
    `All movies`,
    `Watchlist`,
    `History`,
    `Favorites`
  ],
  ACTIVE_BY_DEFAULT: `All movies`,
  CLASS_ACTIVE: `main-navigation__item--active`,
  CLASS_NON_ACTIVE: ``
};

const SortSettings = {
  BUTTONS_TITLES: [
    `default`,
    `date`,
    `rating`
  ],
  ACTIVE_BY_DEFAULT: `default`,
  CLASS_ACTIVE: `sort__button--active`,
  CLASS_NON_ACTIVE: ``
};

const FilmSettings = {
  DESCRIPTION_MAX_LENGTH: 140,
  CLASS_CONTROL_ACTIVE: `film-card__controls-item--active`,
  CLASS_CONTROL_NON_ACTIVE: ``
};

const SelectionSettings = {
  SELECTION_TITLES: [
    `Top rated`,
    `Most commented`
  ],
  COUNT: 2
};

const FilmDetailsSettings = {
  INDEX_OF_OPENED_BY_DEFAULT: 0,
  EMOTIONS: [
    `smile`,
    `sleeping`,
    `puke`,
    `angry`
  ],
  ATTRIBUTE_CHECKED: `checked`,
  ATTRIBUTE_NON_CHECKED: ``
};

export {
  PROFILE_RANKS,
  SiteMenuSettings,
  SortSettings,
  FilmSettings,
  SelectionSettings,
  FilmDetailsSettings
};
