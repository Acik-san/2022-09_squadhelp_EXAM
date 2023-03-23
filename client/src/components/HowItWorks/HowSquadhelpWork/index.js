import React from 'react';
import CONSTANTS from '../../../constants';
import styles from './HowSquadhelpWork.module.sass';

const HowSquadhelpWork = () => {
  return (
    <section className={styles.how_squadhelp_work}>
      <div className={styles.wrapper_container}>
        <div className={styles.inner_container}>
          <span></span>
          <article>
            <h1>How Does Squadhelp Work?</h1>
            <p>
              Squadhelp helps you come up with a great name for your business by
              combining the power of crowdsourcing with sophisticated technology
              and Agency-level validation services.
            </p>
          </article>
          <button>
            <small className='fas fa-play mr-2'></small>Play Video
          </button>
        </div>
        <img
          src={`${CONSTANTS.STATIC_IMAGES_PATH}howItWorks/howSquadhelpWork/how_squadhelp_work.svg`}
          alt='how_squadhelp_work'
          className={styles.how_squadhelp_work_img}
        />
      </div>
    </section>
  );
};

export default HowSquadhelpWork;
