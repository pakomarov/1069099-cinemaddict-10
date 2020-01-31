const PROFILE_RANKS = [
  {borderCount: 0, title: ``},
  {borderCount: 10, title: `Novice`},
  {borderCount: 20, title: `Fan`},
  {borderCount: Infinity, title: `Movie Buff`},
];

const SiteMenuSettings = {
  FILTER_TITLES: [
    `All movies`,
    `Watchlist`,
    `History`,
    `Favorites`
  ],
  CLASS_ACTIVE: `main-navigation__item--active`
};

const SortSettings = {
  BUTTONS_TITLES: [
    `default`,
    `date`,
    `rating`
  ],
  CLASS_ACTIVE: `sort__button--active`
};

const FilmSettings = {
  DESCRIPTION_MAX_LENGTH: 140,
  CLASS_CONTROL_ACTIVE: `film-card__controls-item--active`
};

const SelectionSettings = {
  SELECTION_TITLES: [
    `Top rated`,
    `Most commented`
  ],
  COUNT: 2
};

const CONTROLS = [
  {title: `watchlist`, text: `Add to watchlist`},
  {title: `watched`, text: `Already watched`},
  {title: `favorite`, text: `Add to favorite`}
];

const RatingScoreSettings = {
  SCORE_MIN: 1,
  SCORE_MAX: 9
};

const EMOTIONS = [
  `smile`,
  `sleeping`,
  `puke`,
  `angry`
];

const ShowSettings = {
  FILM_COUNT_ON_START: 5,
  FILM_COUNT_BY_BUTTON: 5
};

export {
  PROFILE_RANKS,
  SiteMenuSettings,
  SortSettings,
  FilmSettings,
  SelectionSettings,
  CONTROLS,
  RatingScoreSettings,
  EMOTIONS,
  ShowSettings
};
