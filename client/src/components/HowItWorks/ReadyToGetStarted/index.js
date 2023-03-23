import React from 'react';
import CONSTANTS from '../../../constants';
import styles from './ReadyToGetStarted.module.sass';

const ReadyToGetStarted = () => {
  return (
    <section className={styles.section}>
      <img
        src={`${CONSTANTS.STATIC_IMAGES_PATH}howItWorks/readyToGetStarted/get_started_1.svg`}
        alt='get_started_1'
      />
      <article className={styles.get_started}>
        <h2>Ready to get started?</h2>
        <p>
          Fill out your contest brief and begin receiving custom name
          suggestions within minutes.
        </p>
        <a href='/somwhere'>Start A Contest</a>
      </article>
      <img
        src={`${CONSTANTS.STATIC_IMAGES_PATH}howItWorks/readyToGetStarted/get_started_2.svg`}
        alt='get_started_2'
      />
    </section>
  );
};

export default ReadyToGetStarted;
