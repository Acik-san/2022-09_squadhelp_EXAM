import React, { useState, useEffect } from 'react';
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

  const [finishTime] = useState(toCorrectDate(toCorrectMonth(event.date)));
  const [
    [diffYears, diffMonths, diffDays, diffH, diffM, diffS],
    setDiff,
  ] = useState([0, 0, 0, 0, 0, 0]);
  const [tick, setTick] = useState(false);
  const [isTimeout, setIsTimeout] = useState(false);
  const [timerId, setTimerID] = useState(0);

  useEffect(() => {
    const diff = differenceInMilliseconds(finishTime, Date.now());
    if (diff < 0) {
      setIsTimeout(true);
      return;
    }

    setDiff([
      ...Object.values(
        intervalToDuration({
          start: Date.now(),
          end: finishTime,
        })
      ),
    ]);
  }, [tick, finishTime]);

  useEffect(() => {
    if (isTimeout) {
      eventFinished(event);
      clearInterval(timerId);
    } // eslint-disable-next-line
  }, [isTimeout, timerId]);

  useEffect(() => {
    const timerID = setInterval(() => {
      setTick(!tick);
    }, 1000);
    setTimerID(timerID);
    return () => clearInterval(timerID);
  }, [tick]);

  useEffect(() => {
    const elem = document.getElementById(progressLine);
    const one =
      differenceInMilliseconds(finishTime, new Date(event.started)) / 100;
    const diff = differenceInMilliseconds(
      new Date(Date.now()),
      new Date(event.started)
    );
    let width = 0;
    diff < one * 10
      ? (width = 1)
      : diff > one * 10 && diff < one * 20
      ? (width = 15)
      : diff > one * 20 && diff < one * 30
      ? (width = 25)
      : diff > one * 30 && diff < one * 40
      ? (width = 35)
      : diff > one * 40 && diff < one * 50
      ? (width = 45)
      : diff > one * 50 && diff < one * 60
      ? (width = 55)
      : diff > one * 60 && diff < one * 70
      ? (width = 65)
      : diff > one * 70 && diff < one * 80
      ? (width = 75)
      : diff > one * 80 && diff < one * 90
      ? (width = 85)
      : (width = 95);

    elem.style.width = width + '%';

    const progressStatus = () => {
      if (width >= 99) {
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

  const progressLine = `progress_line${event.started + Math.random()}`;
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
      <div className={styles.progress_line} id={progressLine}></div>
    </div>
  );
};

export default EventsTimer;
