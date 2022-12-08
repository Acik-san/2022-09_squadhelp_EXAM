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
    }
  }, [isTimeout, timerId]);

  useEffect(() => {
    const timerID = setInterval(() => {
      setTick(!tick);
    }, 1000);
    setTimerID(timerID);
    return () => clearInterval(timerID);
  }, [tick]);

  return (
    <>
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
      <h3>{event.eventName}</h3>
      <div>
        {diffYears > 0 ? diffYears + 'y : ' : null}
        {diffMonths > 0 ? diffMonths + 'mth : ' : null}
        {diffDays > 0 ? diffDays + 'd : ' : null}
        {diffH > 0 ? diffH + 'h : ' : null}
        {diffM > 0 ? diffM + 'm : ' : null}
        {diffS + 's'}
      </div>
    </>
  );
};

export default EventsTimer;
