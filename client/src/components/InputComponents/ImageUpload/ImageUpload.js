import React from 'react';

const ImageUpload = props => {
  const {
    name,
    formikProps,
    classes: { uploadContainer, inputContainer, imgStyle, imgNone },
  } = props;
  const onChange = e => {
    if (e.target.files[0].type.match(/image.png|gif|jpeg/)) {
      formikProps.setFieldValue(name, e.target.files[0]);
    }
    const reader = new FileReader();
    reader.onload = () => {
      window.document.getElementById('imagePreview').src = reader.result;
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  return (
    <div className={uploadContainer}>
      <div className={inputContainer}>
        <span>Support only images (*.png, *.gif, *.jpeg)</span>
        <input
          name={name}
          id='fileInput'
          type='file'
          accept='.png, .gif, .jpeg'
          onChange={onChange}
        />
        <label htmlFor='fileInput'>Choose file</label>
      </div>
      <img
        id='imagePreview'
        className={formikProps.values[name] ? imgStyle : imgNone}
        alt='user'
      />
    </div>
  );
};

export default ImageUpload;
