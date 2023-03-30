import React from 'react';
import data from './data.json';
import CONSTANTS from '../../../constants';
import styles from './WaysToUseSquadhelp.module.sass';

const WaysToUseSquadhelp = () => {
  return (
    <section className={styles.section}>
      <article>
        <span></span>
        <h2>3 Ways To Use Squadhelp</h2>
        <p>
          Squadhelp offers 3 ways to get you a perfect name for your business.
        </p>
      </article>
      <div className={styles.container}>
        {data.map(({ id, imgName, alt, head, text, button }) => (
          <article key={id}>
            <img
              src={`${CONSTANTS.STATIC_IMAGES_PATH}howItWorks/waysToUseSquadhelp/${imgName}`}
              alt={alt}
            />
            <h3>{head}</h3>
            <p>{text}</p>
            <button>{button}</button>
          </article>
        ))}
      </div>
    </section>
  );
};

export default WaysToUseSquadhelp;
