import React from 'react';
import { Formik, Form, Field } from 'formik';
import { format, isBefore } from 'date-fns';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import EventsFormInput from '../EventsFormInput';
import * as ACTION_CREATORS from '../../actions/actionCreator';
import Schems from '../../validators/validationSchems';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './EventsForm.module.sass';
import FormikDatePicker from '../EventsFormInput/FormikDatePicker';

const EventsForm = () => {
  const { createEvent } = bindActionCreators(ACTION_CREATORS, useDispatch());

  const onSubmit = (values, formikBag) => {
    if (isBefore(values.date, new Date())) {
      formikBag.setFieldError('date', 'date must not be past ');
    } else {
      formikBag.setFormikState({
        values: {
          eventName: '',
          date: new Date(),
          notificationTime: '5 minutes',
        },
        touched: {
          eventName: false,
          date: false,
          notificationTime: false,
        },
      });
      values.started = Date.now();
      values.date = format(new Date(values.date), 'yyyy-MM-dd HH:mm:ss');
      createEvent(values);
    }
  };
  return (
    <Formik
      initialValues={{
        eventName: '',
        date: new Date(),
        notificationTime: '5 minutes',
      }}
      onSubmit={onSubmit}
      validationSchema={Schems.EventSchem}
    >
      {formikProps => (
        <Form className={styles.formContainer}>
          <div className={styles.container}>
            <span className={styles.label}>Event name</span>
            <EventsFormInput
              name='eventName'
              placeholder='Event name'
              classes={{
                container: styles.inputContainer,
                input: styles.input,
                warning: styles.error,
                notValid: styles.notValid,
              }}
            />
          </div>
          <div className={styles.container}>
            <span className={styles.label}>Date</span>
            <Field
              component={FormikDatePicker}
              name='date'
              classes={{
                container: styles.inputContainer,
                input: styles.input,
                warning: styles.error,
                notValid: styles.notValid,
              }}
            />
          </div>
          <div className={styles.container}>
            <span className={styles.label}>Notification time</span>
            <EventsFormInput
              isSelect
              name='notificationTime'
              onChange={e =>
                formikProps.setFieldValue('notificationTime', e.target.value)
              }
              classes={{
                container: styles.inputContainer,
                input: styles.input,
                warning: styles.error,
                notValid: styles.notValid,
              }}
            />
          </div>
          <button type='submit'>Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default EventsForm;
