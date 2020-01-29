import {createCatalogMarkup} from './catalog.js';
import {getSelections} from '../mocks/selections.js';
import {joinMapped} from '../utils.js';
import {createSelectionMarkup} from './selection.js';

const setupContentTemplate = (catalogMarkup, selectionsMarkup) => {
  return `<section class="films">
    ${catalogMarkup}
    ${selectionsMarkup}
  </section>`;
};

const createContentMarkup = (catalog) => {
  const catalogMarkup = createCatalogMarkup(catalog);

  const selections = getSelections(catalog);
  const selectionsMarkup = joinMapped(selections, createSelectionMarkup, `\n`);

  return setupContentTemplate(catalogMarkup, selectionsMarkup);
};

export {createContentMarkup};
