import ACTION from '../actions/actionTypes';

const initialState = {
  bundle: null,
  title: null,
};

const bundleReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION.SELECT_BUNDLE_ACTION: {
      return {
        bundle: action.payload.bundle,
        title: action.payload.title,
      };
    }
    case ACTION.CLEAR_BUNDLE_ACTION: {
      return {
        bundle: null,
        title: null,
      };
    }
    default:
      return state;
  }
};

export default bundleReducer;
