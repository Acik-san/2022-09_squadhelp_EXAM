import React from 'react';
import CONSTANTS from '../../../constants';
import data from './data.json';
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
            {data.map(({ id, text }) => (
              <li key={id}>
                <span>{id}</span>
                <p>{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <hr className={styles.hr} />
    </>
  );
};

export default HowContestsWork;
