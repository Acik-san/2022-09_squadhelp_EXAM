import React from 'react';
import { useFormikContext, ErrorMessage, useField, Field } from 'formik';
import { format, isBefore } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import classNames from 'classnames';

const FormikDatePicker = ({ field: { name }, classes }) => {
  const { setFieldValue, values } = useFormikContext();
  const [field, meta] = useField(name);
  const selectedDate = values[name];
  const handleChange = date => {
    if (isBefore(date, new Date())) {
      return;
    }
    setFieldValue(name, date);
  };
  const inputClassName = classNames(classes.input, {
    [classes.notValid]: meta.touched && meta.error,
    [classes.valid]: meta.touched && !meta.error,
  });
  return (
    <div className={classes.container}>
      <DatePicker
        selected={selectedDate}
        onChange={handleChange}
        onCalendarOpen={() =>
          setFieldValue(name, new Date())
        }
        timeInputLabel='Time:'
        dateFormat='yyyy/MM/dd h:mm:ss aa'
        customInput={<input className={inputClassName} />}
        showTimeInput
        minDate={new Date()}
        maxDate={new Date(Date.now() + 206182018315)}
      />
      <ErrorMessage name={name} component='span' className={classes.warning} />
    </div>
  );
};

export default FormikDatePicker;
