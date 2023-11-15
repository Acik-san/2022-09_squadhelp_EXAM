import React from 'react';
import { Link } from 'react-router-dom';
import CONSTANTS from '../../../constants';
import data from './data.json';
import styles from './FeaturedIn.module.sass';

const FeaturedIn = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h3>Featured In</h3>
        <ul className={styles.inner_container}>
          {data.map(({ id, imgPath, alt }) => (
            <Link key={id} to='/somwhere'>
              <img
                className={
                  id === 1
                    ? styles.forbes_image
                    : id === 2
                    ? styles.tnw_image
                    : id === 3
                    ? styles.chicago_image
                    : styles.mashable_image
                }
                src={`${CONSTANTS.STATIC_IMAGES_PATH}${imgPath}`}
                alt={alt}
              />
            </Link>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default FeaturedIn;
