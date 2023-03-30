import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { confirmAlert } from 'react-confirm-alert';
import Rating from 'react-rating';
import Spinner from '../Spinner/Spinner';
import CONSTANTS from '../../constants';
import * as ACTION_CREATORS from '../../actions/actionCreator';
import styles from './OffersForModerate.module.sass';

const OffersForModerate = props => {
  const { offers, isFetching } = props;
  const { setModerateOfferStatusRequest, changeShowImage } = bindActionCreators(
    ACTION_CREATORS,
    useDispatch()
  );
  const setModerateOfferStatus = (id, userId, status, email, firstName) =>
    confirmAlert({
      title: 'confirm',
      message: 'Are u sure?',
      buttons: [
        {
          label: 'Yes',
          onClick: () =>
            setModerateOfferStatusRequest(id, userId, status, email, firstName),
        },
        {
          label: 'No',
        },
      ],
    });
  return (
    <div className={styles.offersContainer}>
      <div className={styles.offers}>
        {offers.map(
          ({
            id,
            fileName,
            text,
            Contest: { contestType, userId },
            User: { avatar, firstName, lastName, email, rating },
          }) => (
            <div key={id} className={styles.offerContainer}>
              <div className={styles.mainInfoContainer}>
                <div className={styles.userInfo}>
                  <div className={styles.creativeInfoContainer}>
                    <img
                      src={
                        avatar === 'anon.png'
                          ? CONSTANTS.ANONYM_IMAGE_PATH
                          : `${CONSTANTS.publicURL}${avatar}`
                      }
                      alt='user'
                    />
                    <div className={styles.nameAndEmail}>
                      <span>{`${firstName} ${lastName}`}</span>
                      <span>{email}</span>
                    </div>
                  </div>
                  <div className={styles.creativeRating}>
                    <span className={styles.userScoreLabel}>
                      Creative Rating{' '}
                    </span>
                    <Rating
                      initialRating={rating}
                      fractions={2}
                      fullSymbol={
                        <img
                          src={`${CONSTANTS.STATIC_IMAGES_PATH}star.png`}
                          alt='star'
                        />
                      }
                      placeholderSymbol={
                        <img
                          src={`${CONSTANTS.STATIC_IMAGES_PATH}star.png`}
                          alt='star'
                        />
                      }
                      emptySymbol={
                        <img
                          src={`${CONSTANTS.STATIC_IMAGES_PATH}star-outline.png`}
                          alt='star-outline'
                        />
                      }
                      readonly
                    />
                  </div>
                </div>
                <div className={styles.responseConainer}>
                  {contestType === CONSTANTS.LOGO_CONTEST ? (
                    <img
                      onClick={() =>
                        changeShowImage({
                          imagePath: fileName,
                          isShowOnFull: true,
                        })
                      }
                      className={styles.responseLogo}
                      src={`${CONSTANTS.CONTESTS_DEFAULT_DIR}${fileName}`}
                      alt='logo'
                    />
                  ) : (
                    <span className={styles.response}>{text}</span>
                  )}
                </div>
              </div>
              <div className={styles.btnsContainer}>
                <div
                  onClick={() =>
                    setModerateOfferStatus(
                      id,
                      userId,
                      'confirmed',
                      email,
                      firstName
                    )
                  }
                  className={styles.resolveBtn}
                >
                  Confirm
                </div>
                <div
                  onClick={() =>
                    setModerateOfferStatus(
                      id,
                      userId,
                      'rejected',
                      email,
                      firstName
                    )
                  }
                  className={styles.rejectBtn}
                >
                  Reject
                </div>
              </div>
            </div>
          )
        )}
      </div>
      {isFetching && (
        <div className={styles.spinnerContainer}>
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default OffersForModerate;
