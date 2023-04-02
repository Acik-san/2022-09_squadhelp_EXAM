import React from 'react';
import { Link } from 'react-router-dom';
import CONSTANTS from '../../../constants';
import styles from './Pricing.module.sass';

const Pricing = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.info}>
          <div className={styles.wrapper}>
            <span className='fas fa-angle-right btn-icon__inner'></span>
            <article>
              <h3>Pay a Fraction of cost vs hiring an agency</h3>
              <p>
                For as low as $199, our naming contests and marketplace allow
                you to get an amazing brand quickly and affordably.
              </p>
            </article>
          </div>
          <div className={styles.wrapper}>
            <span className='fas fa-angle-right btn-icon__inner'></span>
            <article>
              <h3>Satisfaction Guarantee</h3>
              <p>
                Of course! We have policies in place to ensure that you are
                satisfied with your experience. <span>Learn more</span>
              </p>
            </article>
          </div>
        </div>
        <div className={styles.questions}>
          <h3>Questions?</h3>
          <p>
            Speak with a Squadhelp platform expert to learn more and get your
            questions answered.
          </p>
          <button>Schedule Consultation</button>
          <Link to='/somwhere'>
            <img
              src={`${CONSTANTS.STATIC_IMAGES_PATH}howItWorks/pricing/phone_with_arrow.svg`}
              alt='phone_with_arrow'
            />
            <span>(877) 355-3585</span>
          </Link>
          <span>Call us for assistance</span>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
