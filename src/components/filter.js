import {SiteMenuSettings} from '../const.js';

const setupCountTemplate = (count) => {
  return ` <span class="main-navigation__item-count">${count}</span>`;
};

const createCountMarkup = (count) => {
  return count === null ? `` : setupCountTemplate(count);
};

const setupFilterTemplate = (link, activeClass, text, countMarkup) => {
  return `<a href="${link}" class="main-navigation__item ${activeClass}">${text}${countMarkup}</a>`;
};

const createFilterMarkup = ({title, isActive, count}) => {
  const link = `#${title.toLowerCase()}`;
  const activeClass = isActive ? SiteMenuSettings.CLASS_ACTIVE : SiteMenuSettings.CLASS_NON_ACTIVE;
  const countMarkup = createCountMarkup(count);
  return setupFilterTemplate(link, activeClass, title, countMarkup);
};

export {createFilterMarkup};
