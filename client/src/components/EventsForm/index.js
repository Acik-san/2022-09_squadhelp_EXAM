import React from 'react';
import { Formik, Form } from 'formik';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import EventsFormInput from '../EventsFormInput';
import * as ACTION_CREATORS from '../../actions/actionCreator';
import Schems from '../../validators/validationSchems';

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
        date: '2022-12-31 23:59:59',
        started: Date.now(),
        notificationTime: '5 minutes',
      }}
      onSubmit={onSubmit}
      validationSchema={Schems.EventSchem}
    >
      {formikProps => (
        <Form style={{ textAlign: 'center', marginBottom: '20px' }}>
          <EventsFormInput name='eventName' placeholder='Event name' />
          <EventsFormInput
            isInputMask
            mask='9999-99-99 99:99:99'
            name='date'
            placeholder='Date'
            type='text'
          />
          <EventsFormInput
            isSelect
            name='notificationTime'
            onChange={e =>
              formikProps.setFieldValue('notificationTime', e.target.value)
            }
          />
          <button type='submit'>Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default EventsForm;
