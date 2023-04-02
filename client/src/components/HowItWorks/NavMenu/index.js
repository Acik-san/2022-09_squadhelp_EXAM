import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
              <Link to='/some-page'>
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
              </Link>
              <ul>
                <li>
                  <Link to='/some-page'>Popular Brandable Names</Link>
                </li>
                <li>
                  <Link to='/some-page'>Premium Domains For Sale</Link>
                </li>
                <li className={styles.short_domain}>
                  <Link to='/some-page'>Short Domains</Link>
                  <ul>
                    <li>3 Letter Domains</li>
                    <li>4 Letter Domains</li>
                    <li>5 Letter Domains</li>
                  </ul>
                </li>
                <li>
                  <Link to='/some-page'>One Word Names</Link>
                </li>
                <li>
                  <Link to='/some-page'>Industry Domains</Link>
                </li>
                <li>
                  <Link to='/some-page'>Location Based Names</Link>
                </li>
                <li>
                  <Link to='/some-page'>Recommended For You</Link>
                </li>
                <li>
                  <Link to='/some-page'>Become A Seller</Link>
                </li>
              </ul>
            </li>
            <li
              id='2'
              onMouseEnter={() => setIsHover({ isHover: true, id: '2' })}
              onMouseLeave={() => setIsHover({ isHover: false, id: null })}
            >
              <Link to='/some-page'>
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
              </Link>
              <ul>
                <li>
                  <Link to='/some-page'>Start A Contest</Link>
                </li>
                <li>
                  <Link to='/some-page'>How It Works</Link>
                </li>
                <li>
                  <Link to='/some-page'>Contest Pricing</Link>
                </li>
                <li>
                  <Link to='/some-page'>Agency Services</Link>
                </li>
                <li>
                  <Link to='/some-page'>Our Work</Link>
                </li>
                <li>
                  <Link to='/some-page'>Recent Winners</Link>
                </li>
                <li>
                  <Link to='/some-page'>Active Contests</Link>
                </li>
                <li>
                  <Link to='/some-page'>Become A Creative</Link>
                </li>
              </ul>
            </li>
            <li
              id='3'
              onMouseEnter={() => setIsHover({ isHover: true, id: '3' })}
              onMouseLeave={() => setIsHover({ isHover: false, id: null })}
            >
              <Link to='/some-page'>
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
              </Link>
              <ul>
                <li>
                  <Link to='/some-page'>Logos</Link>
                </li>
                <li>
                  <Link to='/some-page'>Taglines</Link>
                </li>
                <li>
                  <Link to='/some-page'>Audience Testing</Link>
                </li>
                <li>
                  <Link to='/some-page'>Trademark Research</Link>
                </li>
                <li>
                  <Link to='/some-page'>Trademark Filing</Link>
                </li>
                <li>
                  <Link to='/some-page'>Video Creation</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to='/some-page'>Agency Experience</Link>
            </li>
            <li className={styles.separator_stick}>
              <div></div>
            </li>
            <li
              id='4'
              onMouseEnter={() => setIsHover({ isHover: true, id: '4' })}
              onMouseLeave={() => setIsHover({ isHover: false, id: null })}
            >
              <Link to='/some-page'>
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
              </Link>
              <ul className={styles.resources_list}>
                <li>
                  <Link to='/some-page'>Business Name Generator</Link>
                </li>
                <li>
                  <Link to='/some-page'>How to Naming Your Business</Link>
                </li>
                <li>
                  <Link to='/some-page'>Free Trademark Checker</Link>
                </li>
                <li
                  className={styles.industry_name}
                  id='5'
                  onMouseEnter={() => setIsHover({ isHover: true, id: '5' })}
                  onMouseLeave={() => setIsHover({ isHover: false, id: null })}
                >
                  <Link to='/some-page'>
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
                  </Link>
                  <ul>
                    <li>
                      <Link to='/some-page'>Clothing Brand Name Ideas</Link>
                    </li>
                    <li>
                      <Link to='/some-page'>Consulting Business Name Ideas</Link>
                    </li>
                    <li>
                      <Link to='/some-page'>
                        Health & Wellness Business Name Ideas
                      </Link>
                    </li>
                    <li>
                      <Link to='/some-page'>Food Brand Name ideas</Link>
                    </li>
                    <li>
                      <Link to='/some-page'>Beauty Business Names</Link>
                    </li>
                    <li>
                      <Link to='/some-page'>Tech Startup Name Ideas</Link>
                    </li>
                    <li>
                      <Link to='/some-page'>Shopping Website Name Ideas</Link>
                    </li>
                    <li>
                      <Link to='/some-page'>Real Estate Business Name Ideas</Link>
                    </li>
                    <li>
                      <Link to='/some-page'>Insurance Business Name Ideas</Link>
                    </li>
                    <li>
                      <Link to='/some-page'>Finance Business Name Ideas</Link>
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
