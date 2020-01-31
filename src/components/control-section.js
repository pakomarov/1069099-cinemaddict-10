import {joinMapped} from '../utils';

const setupControlTemplate = (title, text, checkedAttribute) => {
  return `<input type="checkbox" class="film-details__control-input visually-hidden" id="${title}" name="${title}" ${checkedAttribute}>
  <label for="${title}" class="film-details__control-label film-details__control-label--${title}">${text}</label>`;
};

const createCotrolMarkup = ({title, text, checkedAttribute}) => {
  return setupControlTemplate(title, text, checkedAttribute);
};

const setupControlSectionTemplate = (controlsMarkup) => {
  return `<section class="film-details__controls">
    ${controlsMarkup}
  </section>`;
};

const createControlsMarkup = (controls) => {
  const controlsMarkup = joinMapped(controls, createCotrolMarkup, `\n`);
  return setupControlSectionTemplate(controlsMarkup);
};

export {createControlsMarkup};
