import React from 'react';
import CONSTANTS from '../../../constants';
import styles from './HowContestsWork.module.sass';

const HowContestsWork = () => {
  return (
    <>
      <hr className={styles.hr} />
      <section className={styles.section}>
        <img
          className={styles.cup_img}
          src={`${CONSTANTS.STATIC_IMAGES_PATH}howItWorks/howContestWork/cup.svg`}
          alt='cup'
        />
        <h2>How Do Naming Contests Work?</h2>
        <div>
          <img
            className={styles.how_contests_work}
            src={`${CONSTANTS.STATIC_IMAGES_PATH}howItWorks/howContestWork/how_naming_contests_work.svg`}
            alt='how_contests_work'
          />
          <ul>
            <li>
              <span>1.</span>
              <p>
                Fill out your Naming Brief and begin receiving name ideas in
                minutes.
              </p>
            </li>
            <li>
              <span>2.</span>
              <p>
                Rate the submissions and provide feedback to creatives.
                Creatives submit even more names based on your feedback.
              </p>
            </li>
            <li>
              <span>3.</span>
              <p>
                Our team helps you test your favorite names with your target
                audience. We also assist with Trademark screening.
              </p>
            </li>
            <li>
              <span>4.</span>
              <p>Pick a Winner. The winner gets paid for their submission.</p>
            </li>
          </ul>
        </div>
      </section>
      <hr className={styles.hr} />
    </>
  );
};

export default HowContestsWork;
