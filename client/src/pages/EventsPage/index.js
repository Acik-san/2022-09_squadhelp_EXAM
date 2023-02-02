import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compareAsc } from 'date-fns';
import classNames from 'classnames';
import Header from '../../components/Header/Header';
import EventsForm from '../../components/EventsForm';
import EventsTimer from '../../components/EventsTimers';
import { toCorrectDate } from '../../utils/functions';
import CONSTANTS from '../../constants';
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
        <section>
          <EventsForm />
          <div className={styles.main_container}>
            <div className={styles.filter_container}>
              <div
                className={classNames({
                  [styles.active_filter]: isUpcomingEvents,
                  [styles.filter]: !isUpcomingEvents,
                })}
                onClick={() => setFilter({ isUpcomingEvents: true })}
              >
                Upcoming events
              </div>
              <div
                className={classNames({
                  [styles.active_filter]: !isUpcomingEvents,
                  [styles.filter]: isUpcomingEvents,
                })}
                onClick={() => setFilter({ isUpcomingEvents: false })}
              >
                Finished events{' '}
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}eventsTimer/finished_events.svg`}
                  alt='finished_events'
                  className={styles.finished_events_badge}
                ></img>
                <div
                  className={classNames({
                    [styles.finished_events_less_10]:
                      finishedEvents.length < 10,
                    [styles.finished_events_less_100]:
                      finishedEvents.length > 9 && finishedEvents.length < 100,
                    [styles.finished_events_more_99]:
                      finishedEvents.length > 99,
                  })}
                >
                  {finishedEvents.length > 99
                    ? CONSTANTS.FINISHED_EVENTS_MORE_THEN_99
                    : finishedEvents.length}
                </div>
              </div>
            </div>
            <div className={styles.events_container}>
              {isUpcomingEvents && (
                <div className={styles.event_box}>
                  <div className={styles.events_title}>
                    <h2>Live upcoming checks</h2>
                    <span>
                      Remaining time
                      <img
                        src={`${CONSTANTS.STATIC_IMAGES_PATH}eventsTimer/remaining_time.svg`}
                        alt='remaining_time'
                        className={styles.remaining_time}
                      ></img>
                    </span>
                  </div>
                  <ul className={styles.events_list}>
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
                </div>
              )}
              {!isUpcomingEvents && (
                <div className={styles.event_box}>
                  <div className={styles.events_title}>
                    <h2> Finished events</h2>
                  </div>
                  <ul className={styles.events_list}>
                    {finishedEvents &&
                      finishedEvents.map(e => (
                        <li
                          key={Math.random() + Date.now()}
                          className={styles.progress_line_bg}
                        >
                          <h3 className={styles.event_name}>{e.eventName}</h3>
                          <img
                            src={`${CONSTANTS.STATIC_IMAGES_PATH}eventsTimer/clear_event.svg`}
                            alt='clear_event'
                            onClick={() => clearFinishedEvent(e)}
                            className={styles.clear_event}
                          />
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default EventsPage;
