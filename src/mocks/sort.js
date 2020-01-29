import {SortSettings} from '../const.js';

const getSortButtons = ({sortActiveButton: activeButton}) => {
  return SortSettings.BUTTONS_TITLES.map((buttonTitle) => {
    return {
      title: buttonTitle,
      isActive: buttonTitle === activeButton
    };
  });
};

export {getSortButtons};
