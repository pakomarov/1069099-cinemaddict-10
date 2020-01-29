import {formatCatalogSize} from '../utils.js';

const setupBriefStatsTemplate = (catalogSize) => {
  return `<section class="footer__statistics">
  <p>${catalogSize} movies inside</p>
</section>`;
};

const createBriefStatsMarkup = (catalog) => {
  const catalogSize = formatCatalogSize(catalog.length);
  return setupBriefStatsTemplate(catalogSize);
};

export {createBriefStatsMarkup};
