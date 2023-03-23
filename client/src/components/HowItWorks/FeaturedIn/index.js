import React from 'react';
import CONSTANTS from '../../../constants';
import styles from './FeaturedIn.module.sass';

const FeaturedIn = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h3>Featured In</h3>
        <div className={styles.inner_container}>
          <a href='/somwhere'>
            <img
              className={styles.forbes_image}
              src={`${CONSTANTS.STATIC_IMAGES_PATH}/howItWorks/featuredIn/forbes.svg`}
              alt='forbes'
            />
          </a>
          <a href='/somwhere'>
            <img
              className={styles.tnw_image}
              src={`${CONSTANTS.STATIC_IMAGES_PATH}/howItWorks/featuredIn/TNW.svg`}
              alt='TNW'
            />
          </a>
          <a href='/somwhere'>
            <img
              className={styles.chicago_image}
              src={`${CONSTANTS.STATIC_IMAGES_PATH}/howItWorks/featuredIn/chicago.svg`}
              alt='chicago'
            />
          </a>
          <a href='/somwhere'>
            <img
              className={styles.mashable_image}
              src={`${CONSTANTS.STATIC_IMAGES_PATH}/howItWorks/featuredIn/mashable.svg`}
              alt='mashable'
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedIn;
