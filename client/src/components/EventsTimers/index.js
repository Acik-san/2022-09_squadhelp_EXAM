import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  intervalToDuration,
  differenceInMilliseconds,
  formatDistanceStrict,
} from 'date-fns';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {
  toCorrectDate,
  toCorrectMonth,
  toNotificationDate,
} from '../../utils/functions';
import * as ACTION_CREATORS from '../../actions/actionCreator';
import styles from './EventTimers.module.sass';

const EventsTimer = props => {
  const { event } = props;
  const { eventFinished } = bindActionCreators(ACTION_CREATORS, useDispatch());

  const [[diffYears, diffMonths, diffDays, diffH, diffM, diffS], setDiff] =
    useState([0, 0, 0, 0, 0, 0]);
  const [isTimeout, setIsTimeout] = useState(false);
  const timerId = useRef(0);
  const finishTime = useRef(toCorrectDate(toCorrectMonth(event.date)));
  const progressLine = useRef(
    `progress_line${event.eventName + event.started + Math.random()}`
  );

  const recalculateDiff = useCallback(() => {
    const diff = differenceInMilliseconds(finishTime.current, Date.now());
    if (diff < 0) {
      setIsTimeout(true);
      return;
    }

    setDiff([
      ...Object.values(
        intervalToDuration({
          start: Date.now(),
          end: finishTime.current,
        })
      ),
    ]);
  }, [finishTime.current]);

  useEffect(() => {
    timerId.current = setInterval(() => {
      recalculateDiff();
    }, 1000);
    return () => clearInterval(timerId.current);
  }, []);

  useEffect(() => {
    if (isTimeout) {
      eventFinished(event);
      clearInterval(timerId);
    } // eslint-disable-next-line
  }, [isTimeout, timerId]);

  useEffect(() => {
    const elem = document.getElementById(progressLine.current);
    const one =
      differenceInMilliseconds(finishTime.current, new Date(event.started)) /
      100;
    const diff = differenceInMilliseconds(
      new Date(Date.now()),
      new Date(event.started)
    );

    let width = 0;
    const ranges = new Array(99)
      .fill(null)
      .map(
        (range, i) =>
          (range = { start: i * one, end: one * (i + 1), width: i + 1 })
      );

    for (const range of ranges) {
      if (diff >= range.start && diff < range.end) {
        width = range.width;
        break;
      }
    }

    elem.style.width = width + '%';

    const progressStatus = () => {
      if (width >= 99) {
        width = 99;
        clearInterval(id);
      }
      width++;
      elem.style.width = width + '%';
    };
    const id = setInterval(progressStatus, one);
    return () => {
      clearInterval(id);
    }; // eslint-disable-next-line
  }, []);

  return (
    <div className={styles.progress_line_bg}>
      {formatDistanceStrict(
        Date.now(),
        toNotificationDate(toCorrectMonth(event.date), event.notificationTime)
      ) === '0 seconds'
        ? confirmAlert({
            title: 'Upcoming event',
            message: `Your event will upcome in ${event.notificationTime}`,
            buttons: [{ label: 'Ok' }],
            closeOnEscape: false,
            closeOnClickOutside: false,
          })
        : null}
      <h3 className={styles.event_name}>{event.eventName}</h3>
      <div className={styles.timer}>
        {diffYears > 0 ? diffYears + 'y : ' : null}
        {diffMonths > 0 ? diffMonths + 'mth : ' : null}
        {diffDays > 0 ? diffDays + 'd : ' : null}
        {diffH > 0 ? diffH + 'h : ' : null}
        {diffM > 0 ? diffM + 'm : ' : null}
        {diffS + 's'}
      </div>
      <div className={styles.progress_line} id={progressLine.current}></div>
    </div>
  );
};

export default EventsTimer;
