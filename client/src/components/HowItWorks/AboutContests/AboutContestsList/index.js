import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './AboutContestsList.module.sass';

const AboutContestsList = props => {
  const {
    data: { id, heading, innerList },
  } = props;
  const [{ isOpen, listItemId }, setIsOpen] = useState({
    isOpen: false,
    listItemId: null,
  });
  return (
    <li key={id} className={styles.wrapper_list_item}>
      <h2 id={`about-contests-${id}`}>{heading}</h2>
      <ul className={styles.inner_list}>
        {innerList.map(({ id, btnName, text, subInnerList }) => (
          <li key={id} className={styles.inner_list_item}>
            <div
              className={styles.inner_list_item_heading}
              onClick={() =>
                listItemId === id
                  ? setIsOpen({ isOpen: !isOpen, listItemId: null })
                  : setIsOpen({ isOpen: true, listItemId: id })
              }
            >
              <h3>{btnName}</h3>
              <span
                className={`fas fa-arrow-down small ${
                  isOpen && listItemId === id
                    ? styles.arrow_down
                    : styles.arrow_right
                }`}
              ></span>
            </div>
            <div
              className={classNames(styles.opened, {
                [styles.not_opened]: isOpen && listItemId === id,
              })}
            >
              <div>
                {text}
                {subInnerList && (
                  <ul className={styles.sub_inner_list}>
                    {subInnerList.map(({ id, li, link }) => (
                      <li key={id} className={styles.sub_inner_list_item}>
                        {link ? <Link to={link}>{li}</Link> : <p>{li}</p>}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default AboutContestsList;
