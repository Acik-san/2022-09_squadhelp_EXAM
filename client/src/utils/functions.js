export const toCorrectDate = date => {
  return new Date(
    ...date.split(' ')[0].split('-'),
    ...date.split(' ')[1].split(':')
  );
};

export const toCorrectMonth = date => {
  const arrayOfYearsMonthsDays = date.split(' ')[0].split('-');
  const month = (arrayOfYearsMonthsDays[1] =
    Number(arrayOfYearsMonthsDays[1]) - 1);
  for (let i = 0; i < arrayOfYearsMonthsDays.length; i++) {
    if (i === 1) {
      arrayOfYearsMonthsDays[1] =
        month >= 0 && month < 10 ? `0${month}` : month.toString();
    }
  }

  return arrayOfYearsMonthsDays.join('-') + ' ' + date.split(' ')[1];
};

export const toNotificationDate = (date, notificationTime) => {
  const arrayOfYearsMonthsDays = date.split(' ')[0].split('-');
  const arrayOfHoursMinutesSeconds = date.split(' ')[1].split(':');
  if (notificationTime.split(' ')[1] === 'day') {
    const day = (arrayOfYearsMonthsDays[2] =
      Number(arrayOfYearsMonthsDays[2]) -
      Number(notificationTime.split(' ')[0]));
    arrayOfYearsMonthsDays.forEach((v, i) => (i === 2 ? (v = day) : null));
  }
  if (notificationTime.split(' ')[1] === 'hour') {
    const hours = (arrayOfHoursMinutesSeconds[0] =
      Number(arrayOfHoursMinutesSeconds[0]) -
      Number(notificationTime.split(' ')[0]));
    arrayOfHoursMinutesSeconds.forEach((v, i) =>
      i === 0 ? (v = hours) : null
    );
  }
  if (
    notificationTime.split(' ')[1] === 'minutes' ||
    notificationTime.split(' ')[1] === 'minute'
  ) {
    const minutes = (arrayOfHoursMinutesSeconds[1] =
      Number(arrayOfHoursMinutesSeconds[1]) -
      Number(notificationTime.split(' ')[0]));
    arrayOfHoursMinutesSeconds.forEach((v, i) =>
      i === 1 ? (v = minutes) : null
    );
  }
  return new Date(...arrayOfYearsMonthsDays, ...arrayOfHoursMinutesSeconds);
};

// const abu = distance =>
//   distance === '0 seconds'
//     ? confirmAlert({
//         title: 'Upcoming event',
//         message: `Your event will upcome in ${event.notificationTime}`,
//         buttons: [{ label: 'Ok' }],
//         closeOnEscape: false,
//         closeOnClickOutside: false,
//       })
//     : null;
