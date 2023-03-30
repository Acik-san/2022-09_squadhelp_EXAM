import React from 'react';
import CONSTANTS from '../../../constants';
import styles from './Stats.module.sass';

const Stats = () => {
  return (
    <section className={styles.section}>
      <ul className={styles.container}>
        <li>
          <img
            src={`${CONSTANTS.STATIC_IMAGES_PATH}howItWorks/stats/stars.svg`}
            alt='stars'
          />
          <p>
            <span>4.9 out of 5 stars</span> from 25,000+ customers.
          </p>
        </li>
        <li>
          <img
            src={`${CONSTANTS.STATIC_IMAGES_PATH}howItWorks/stats/people.png`}
            alt='people'
          />
          <p>
            Our branding community stands <span>200,000+</span> strong.
          </p>
        </li>
        <li>
          <img
            src={`${CONSTANTS.STATIC_IMAGES_PATH}howItWorks/stats/sharing-files.svg`}
            alt='file'
          />
          <p>
            <span>140+ Industries</span> supported across more than{' '}
            <span>85 countries</span> – and counting.
          </p>
        </li>
      </ul>
    </section>
  );
};

export default Stats;
