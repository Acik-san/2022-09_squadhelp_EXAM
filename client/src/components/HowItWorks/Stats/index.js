import React from 'react';
import CONSTANTS from '../../../constants';
import data from './data.json';
import styles from './Stats.module.sass';

const Stats = () => {
  return (
    <section className={styles.section}>
      <ul className={styles.container}>
        {data.map(
          ({ id, statsPath, alt, pText1, pText2, spanText1, spanText2 }) =>
            id === 1 ? (
              <li key={id}>
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}${statsPath}`}
                  alt={alt}
                />
                <p>
                  <span>{spanText1}</span>
                  {pText1}
                </p>
              </li>
            ) : id === 2 ? (
              <li key={id}>
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}${statsPath}`}
                  alt={alt}
                />
                <p>
                  {pText1}
                  <span>{spanText1}</span>
                  {pText2}
                </p>
              </li>
            ) : (
              <li key={id}>
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}${statsPath}`}
                  alt={alt}
                />
                <p>
                  <span>{spanText1}</span>
                  {pText1} <span>{spanText2}</span>
                  {pText2}
                </p>
              </li>
            )
        )}
      </ul>
    </section>
  );
};

export default Stats;
