import {joinMapped} from '../utils.js';
import {NewCommentSettings} from '../const.js';

const setupEmojiTemplate = (emotion) => {
  return `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emotion}" value="${emotion}">
  <label class="film-details__emoji-label" for="emoji-${emotion}">
    <img src="./images/emoji/${emotion}.png" width="30" height="30" alt="emoji">
  </label>`;
};

const createEmojiListMarkup = () => joinMapped(NewCommentSettings.EMOTIONS, setupEmojiTemplate, `\n`);

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

export {createNewCommentMarkup};
