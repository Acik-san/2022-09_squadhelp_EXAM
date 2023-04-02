import React from 'react';
import { Link } from 'react-router-dom';
import CONSTANTS from '../../../constants';
import styles from './FeaturedIn.module.sass';

const FeaturedIn = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h3>Featured In</h3>
        <div className={styles.inner_container}>
          <Link to='/somwhere'>
            <img
              className={styles.forbes_image}
              src={`${CONSTANTS.STATIC_IMAGES_PATH}/howItWorks/featuredIn/forbes.svg`}
              alt='forbes'
            />
          </Link>
          <Link to='/somwhere'>
            <img
              className={styles.tnw_image}
              src={`${CONSTANTS.STATIC_IMAGES_PATH}/howItWorks/featuredIn/TNW.svg`}
              alt='TNW'
            />
          </Link>
          <Link to='/somwhere'>
            <img
              className={styles.chicago_image}
              src={`${CONSTANTS.STATIC_IMAGES_PATH}/howItWorks/featuredIn/chicago.svg`}
              alt='chicago'
            />
          </Link>
          <Link to='/somwhere'>
            <img
              className={styles.mashable_image}
              src={`${CONSTANTS.STATIC_IMAGES_PATH}/howItWorks/featuredIn/mashable.svg`}
              alt='mashable'
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedIn;
