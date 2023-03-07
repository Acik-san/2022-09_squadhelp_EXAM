import ACTION from '../actions/actionTypes';

const initialState = {
  isFetching: false,
  error: null,
  offers: []
}

const offersReducer = (state = initialState, action) => {
  const { offers } = state
  switch (action.type) {
    case ACTION.GET_OFFERS_REQUEST: {
      return { ...state, isFetching: true }
    }
    case ACTION.GET_OFFERS_SUCCESS: {
      const { newOffers } = action.payload
      return { ...state, isFetching: false, offers: [...offers, ...newOffers] }
    }
    case ACTION.GET_OFFERS_ERROR: {
      const { error } = action.payload
      return { ...state, isFetching: false, error }
    }
    case ACTION.CLEAR_OFFERS: {
      return { ...state, offers: [] }
    }
    case ACTION.SET_MODERATE_OFFER_STATUS_REQUEST: {
      return { ...state, isFetching: true }
    }
    case ACTION.SET_MODERATE_OFFER_STATUS_SUCCESS: {
      const { offerId } = action.payload
      return { ...state, isFetching: false, offers: offers.filter((offer) => offer.id !== offerId) }
    }
    case ACTION.SET_MODERATE_OFFER_STATUS_ERROR: {
      const { error } = action.payload
      return { ...state, isFetching: false, error }
    }
    default:
      return state;
  }
}

export default offersReducer;