import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CONSTANTS from '../../../constants';
import data from './data.json';
import styles from './NavMenu.module.sass';

const NavMenu = props => {
  const { isOpen, setIsOpen } = props;
  const [{ isHover, id }, setIsHover] = useState({ isHover: false, id: null });
  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth > 768);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }; // eslint-disable-next-line
  }, []);
  return (
    <>
      {isOpen && (
        <nav className={styles.nav_menu}>
          <ul className={styles.nav_list}>
            {data.map(
              ({ listItemId, linkName, arrowDown, arrowUp, innerList }) =>
                linkName === 'Agency Experience' ? (
                  <li key={listItemId}>
                    <Link to='/some-page'>{linkName}</Link>
                  </li>
                ) : linkName === 'separator_stick' ? (
                  <li key={listItemId} className={styles.separator_stick}>
                    <div></div>
                  </li>
                ) : (
                  <li
                    key={listItemId}
                    onMouseEnter={() =>
                      setIsHover({ isHover: true, id: listItemId })
                    }
                    onMouseLeave={() =>
                      setIsHover({ isHover: false, id: null })
                    }
                  >
                    <Link to='/some-page'>
                      {linkName}
                      {isHover && id === listItemId ? (
                        <img
                          src={`${CONSTANTS.STATIC_IMAGES_PATH}${arrowUp}`}
                          alt='nav_arrow'
                        />
                      ) : (
                        <img
                          src={`${CONSTANTS.STATIC_IMAGES_PATH}${arrowDown}`}
                          alt='nav_arrow'
                        />
                      )}
                    </Link>
                    {innerList ? (
                      <ul>
                        {innerList.map(
                          ({
                            innerListItemId,
                            innerLinkName,
                            shortList,
                            dropDownList,
                          }) =>
                            shortList ? (
                              <li
                                key={innerListItemId}
                                className={styles.short_domain}
                              >
                                <Link to='/some-page'>{innerLinkName}</Link>
                                <ul>
                                  {shortList.map(
                                    ({ shortListItemId, shortLinkName }) => (
                                      <li key={shortListItemId}>
                                        {shortLinkName}
                                      </li>
                                    )
                                  )}
                                </ul>
                              </li>
                            ) : dropDownList ? (
                              <li
                                key={innerListItemId}
                                // id='7'
                                className={styles.industry_name}
                                onMouseEnter={() =>
                                  setIsHover({
                                    isHover: true,
                                    id: innerListItemId,
                                  })
                                }
                                onMouseLeave={() =>
                                  setIsHover({ isHover: false, id: null })
                                }
                              >
                                <Link to='/some-page'>
                                  {innerLinkName}
                                  {isHover && id === innerListItemId ? (
                                    <img
                                      src={`${CONSTANTS.STATIC_IMAGES_PATH}${arrowUp}`}
                                      alt='nav_arrow'
                                    />
                                  ) : (
                                    <img
                                      src={`${CONSTANTS.STATIC_IMAGES_PATH}${arrowDown}`}
                                      alt='nav_arrow'
                                    />
                                  )}
                                </Link>
                                <ul>
                                  {dropDownList.map(
                                    ({
                                      dropDownListItemId,
                                      dropDownLinkName,
                                    }) => (
                                      <li key={dropDownListItemId}>
                                        <Link to='/some-page'>
                                          {dropDownLinkName}
                                        </Link>
                                      </li>
                                    )
                                  )}
                                </ul>
                              </li>
                            ) : (
                              <li key={innerListItemId}>
                                <Link to='/some-page'>{innerLinkName}</Link>
                              </li>
                            )
                        )}
                      </ul>
                    ) : null}
                  </li>
                )
            )}
          </ul>
        </nav>
      )}
    </>
  );
};

export default NavMenu;
