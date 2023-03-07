import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { confirmAlert } from 'react-confirm-alert';
import Rating from 'react-rating';
import CONSTANTS from '../../constants';
import * as ACTION_CREATORS from '../../actions/actionCreator';
import styles from "./OffersForModerate.module.sass"


const OffersForModerate = (props) => {
  const { offers } = useSelector(
    ({ offersStore }) => offersStore
  );
  const { setModerateOfferStatusRequest, changeShowImage } = bindActionCreators(
    ACTION_CREATORS,
    useDispatch()
  );
  const setModerateOfferStatus = (id, userId, status) => confirmAlert({
    title: 'confirm',
    message: 'Are u sure?',
    buttons: [
      {
        label: 'Yes',
        onClick: () => setModerateOfferStatusRequest(id, userId, status),
      },
      {
        label: 'No',
      },
    ],
  })
  return (
    <div className={styles.mainInfoContainer}>
      <div className={styles.offersContainer}>
        <div className={styles.offers}>
          {offers.map((offer) => <div key={offer.id} className={styles.offerContainer}>
            <div className={styles.mainInfoContainer}>
              <div className={styles.userInfo}>
                <div className={styles.creativeInfoContainer}>
                  <img
                    src={offer.User.avatar === 'anon.png' ? CONSTANTS.ANONYM_IMAGE_PATH : `${CONSTANTS.publicURL}${offer.User.avatar}`}
                    alt="user"
                  />
                  <div className={styles.nameAndEmail}>
                    <span>{`${offer.User.firstName} ${offer.User.lastName}`}</span>
                    <span>{offer.User.email}</span>
                  </div>
                </div>
                <div className={styles.creativeRating}>
                  <span className={styles.userScoreLabel}>Creative Rating </span>
                  <Rating
                    initialRating={offer.User.rating}
                    fractions={2}
                    fullSymbol={<img src={`${CONSTANTS.STATIC_IMAGES_PATH}star.png`} alt="star" />}
                    placeholderSymbol={<img src={`${CONSTANTS.STATIC_IMAGES_PATH}star.png`} alt="star" />}
                    emptySymbol={(
                      <img
                        src={`${CONSTANTS.STATIC_IMAGES_PATH}star-outline.png`}
                        alt="star-outline"
                      />
                    )}
                    readonly
                  />
                </div>
              </div>
              <div className={styles.responseConainer}>
                {
                  offer.Contest.contestType === CONSTANTS.LOGO_CONTEST
                    ? (
                      <img
                        onClick={() => changeShowImage({ imagePath: offer.fileName, isShowOnFull: true })}
                        className={styles.responseLogo}
                        src={`${CONSTANTS.CONTESTS_DEFAULT_DIR}${offer.fileName}`}
                        alt="logo"
                      />
                    )
                    : <span className={styles.response}>{offer.text}</span>
                }
              </div>
            </div>
            <div className={styles.btnsContainer}>
              <div onClick={() => setModerateOfferStatus(offer.id, offer.Contest.userId, 'confirmed')} className={styles.resolveBtn}>Confirm</div>
              <div onClick={() => setModerateOfferStatus(offer.id, offer.Contest.userId, 'rejected')} className={styles.rejectBtn}>Reject</div>
            </div>
          </div>)}
        </div>
      </div>
    </div>
  );
}

export default OffersForModerate;
