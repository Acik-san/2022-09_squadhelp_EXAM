import React from 'react';
import { Formik, Form } from 'formik';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import EventsFormInput from '../EventsFormInput';
import * as ACTION_CREATORS from '../../actions/actionCreator';
import Schems from '../../validators/validationSchems';
import styles from './EventsForm.module.sass';

const EventsForm = () => {
  const { createEvent } = bindActionCreators(ACTION_CREATORS, useDispatch());

  const onSubmit = (values, formikBag) => {
    createEvent(values);
    formikBag.resetForm();
  };
  return (
    <Formik
      initialValues={{
        eventName: '',
        date: '2023-12-31 23:59:59',
        started: Date.now(),
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
            <EventsFormInput
              isInputMask
              mask='9999-99-99 99:99:99'
              name='date'
              placeholder='Date'
              type='text'
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
