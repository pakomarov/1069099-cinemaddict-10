import {createCommentsMarkup} from './comments.js';
import {createNewCommentMarkup} from './new-comment.js';

const setupCommentSectionTemplate = (commentCount, commentsMarkup, newCommentMarkup) => {
  return `<div class="form-details__bottom-container">
    <section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentCount}</span></h3>
      ${commentsMarkup}

      ${newCommentMarkup}
    </section>
  </div>`;
};

const createCommentSectionMarkup = ({comments}) => {
  const commentCount = comments.length;
  const commentsMarkup = createCommentsMarkup(comments);
  const newCommentMarkup = createNewCommentMarkup();

  return setupCommentSectionTemplate(commentCount, commentsMarkup, newCommentMarkup);
};

export {createCommentSectionMarkup};
