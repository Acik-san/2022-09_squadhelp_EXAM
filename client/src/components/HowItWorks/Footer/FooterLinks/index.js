import React from 'react';
import { Link } from 'react-router-dom';
import CONSTANTS from '../../../../constants';
import styles from './FooterLinks.module.sass';

const FooterLinks = () => {
  return (
    <div className={styles.container}>
      <span>Copyright © 2022 Squadhelp Inc</span>
      <Link to='/somwhere'>
        Squadhelp.com has Link Shopper Approved rating of 4.9/5 based on 2782
        ratings and reviews
      </Link>
      <div className={styles.wrapper}>
        <Link to='/somwhere'>
          <img
            src={`${CONSTANTS.STATIC_IMAGES_PATH}howItWorks/footer/linkedin.svg`}
            alt='linkedin'
          />
        </Link>
        <Link to='/somwhere'>
          <img
            src={`${CONSTANTS.STATIC_IMAGES_PATH}howItWorks/footer/instagram.svg`}
            alt='instagram'
          />
        </Link>
        <Link to='/somwhere'>
          <img
            src={`${CONSTANTS.STATIC_IMAGES_PATH}howItWorks/footer/twitter.svg`}
            alt='instagram'
          />
        </Link>
        <Link to='/somwhere'>
          <img
            src={`${CONSTANTS.STATIC_IMAGES_PATH}howItWorks/footer/facebook.svg`}
            alt='facebook'
          />
        </Link>
      </div>
    </div>
  );
};

export default FooterLinks;
