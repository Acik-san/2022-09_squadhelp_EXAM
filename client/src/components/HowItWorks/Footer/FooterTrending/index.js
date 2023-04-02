import React from 'react';
import { Link } from 'react-router-dom';
import CONSTANTS from '../../../../constants';
import styles from './FooterTrending.module.sass';

const FooterTrending = () => {
  return (
    <div className={styles.container}>
      <h3>Trending Searches</h3>
      <div className={styles.wrapper}>
        <div className={styles.inner_container}>
          <p>
            Explore our unique, hand-picked brand & business names for sale
            along with a matching, premium domain name. Buy instantly for a
            fixed low price.
          </p>
          <form>
            <input placeholder='Search  over 75,000 Names' />
            <button>
              <img
                src={`${CONSTANTS.STATIC_IMAGES_PATH}howItWorks/footer/search_button_white.svg`}
                alt='search_button_white'
              />
            </button>
          </form>
        </div>
        <div className={styles.buttons_container}>
          <Link to='/somwhere'>
            <img
              src={`${CONSTANTS.STATIC_IMAGES_PATH}howItWorks/footer/lightning.svg`}
              alt='lightning'
            />
            <h4>Short Names</h4>
          </Link>
          <Link to='/somwhere'>
            <img
              src={`${CONSTANTS.STATIC_IMAGES_PATH}howItWorks/footer/lightning.svg`}
              alt='lightning'
            />
            <h4>One Word</h4>
          </Link>
          <Link to='/somwhere'>
            <img
              src={`${CONSTANTS.STATIC_IMAGES_PATH}howItWorks/footer/lightning.svg`}
              alt='lightning'
            />
            <h4>4-letter</h4>
          </Link>
          <Link to='/somwhere'>
            <img
              src={`${CONSTANTS.STATIC_IMAGES_PATH}howItWorks/footer/lightning.svg`}
              alt='lightning'
            />
            <h4>5-letter</h4>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FooterTrending;
