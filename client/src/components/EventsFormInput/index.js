import React from 'react';
import InputMask from 'react-input-mask';
import { ErrorMessage, useField, Field } from 'formik';
import classNames from 'classnames';

const EventsFormInput = props => {
  const { name, placeholder, isInputMask, isSelect, mask,classes } = props;
  const [field, meta] = useField(name);
  const inputClassName = classNames(classes.input, {
    [classes.notValid]: meta.touched && meta.error,
    [classes.valid]: meta.touched && !meta.error,
  });
  if (isInputMask) {
    return (
      <div className={classes.container}>
        <InputMask
          mask={mask}
          maskChar={null}
          {...field}
          placeholder={placeholder}
          className={inputClassName}
        />
        <ErrorMessage name={name} component='span' className={classes.warning}/>
      </div>
    );
  }
  if (isSelect) {
    return (
      <div className={classes.container}>
        <Field as='select' name={name} className={inputClassName}>
          <option value='1 day'>1 day</option>
          <option value='1 hour'>1 hour</option>
          <option value='5 minutes'>5 min</option>
          <option value='1 minute'>1 min</option>
        </Field>
      </div>
    );
  }
  return (
    <div className={classes.container}>
      <input {...field} placeholder={placeholder} className={inputClassName}/>
      <ErrorMessage name={name} component='span' className={classes.warning}/>
    </div>
  );
};

export default EventsFormInput;
