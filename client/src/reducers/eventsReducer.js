import ACTION from '../actions/actionTypes';

const eventsFromLocalStorage = JSON.parse(localStorage.getItem('events'));
const finishedEventsFromLocalStorage = JSON.parse(
  localStorage.getItem('finishedEvents')
);

const initialState = {
  isFetching: false,
  error: null,
  events: eventsFromLocalStorage ? eventsFromLocalStorage : [],
  finishedEvents: finishedEventsFromLocalStorage
    ? finishedEventsFromLocalStorage
    : [],
};

const eventsReducer = (state = initialState, action) => {
  const { events, finishedEvents } = state;
  switch (action.type) {
    case ACTION.CREATE_EVENT: {
      const { data } = action.payload;
      localStorage.setItem('events', JSON.stringify([...events, { ...data }]));
      return { ...state, events: [...events, { ...data }] };
    }

    case ACTION.SET_FINISHED_EVENT: {
      const { event } = action.payload;
      const eventsFiltered = events.filter(e => e !== event);
      localStorage.setItem('events', JSON.stringify(eventsFiltered));
      localStorage.setItem(
        'finishedEvents',
        JSON.stringify([...finishedEvents, event])
      );
      return {
        ...state,
        events: eventsFiltered,
        finishedEvents: [...finishedEvents, event],
      };
    }
    case ACTION.CLEAR_FINISHED_EVENT: {
      const { event } = action.payload;
      const finishedEventsFiltered = finishedEvents.filter(e => e !== event);
      localStorage.setItem(
        'finishedEvents',
        JSON.stringify(finishedEventsFiltered)
      );
      return { ...state, finishedEvents: finishedEventsFiltered };
    }

    default:
      return state;
  }
};

export default eventsReducer;
