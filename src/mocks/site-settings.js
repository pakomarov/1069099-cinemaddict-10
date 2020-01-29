import {SiteMenuSettings, SortSettings} from '../const.js';

const setupSiteSettings = () => {
  return {
    siteMenuActiveFilter: SiteMenuSettings.ACTIVE_BY_DEFAULT,
    sortActiveButton: SortSettings.ACTIVE_BY_DEFAULT
  };
};

export {setupSiteSettings};
