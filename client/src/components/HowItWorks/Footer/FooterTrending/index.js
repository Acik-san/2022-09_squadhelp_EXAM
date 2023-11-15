import React from 'react';
import { Link } from 'react-router-dom';
import CONSTANTS from '../../../../constants';
import data from './data.json';
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
          {data.map(({ id, imgPath, alt, text }) => (
            <Link key={id} to='/somwhere'>
              <img
                src={`${CONSTANTS.STATIC_IMAGES_PATH}${imgPath}`}
                alt={alt}
              />
              <h4>{text}</h4>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FooterTrending;
