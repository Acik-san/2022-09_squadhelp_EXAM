import { useState } from 'react';
import classNames from 'classnames';
import CONSTANTS from '../../constants';
import styles from './ButtonGroup.module.sass';

const {BUTTON_GROUP} = CONSTANTS;

const ButtonGroup = () => {
  const [isChecked, setIsChecked] = useState(1);
  return (
    <div className={styles.buttonGroup}>
      <h3 className={styles.heading}>
        Do you want a matching domain (.com URL) with your name?
      </h3>
      <p className={styles.headingText}>
        If you want a matching domain, our platform will only accept those name
        suggestions where the domain is available. (Recommended)
      </p>
      <div className={styles.buttonsContainer}>
        {BUTTON_GROUP.map(({ id, heading, text }) => (
          <div
            className={classNames({
              [styles.button]: id !== isChecked,
              [styles.buttonChecked]: id === isChecked,
            })}
            key={id}
            onClick={() => setIsChecked(id)}
          >
            <span
              className={classNames({
                [styles.badge]: id !== isChecked,
                [styles.badgeChecked]: id === isChecked,
              })}
            >
              {heading}
            </span>
            <p className={styles.buttonText}>{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ButtonGroup;
