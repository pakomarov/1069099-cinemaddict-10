import {formatNumberWithDelimeters} from '../utils.js';

const getCatalogSize = (films) => formatNumberWithDelimeters(films.length, ` `);

export {getCatalogSize};
