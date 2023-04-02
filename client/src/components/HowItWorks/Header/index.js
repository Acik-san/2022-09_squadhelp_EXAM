import React from 'react';
import { Link } from 'react-router-dom';
import { useOnHoverState } from '../../../hooks';
import classNames from 'classnames';
import CONSTANTS from '../../../constants';
import styles from './Header.module.sass';

const Header = props => {
  const { isOpen, setIsOpen } = props;
  const [
    {
      isAccountBtnHover,
      isContactBtnHover,
      isFavoriteBtnHover,
      isPhoneNumberBtnHover,
      isChatBtnHover,
      isEmailBtnHover,
      isHelpDeskBtnHover,
      isBurgerMenuBtnHover,
    },
    dispatch,
  ] = useOnHoverState();
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to='/' className={styles.logo}>
          <img
            src={`${CONSTANTS.STATIC_IMAGES_PATH}howItWorks/header/how_it_works_logo.svg`}
            alt='logo'
          />
        </Link>
        <form className={styles.search_container}>
          <input
            placeholder='Search over 100,000 names'
            className={styles.search_input}
          />
          <button className={styles.search_button}>
            <img
              src={`${CONSTANTS.STATIC_IMAGES_PATH}howItWorks/header/search_button.svg`}
              alt='search_button'
            />
          </button>
        </form>
        <div className={styles.buttons_container}>
          <div
            onMouseEnter={() => dispatch({ type: 'ACCOUNT_BTN_MOUSE_ENTER' })}
            onMouseLeave={() => dispatch({ type: 'ACCOUNT_BTN_MOUSE_LEAVE' })}
            className={styles.button_container}
          >
            {isAccountBtnHover ? (
              <>
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}howItWorks/header/account_icon_white.svg`}
                  className={styles.account_icon}
                  alt='account_icon'
                />
                <ul className={styles.account_list}>
                  <li>
                    <Link to='/login'>Login</Link>
                  </li>
                  <li>
                    <Link to='/registration'>Signup</Link>
                  </li>
                </ul>
              </>
            ) : (
              <img
                src={`${CONSTANTS.STATIC_IMAGES_PATH}howItWorks/header/account_icon.svg`}
                className={styles.account_icon}
                alt='account_icon'
              />
            )}
            <p>Account</p>
          </div>
          <div
            onMouseEnter={() => dispatch({ type: 'CONTACT_BTN_MOUSE_ENTER' })}
            onMouseLeave={() => dispatch({ type: 'CONTACT_BTN_MOUSE_LEAVE' })}
            className={styles.button_container}
          >
            {isContactBtnHover ? (
              <>
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}howItWorks/header/contact_icon_white.svg`}
                  className={styles.contact_icon}
                  alt='contact_icon'
                />
                <ul className={styles.contact_list}>
                  <li
                    onMouseEnter={() =>
                      dispatch({ type: 'PHONE_NUMBER_BTN_MOUSE_ENTER' })
                    }
                    onMouseLeave={() =>
                      dispatch({ type: 'PHONE_NUMBER_BTN_MOUSE_LEAVE' })
                    }
                  >
                    {isPhoneNumberBtnHover ? (
                      <img
                        src={`${CONSTANTS.STATIC_IMAGES_PATH}howItWorks/header/contact_icon_blue.svg`}
                        alt='contact_icon'
                      />
                    ) : (
                      <img
                        src={`${CONSTANTS.STATIC_IMAGES_PATH}howItWorks/header/contact_icon.svg`}
                        alt='contact_icon'
                      />
                    )}
                    <Link to='/somwhere'>(877)355-3585</Link>
                  </li>
                  <li
                    onMouseEnter={() =>
                      dispatch({ type: 'CHAT_BTN_MOUSE_ENTER' })
                    }
                    onMouseLeave={() =>
                      dispatch({ type: 'CHAT_BTN_MOUSE_LEAVE' })
                    }
                  >
                    {isChatBtnHover ? (
                      <img
                        src={`${CONSTANTS.STATIC_IMAGES_PATH}howItWorks/header/chat_icon_blue.svg`}
                        alt='chat_icon'
                      />
                    ) : (
                      <img
                        src={`${CONSTANTS.STATIC_IMAGES_PATH}howItWorks/header/chat_icon.svg`}
                        alt='chat_icon'
                      />
                    )}
                    <Link to='/somwhere'>Chat</Link>
                  </li>
                  <li
                    onMouseEnter={() =>
                      dispatch({ type: 'EMAIL_BTN_MOUSE_ENTER' })
                    }
                    onMouseLeave={() =>
                      dispatch({ type: 'EMAIL_BTN_MOUSE_LEAVE' })
                    }
                  >
                    {isEmailBtnHover ? (
                      <img
                        src={`${CONSTANTS.STATIC_IMAGES_PATH}howItWorks/header/email_icon_blue.svg`}
                        alt='email_icon'
                      />
                    ) : (
                      <img
                        src={`${CONSTANTS.STATIC_IMAGES_PATH}howItWorks/header/email_icon.svg`}
                        alt='email_icon'
                      />
                    )}
                    <Link to='/somwhere'>Email</Link>
                  </li>
                  <li
                    onMouseEnter={() =>
                      dispatch({ type: 'HELP_DESK_BTN_MOUSE_ENTER' })
                    }
                    onMouseLeave={() =>
                      dispatch({ type: 'HELP_DESK_BTN_MOUSE_LEAVE' })
                    }
                  >
                    {isHelpDeskBtnHover ? (
                      <img
                        src={`${CONSTANTS.STATIC_IMAGES_PATH}howItWorks/header/help_desk_icon_blue.svg`}
                        alt='help_desk'
                      />
                    ) : (
                      <img
                        src={`${CONSTANTS.STATIC_IMAGES_PATH}howItWorks/header/help_desk_icon.svg`}
                        alt='help_desk'
                      />
                    )}
                    <Link to='/somwhere'>Help Desk</Link>
                  </li>
                </ul>
              </>
            ) : (
              <img
                src={`${CONSTANTS.STATIC_IMAGES_PATH}howItWorks/header/contact_icon.svg`}
                className={styles.contact_icon}
                alt='contact_icon'
              />
            )}
            <p>Contact</p>
          </div>
          <Link
            to='/favorites'
            onMouseEnter={() => dispatch({ type: 'FAVORITE_BTN_MOUSE_ENTER' })}
            onMouseLeave={() => dispatch({ type: 'FAVORITE_BTN_MOUSE_LEAVE' })}
            className={styles.button_container}
          >
            {isFavoriteBtnHover ? (
              <img
                src={`${CONSTANTS.STATIC_IMAGES_PATH}howItWorks/header/favorite_icon_white.svg`}
                className={styles.favorite_icon}
                alt='favorite_icon'
              />
            ) : (
              <img
                src={`${CONSTANTS.STATIC_IMAGES_PATH}howItWorks/header/favorite_icon.svg`}
                className={styles.favorite_icon}
                alt='favorite_icon'
              />
            )}
            <p>Favorites</p>
          </Link>
          <div
            className={classNames(styles.button_container, {
              [styles.start_contest]: true,
            })}
          >
            <Link to='/somwhere' className={styles.start_button}>
              Start Contest
            </Link>
          </div>
          <div
            className={classNames(styles.button_container, {
              [styles.burger_menu]: true,
            })}
            onMouseEnter={() =>
              dispatch({ type: 'BURGER_MENU_BTN_MOUSE_ENTER' })
            }
            onMouseLeave={() =>
              dispatch({ type: 'BURGER_MENU_BTN_MOUSE_LEAVE' })
            }
            onClick={() => setIsOpen(!isOpen)}
          >
            <button className={styles.burger_button}>
              {isBurgerMenuBtnHover ? (
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}howItWorks/header/burger_menu_white.svg`}
                  alt='burger_menu'
                />
              ) : (
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}howItWorks/header/burger_menu.svg`}
                  alt='burger_menu'
                />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
