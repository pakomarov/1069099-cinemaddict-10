import {createElement, joinMapped, formatCommentDate} from '../utils.js';
import {EMOTIONS} from '../const.js';

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

const setupEmojiTemplate = (emotion) => {
  return `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emotion}" value="${emotion}">
  <label class="film-details__emoji-label" for="emoji-${emotion}">
    <img src="./images/emoji/${emotion}.png" width="30" height="30" alt="emoji">
  </label>`;
};

const createEmojiListMarkup = () => joinMapped(EMOTIONS, setupEmojiTemplate, `\n`);

const setupNewCommentTemplate = (emojiListMarkup) => {
  return `<div class="film-details__new-comment">
    <div for="add-emoji" class="film-details__add-emoji-label"></div>

    <label class="film-details__comment-label">
      <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
    </label>

    <div class="film-details__emoji-list">
      ${emojiListMarkup}
    </div>
  </div>`;
};

const createNewCommentMarkup = () => {
  const emojiListMarkup = createEmojiListMarkup();
  return setupNewCommentTemplate(emojiListMarkup);
};

const setupCommentSectionTemplate = (commentCount, commentsMarkup, newCommentMarkup) => {
  return `<div class="form-details__bottom-container">
    <section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentCount}</span></h3>
      ${commentsMarkup}

      ${newCommentMarkup}
    </section>
  </div>`;
};

const createCommentSectionTemplate = ({comments}) => {
  const commentCount = comments.length;
  const commentsMarkup = createCommentsMarkup(comments);
  const newCommentMarkup = createNewCommentMarkup();

  return setupCommentSectionTemplate(commentCount, commentsMarkup, newCommentMarkup);
};

export default class CommentSection {
  constructor(film) {
    this._film = film;
    this._element = null;
  }

  getTemplate() {
    return createCommentSectionTemplate(this._film);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
