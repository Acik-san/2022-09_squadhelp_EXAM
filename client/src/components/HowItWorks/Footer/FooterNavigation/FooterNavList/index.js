import React from 'react';
import styles from './FooterNavList.module.sass';

const FooterNavList = props => {
  const { data } = props;
  return (
    <ul className={styles.wrapper_list}>
      {data.map(({ id, btnText, innerList }) => (
        <li key={id} className={styles.wrapper_list_item}>
          <a href='/somwhere'>{btnText}</a>
          {innerList && (
            <ul className={styles.inner_list}>
              {innerList.map(({ id, innerBtnText }) => (
                <li key={id} className={styles.inner_list_item}>
                  <a href='/somwhere'>{innerBtnText}</a>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
};

export default FooterNavList;
