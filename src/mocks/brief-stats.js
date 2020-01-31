import {formatNumberWithDelimeters} from '../utils.js';

const getCatalogSize = (catalog) => formatNumberWithDelimeters(catalog.length, ` `);

export {getCatalogSize};
