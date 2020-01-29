import {joinMapped, formatCommentDate} from '../utils.js';

const setupCommentTemplate = (emotion, commentText, author, commentDate) => {
  return `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji">
    </span>
    <div>
      <p class="film-details__comment-text">${commentText}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${commentDate}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>`;
};

const createCommentMarkup = ({emotion, comment: commentText, author, date: commentDate}) => {
  const formattedCommentDate = formatCommentDate(commentDate);
  return setupCommentTemplate(emotion, commentText, author, formattedCommentDate);
};

const createCommentListMarkup = (comments) => joinMapped(comments, createCommentMarkup, `\n`);

const setupCommentsTemplate = (commentListMarkup) => {
  return `<ul class="film-details__comments-list">
    ${commentListMarkup}
  </ul>`;
};

const createCommentsMarkup = (comments) => {
  const commentListMarkup = createCommentListMarkup(comments);
  return setupCommentsTemplate(commentListMarkup);
};

export {createCommentsMarkup};
