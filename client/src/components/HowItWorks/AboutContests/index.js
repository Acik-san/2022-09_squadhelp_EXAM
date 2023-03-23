import React from 'react';
import AboutContestsList from './AboutContestsList';
import data from './data.json';
import styles from './AboutContests.module.sass';

const AboutContests = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <nav>
          <a href='#about-contests-1'>Launching A Contest</a>
          <a href='#about-contests-2'>Buying From Marketplace</a>
          <a href='#about-contests-3'>Managed Contests</a>
          <a href='#about-contests-4'>For Creatives</a>
        </nav>
        <ul className={styles.wrapper_list}>
          <AboutContestsList data={data[0]} />
          <AboutContestsList data={data[1]} />
          <AboutContestsList data={data[2]} />
          <AboutContestsList data={data[3]} />
        </ul>
      </div>
    </section>
  );
};

export default AboutContests;
