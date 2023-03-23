import React from 'react';
import CONSTANTS from '../../../../constants';
import styles from './FooterLinks.module.sass';

const FooterLinks = () => {
  return (
    <div className={styles.container}>
      <span>Copyright © 2022 Squadhelp Inc</span>
      <a href='/somwhere'>
        Squadhelp.com has a Shopper Approved rating of 4.9/5 based on 2782
        ratings and reviews
      </a>
      <div className={styles.wrapper}>
        <a href='/somwhere'>
          <img
            src={`${CONSTANTS.STATIC_IMAGES_PATH}howItWorks/footer/linkedin.svg`}
            alt='linkedin'
          />
        </a>
        <a href='/somwhere'>
          <img
            src={`${CONSTANTS.STATIC_IMAGES_PATH}howItWorks/footer/instagram.svg`}
            alt='instagram'
          />
        </a>
        <a href='/somwhere'>
          <img
            src={`${CONSTANTS.STATIC_IMAGES_PATH}howItWorks/footer/twitter.svg`}
            alt='instagram'
          />
        </a>
        <a href='/somwhere'>
          <img
            src={`${CONSTANTS.STATIC_IMAGES_PATH}howItWorks/footer/facebook.svg`}
            alt='facebook'
          />
        </a>
      </div>
    </div>
  );
};

export default FooterLinks;
