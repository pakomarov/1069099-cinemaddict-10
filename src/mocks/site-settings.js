import {SiteMenuSettings, SortSettings, FilmDetailsSettings} from '../const.js';

const setupSiteSettings = () => {
  return {
    siteMenuActiveFilter: SiteMenuSettings.ACTIVE_BY_DEFAULT,
    sortActiveButton: SortSettings.ACTIVE_BY_DEFAULT,
    indexOfOpenedFilm: FilmDetailsSettings.INDEX_OF_OPENED_BY_DEFAULT
  };
};

export {setupSiteSettings};
