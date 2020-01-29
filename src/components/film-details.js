import {createInfoSectionMarkup} from './info-section.js';
import {createControlSectionMarkup} from './control-section.js';
import {createRatingSectionMarkup} from './rating-section.js';
import {createCommentSectionMarkup} from './comment-section.js';

const setupFilmDetailsTemplate = (infoSectionMarkup, controlSectionMarkup, ratingSectionMarkup, commentSectionMarkup) => {
  return `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="form-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        ${infoSectionMarkup}

        ${controlSectionMarkup}
      </div>

      ${ratingSectionMarkup}

      ${commentSectionMarkup}
    </form>
  </section>`;
};

const createFilmDetailsMarkup = (film) => {
  const infoSectionMarkup = createInfoSectionMarkup(film);
  const controlSectionMarkup = createControlSectionMarkup(film);
  const ratingSectionMarkup = createRatingSectionMarkup(film);
  const commentSectionMarkup = createCommentSectionMarkup(film);
  return setupFilmDetailsTemplate(infoSectionMarkup, controlSectionMarkup, ratingSectionMarkup, commentSectionMarkup);
};

export {createFilmDetailsMarkup};
