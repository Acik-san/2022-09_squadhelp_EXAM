import React from 'react';
import classNames from 'classnames';
import styles from './DialogBox.module.sass';
import CONSTANTS from '../../../../constants';

const DialogBox = (props) => {
  const {
    chatPreview,
    userId,
    getTimeStr,
    changeFavorite,
    changeBlackList,
    catalogOperation,
    goToExpandedDialog,
    chatMode,
    interlocutor,
  } = props;
  const {
    favoriteList, participants, blackList, id, text, createdAt,
  } = chatPreview;
  const isFavorite = favoriteList[participants.indexOf(userId)];
  const isBlocked = blackList[participants.indexOf(userId)];
  return (
    <div
      className={styles.previewChatBox}
      onClick={() => goToExpandedDialog({
        interlocutor,
        conversationData: {
          participants,
          id,
          blackList,
          favoriteList,
        },
      })}
    >
      <img
        src={interlocutor.avatar === 'anon.png' ? CONSTANTS.ANONYM_IMAGE_PATH : `${CONSTANTS.publicURL}${interlocutor.avatar}`}
        alt="user"
      />
      <div className={styles.infoContainer}>
        <div className={styles.interlocutorInfo}>
          <span className={styles.interlocutorName}>{interlocutor.firstName}</span>
          <span className={styles.interlocutorMessage}>{text}</span>
        </div>
        <div className={styles.buttonsContainer}>
          <span className={styles.time}>{getTimeStr(createdAt)}</span>
          <i
            onClick={(event) => changeFavorite({
              participants,
              favoriteFlag: !isFavorite,
            }, event)}
            className={classNames({ 'far fa-heart': !isFavorite, 'fas fa-heart': isFavorite })}
          />
          <i
            onClick={(event) => changeBlackList({
              participants,
              blackListFlag: !isBlocked,
            }, event)}
            className={classNames({ 'fas fa-user-lock': !isBlocked, 'fas fa-unlock': isBlocked })}
          />
          <i
            onClick={(event) => catalogOperation(event, id)}
            className={classNames({
              'far fa-plus-square': chatMode !== CONSTANTS.CATALOG_PREVIEW_CHAT_MODE,
              'fas fa-minus-circle': chatMode === CONSTANTS.CATALOG_PREVIEW_CHAT_MODE,
            })}
          />
        </div>
      </div>
    </div>
  );
};

export default DialogBox;
