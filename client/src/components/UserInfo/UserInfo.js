import React from 'react';
import { connect } from 'react-redux';
import UpdateUserInfoForm from '../UpdateUserInfoForm/UpdateUserInfoForm';
import {
  updateUserData,
  changeEditModeOnUserProfile,
} from '../../actions/actionCreator';
import CONSTANTS from '../../constants';
import styles from './UserInfo.module.sass';

const { ANONYM_IMAGE_PATH, publicURL, USER_INFO, CREATOR } = CONSTANTS;

const UserInfo = props => {
  const { isEdit, changeEditMode, data } = props;

  const updateUserData = values => {
    const formData = new FormData();
    Object.keys(values).map(key => formData.append(key, values[key]));
    props.updateUser(formData);
  };

  const mapUserInfo = array =>
    array.map(key => (
      <div className={styles.infoBlock} key={key}>
        <span className={styles.label}>{USER_INFO[key]}</span>
        <span className={styles.info}>{data[key]}</span>
      </div>
    ));
  return (
    <div className={styles.mainContainer}>
      {isEdit ? (
        <UpdateUserInfoForm onSubmit={updateUserData} />
      ) : (
        <div className={styles.infoContainer}>
          <img
            src={
              data.avatar === 'anon.png'
                ? ANONYM_IMAGE_PATH
                : `${publicURL}${data.avatar}`
            }
            className={styles.avatar}
            alt='user'
          />
          <div className={styles.infoContainer}>
            {data.role !== CREATOR
              ? mapUserInfo(
                  Object.keys(USER_INFO).filter(key => key !== 'balance')
                )
              : mapUserInfo(Object.keys(USER_INFO))}
          </div>
        </div>
      )}
      <div
        onClick={() => changeEditMode(!isEdit)}
        className={styles.buttonEdit}
      >
        {isEdit ? 'Cancel' : 'Edit'}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  const { data } = state.userStore;
  const { isEdit } = state.userProfile;
  return { data, isEdit };
};

const mapDispatchToProps = dispatch => ({
  updateUser: data => dispatch(updateUserData(data)),
  changeEditMode: data => dispatch(changeEditModeOnUserProfile(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
