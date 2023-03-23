import React from 'react';
import FooterNavigation from './FooterNavigation';
import FooterTrending from './FooterTrending';
import FooterLinks from './FooterLinks';
import styles from './Footer.module.sass';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <FooterNavigation />
      <FooterTrending />
      <FooterLinks />
    </footer>
  );
};

export default Footer;
