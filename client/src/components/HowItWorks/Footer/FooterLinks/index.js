import React from 'react';
import { Link } from 'react-router-dom';
import CONSTANTS from '../../../../constants';
import data from './data.json';
import styles from './FooterLinks.module.sass';

const FooterLinks = () => {
  return (
    <div className={styles.container}>
      <span>Copyright © 2022 Squadhelp Inc</span>
      <Link to='/somwhere'>
        Squadhelp.com has Link Shopper Approved rating of 4.9/5 based on 2782
        ratings and reviews
      </Link>
      <ul className={styles.wrapper}>
        {data.map(({ id, imgPath, alt }) => (
          <Link key={id} to='/somwhere'>
            <img src={`${CONSTANTS.STATIC_IMAGES_PATH}${imgPath}`} alt={alt} />
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default FooterLinks;
