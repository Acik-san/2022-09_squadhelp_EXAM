import React from 'react';
import InputMask from 'react-input-mask';
import { ErrorMessage, useField, Field } from 'formik';

const EventsFormInput = props => {
  const { name, placeholder, isInputMask, isSelect, mask } = props;
  const [field, meta] = useField(name);
  if (isInputMask) {
    return (
      <>
        <InputMask
          mask={mask}
          maskChar={null}
          {...field}
          placeholder={placeholder}
        />
        <ErrorMessage name={name} component='span' />
      </>
    );
  }
  if (isSelect) {
    return (
      <>
        <Field as='select' name={name}>
          <option value='1 day'>1 day</option>
          <option value='1 hour'>1 hour</option>
          <option value='5 minutes'>5 min</option>
          <option value='1 minute'>1 min</option>
        </Field>
      </>
    );
  }
  return (
    <>
      <input {...field} placeholder={placeholder} />
      <ErrorMessage name={name} component='span' />
    </>
  );
};

export default EventsFormInput;
