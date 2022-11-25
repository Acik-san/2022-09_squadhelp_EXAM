import React from 'react';
import { Field } from 'formik';

const FieldFileInput = ({ classes, formikProps, ...rest }) => {
  const { fileUploadContainer, labelClass, fileNameClass, fileInput } = classes;
  return (
    <Field name={rest.name}>
      {props => {
        const { field } = props;
        const handleInput = e =>
          formikProps.setFieldValue(field.name, e.target.files[0]);
        const getFileName = () => (field.value ? field.value.name : '');
        return (
          <div className={fileUploadContainer}>
            <label htmlFor='fileInput' className={labelClass}>
              Choose file
            </label>
            <span id='fileNameContainer' className={fileNameClass}>
              {getFileName()}
            </span>
            <input
              name={field.name}
              className={fileInput}
              id='fileInput'
              type='file'
              onChange={handleInput}
            />
          </div>
        );
      }}
    </Field>
  );
};

export default FieldFileInput;
