import React, { useEffect, useState } from 'react';
import CONSTANTS from '../../../constants';
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
            <li
              id='1'
              onMouseEnter={() => setIsHover({ isHover: true, id: '1' })}
              onMouseLeave={() => setIsHover({ isHover: false, id: null })}
            >
              <a href='/some-page'>
                Names For Sale
                {isHover && id === '1' ? (
                  <img
                    src={`${CONSTANTS.STATIC_IMAGES_PATH}howItWorks/navMenu/nav_arrow_up_blue.svg`}
                    alt='nav_arrow'
                  />
                ) : (
                  <img
                    src={`${CONSTANTS.STATIC_IMAGES_PATH}howItWorks/navMenu/nav_arrow_down.svg`}
                    alt='nav_arrow'
                  />
                )}
              </a>
              <ul>
                <li>
                  <a href='/some-page'>Popular Brandable Names</a>
                </li>
                <li>
                  <a href='/some-page'>Premium Domains For Sale</a>
                </li>
                <li className={styles.short_domain}>
                  <a href='/some-page'>Short Domains</a>
                  <ul>
                    <li>3 Letter Domains</li>
                    <li>4 Letter Domains</li>
                    <li>5 Letter Domains</li>
                  </ul>
                </li>
                <li>
                  <a href='/some-page'>One Word Names</a>
                </li>
                <li>
                  <a href='/some-page'>Industry Domains</a>
                </li>
                <li>
                  <a href='/some-page'>Location Based Names</a>
                </li>
                <li>
                  <a href='/some-page'>Recommended For You</a>
                </li>
                <li>
                  <a href='/some-page'>Become A Seller</a>
                </li>
              </ul>
            </li>
            <li
              id='2'
              onMouseEnter={() => setIsHover({ isHover: true, id: '2' })}
              onMouseLeave={() => setIsHover({ isHover: false, id: null })}
            >
              <a href='/some-page'>
                Naming Contests
                {isHover && id === '2' ? (
                  <img
                    src={`${CONSTANTS.STATIC_IMAGES_PATH}howItWorks/navMenu/nav_arrow_up_blue.svg`}
                    alt='nav_arrow'
                  />
                ) : (
                  <img
                    src={`${CONSTANTS.STATIC_IMAGES_PATH}howItWorks/navMenu/nav_arrow_down.svg`}
                    alt='nav_arrow'
                  />
                )}
              </a>
              <ul>
                <li>
                  <a href='/some-page'>Start A Contest</a>
                </li>
                <li>
                  <a href='/some-page'>How It Works</a>
                </li>
                <li>
                  <a href='/some-page'>Contest Pricing</a>
                </li>
                <li>
                  <a href='/some-page'>Agency Services</a>
                </li>
                <li>
                  <a href='/some-page'>Our Work</a>
                </li>
                <li>
                  <a href='/some-page'>Recent Winners</a>
                </li>
                <li>
                  <a href='/some-page'>Active Contests</a>
                </li>
                <li>
                  <a href='/some-page'>Become A Creative</a>
                </li>
              </ul>
            </li>
            <li
              id='3'
              onMouseEnter={() => setIsHover({ isHover: true, id: '3' })}
              onMouseLeave={() => setIsHover({ isHover: false, id: null })}
            >
              <a href='/some-page'>
                Other Services
                {isHover && id === '3' ? (
                  <img
                    src={`${CONSTANTS.STATIC_IMAGES_PATH}howItWorks/navMenu/nav_arrow_up_blue.svg`}
                    alt='nav_arrow'
                  />
                ) : (
                  <img
                    src={`${CONSTANTS.STATIC_IMAGES_PATH}howItWorks/navMenu/nav_arrow_down.svg`}
                    alt='nav_arrow'
                  />
                )}
              </a>
              <ul>
                <li>
                  <a href='/some-page'>Logos</a>
                </li>
                <li>
                  <a href='/some-page'>Taglines</a>
                </li>
                <li>
                  <a href='/some-page'>Audience Testing</a>
                </li>
                <li>
                  <a href='/some-page'>Trademark Research</a>
                </li>
                <li>
                  <a href='/some-page'>Trademark Filing</a>
                </li>
                <li>
                  <a href='/some-page'>Video Creation</a>
                </li>
              </ul>
            </li>
            <li>
              <a href='/some-page'>Agency Experience</a>
            </li>
            <li className={styles.separator_stick}>
              <div></div>
            </li>
            <li
              id='4'
              onMouseEnter={() => setIsHover({ isHover: true, id: '4' })}
              onMouseLeave={() => setIsHover({ isHover: false, id: null })}
            >
              <a href='/some-page'>
                Resources
                {isHover && id === '4' ? (
                  <img
                    src={`${CONSTANTS.STATIC_IMAGES_PATH}howItWorks/navMenu/nav_arrow_up_blue.svg`}
                    alt='nav_arrow'
                  />
                ) : (
                  <img
                    src={`${CONSTANTS.STATIC_IMAGES_PATH}howItWorks/navMenu/nav_arrow_down.svg`}
                    alt='nav_arrow'
                  />
                )}
              </a>
              <ul className={styles.resources_list}>
                <li>
                  <a href='/some-page'>Business Name Generator</a>
                </li>
                <li>
                  <a href='/some-page'>How to Naming Your Business</a>
                </li>
                <li>
                  <a href='/some-page'>Free Trademark Checker</a>
                </li>
                <li
                  className={styles.industry_name}
                  id='5'
                  onMouseEnter={() => setIsHover({ isHover: true, id: '5' })}
                  onMouseLeave={() => setIsHover({ isHover: false, id: null })}
                >
                  <a href='/some-page'>
                    Industry Name Ideas
                    {isHover && id === '5' ? (
                      <img
                        src={`${CONSTANTS.STATIC_IMAGES_PATH}howItWorks/navMenu/nav_arrow_up_blue.svg`}
                        alt='nav_arrow'
                      />
                    ) : (
                      <img
                        src={`${CONSTANTS.STATIC_IMAGES_PATH}howItWorks/navMenu/nav_arrow_down.svg`}
                        alt='nav_arrow'
                      />
                    )}
                  </a>
                  <ul>
                    <li>
                      <a href='/some-page'>Clothing Brand Name Ideas</a>
                    </li>
                    <li>
                      <a href='/some-page'>Consulting Business Name Ideas</a>
                    </li>
                    <li>
                      <a href='/some-page'>
                        Health & Wellness Business Name Ideas
                      </a>
                    </li>
                    <li>
                      <a href='/some-page'>Food Brand Name ideas</a>
                    </li>
                    <li>
                      <a href='/some-page'>Beauty Business Names</a>
                    </li>
                    <li>
                      <a href='/some-page'>Tech Startup Name Ideas</a>
                    </li>
                    <li>
                      <a href='/some-page'>Shopping Website Name Ideas</a>
                    </li>
                    <li>
                      <a href='/some-page'>Real Estate Business Name Ideas</a>
                    </li>
                    <li>
                      <a href='/some-page'>Insurance Business Name Ideas</a>
                    </li>
                    <li>
                      <a href='/some-page'>Finance Business Name Ideas</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};

export default NavMenu;
