import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import LightBox from 'react-image-lightbox';
import Header from '../../components/Header/Header';
import OffersForModerate from '../../components/OffersForModerate';
import CONSTANTS from '../../constants';
import * as ACTION_CREATORS from '../../actions/actionCreator';

const OffersPage = (props) => {
  const { history } = props;
  const {
    data: { role },
  } = useSelector(({ userStore }) => userStore);
  const { isFetching, offers, haveMore, limit, offset } = useSelector(
    ({ offersStore }) => offersStore
  );
  const { isShowOnFull, imagePath } = useSelector(
    ({ contestByIdStore }) => contestByIdStore
  );
  const { getOffersRequest, clearOffers, changeShowImage } = bindActionCreators(
    ACTION_CREATORS,
    useDispatch()
  );
  const handlerScroll = () => {
    window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight && haveMore && getOffersRequest(limit, offset)
  }
  useEffect(() => {
    getOffersRequest(limit, offset)
    return () => {
      clearOffers()
    }
  }, []);
  useEffect(() => {
    window.addEventListener("scroll", handlerScroll)
    return () => {
      window.removeEventListener("scroll", handlerScroll)
    }
  }, [offset]
  )
  return (
    <>
      {isShowOnFull && (
        <LightBox
          mainSrc={`${CONSTANTS.CONTESTS_DEFAULT_DIR}${imagePath}`}
          onCloseRequest={() => changeShowImage({ isShowOnFull: false, imagePath: null })}
        />
      )}
      <Header />
      {role !== 'moderator' ? (
        history.replace('./')
      ) : (
        <OffersForModerate offers={offers} isFetching={isFetching} />
      )
      }
    </>
  );
}

export default OffersPage;
