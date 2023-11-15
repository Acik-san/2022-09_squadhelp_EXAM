import React from 'react';
import footerNavData from './footerNavData.json';
import data from './data.json';
import FooterNavList from './FooterNavList';
import styles from './FooterNavigation.module.sass';

const FooterNavigation = () => {
  return (
    <ul className={styles.container}>
      {footerNavData.map(({ id, listItemName, dataId, innerList }) =>
        id === 4 ? (
          <ul key={id} className={styles.inner_container}>
            {innerList.map(({ innerId, innerDataId, innerListItemName }) => (
              <li key={innerId} className={styles.wrapper}>
                <h3>{innerListItemName}</h3>
                <FooterNavList data={data[innerDataId]} />
              </li>
            ))}
          </ul>
        ) : (
          <li key={id} className={styles.wrapper}>
            <h3>{listItemName}</h3>
            <FooterNavList data={data[dataId]} />
          </li>
        )
      )}
    </ul>
  );
};

export default FooterNavigation;
