import { useReducer } from 'react';

const useState = () => {
  const [state, dispatch] = useReducer(reducer, {
    isAccountBtnHover: false,
    isContactBtnHover: false,
    isFavoriteBtnHover: false,
    isPhoneNumberBtnHover: false,
    isChatBtnHover: false,
    isEmailBtnHover: false,
    isHelpDeskBtnHover: false,
    isBurgerMenuBtnHover: false,
  });
  function reducer (state, action) {
    switch (action.type) {
      case 'ACCOUNT_BTN_MOUSE_ENTER':
        return { ...state, isAccountBtnHover: true };
      case 'ACCOUNT_BTN_MOUSE_LEAVE':
        return { ...state, isAccountBtnHover: false };
      case 'CONTACT_BTN_MOUSE_ENTER':
        return { ...state, isContactBtnHover: true };
      case 'CONTACT_BTN_MOUSE_LEAVE':
        return { ...state, isContactBtnHover: false };
      case 'FAVORITE_BTN_MOUSE_ENTER':
        return { ...state, isFavoriteBtnHover: true };
      case 'FAVORITE_BTN_MOUSE_LEAVE':
        return { ...state, isFavoriteBtnHover: false };
      case 'PHONE_NUMBER_BTN_MOUSE_ENTER':
        return { ...state, isPhoneNumberBtnHover: true };
      case 'PHONE_NUMBER_BTN_MOUSE_LEAVE':
        return { ...state, isPhoneNumberBtnHover: false };
      case 'CHAT_BTN_MOUSE_ENTER':
        return { ...state, isChatBtnHover: true };
      case 'CHAT_BTN_MOUSE_LEAVE':
        return { ...state, isChatBtnHover: false };
      case 'EMAIL_BTN_MOUSE_ENTER':
        return { ...state, isEmailBtnHover: true };
      case 'EMAIL_BTN_MOUSE_LEAVE':
        return { ...state, isEmailBtnHover: false };
      case 'HELP_DESK_BTN_MOUSE_ENTER':
        return { ...state, isHelpDeskBtnHover: true };
      case 'HELP_DESK_BTN_MOUSE_LEAVE':
        return { ...state, isHelpDeskBtnHover: false };
      case 'BURGER_MENU_BTN_MOUSE_ENTER':
        return { ...state, isBurgerMenuBtnHover: true };
      case 'BURGER_MENU_BTN_MOUSE_LEAVE':
        return { ...state, isBurgerMenuBtnHover: false };
      default:
        return state;
    }
  }
  return [state, dispatch];
};

export default useState;
