import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compareAsc } from 'date-fns';
import classNames from 'classnames';
import Header from '../../components/Header/Header';
import EventsForm from '../../components/EventsForm';
import EventsTimer from '../../components/EventsTimers';
import { toCorrectDate } from '../../utils/functions';
import * as ACTION_CREATORS from '../../actions/actionCreator';
import styles from './EventsPage.module.sass';

const EventsPage = props => {
  const { history } = props;
  const [filter, setFilter] = useState({ isUpcomingEvents: true });
  const { isUpcomingEvents } = filter;
  const {
    data: { role },
  } = useSelector(({ userStore }) => userStore);
  const { events, finishedEvents } = useSelector(
    ({ eventsStore }) => eventsStore
  );
  const { clearFinishedEvent } = bindActionCreators(
    ACTION_CREATORS,
    useDispatch()
  );
  
  

  return (
    <>
      <Header />
      {role === 'creator' ? (
        history.replace('./')
      ) : (
        <div>
          <EventsForm />
          <div className={styles.mainContainer}>
            <div className={styles.filterContainer}>
              <div
                className={classNames({
                  [styles.activeFilter]: isUpcomingEvents,
                  [styles.filter]: !isUpcomingEvents,
                })}
                onClick={() => setFilter({ isUpcomingEvents: true })}
              >
                Upcoming events
              </div>
              <div
                className={classNames({
                  [styles.activeFilter]: !isUpcomingEvents,
                  [styles.filter]: isUpcomingEvents,
                })}
                onClick={() => setFilter({ isUpcomingEvents: false })}
              >
                Finished events{' '}
                {finishedEvents.length > 0 && finishedEvents.length}
              </div>
            </div>
            <div className={styles.eventsContainer}>
              {isUpcomingEvents && (
                <ul>
                  Live upcoming checks:
                  {events &&
                    events
                      .sort((event, nextEvent) =>
                        compareAsc(
                          toCorrectDate(event.date),
                          toCorrectDate(nextEvent.date)
                        )
                      )
                      .map(e => (
                        <li key={Math.random() + Date.now()}>
                          <EventsTimer event={e} />
                        </li>
                      ))}
                </ul>
              )}
              {!isUpcomingEvents && (
                <ul>
                  Finished events:
                  {finishedEvents &&
                    finishedEvents.map(e => (
                      <li key={Math.random() + Date.now()}>
                        {e.eventName}
                        <button onClick={() => clearFinishedEvent(e)}>X</button>
                      </li>
                    ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EventsPage;
