import React from 'react';
import data from './data.json';
import FooterNavList from './FooterNavList';
import styles from './FooterNavigation.module.sass';

const FooterNavigation = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h3>Services</h3>
        <FooterNavList data={data[0]} />
      </div>
      <div className={styles.wrapper}>
        <h3>Tools</h3>
        <FooterNavList data={data[1]} />
      </div>
      <div className={styles.wrapper}>
        <h3>SquadHelp</h3>
        <FooterNavList data={data[2]} />
      </div>
      <div className={styles.inner_container}>
        <div className={styles.wrapper}>
          <h3>Creatives</h3>
          <FooterNavList data={data[3]} />
        </div>
        <div className={styles.wrapper}>
          <h3>Legal</h3>
          <FooterNavList data={data[4]} />
        </div>
      </div>
    </div>
  );
};

export default FooterNavigation;
