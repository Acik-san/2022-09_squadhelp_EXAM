import { put, select } from 'redux-saga/effects';
import remove from 'lodash/remove';
import isEqual from 'lodash/isEqual';
import ACTION from '../actions/actionTypes';
import * as restController from '../api/rest/restController';

export function * getChatsSaga () {
  try {
    const { data } = yield restController.getChats();
    yield put({ type: ACTION.GET_CHATS_SUCCESS, data });
  } catch (err) {
    yield put({ type: ACTION.GET_CHATS_ERROR, error: err.response });
  }
}

export function * getChatSaga (action) {
  try {
    const { data } = yield restController.getChat(action.data);
    yield put({ type: ACTION.GET_CHAT_SUCCESS, data });
  } catch (err) {
    yield put({ type: ACTION.GET_CHAT_ERROR, error: err.response });
  }
}

export function * sendMessage (action) {
  try {
    const { data } = yield restController.newMessage(action.data);
    const { messagesPreview } = yield select(state => state.chatStore);
    let isNew = true;
    messagesPreview.forEach(preview => {
      if (isEqual(preview.participants, data.message.participants)) {
        preview.text = data.message.body;
        preview.sender = data.message.sender;
        preview.createdAt = data.message.createdAt;
        isNew = false;
      }
    });
    if (isNew) {
      messagesPreview.push(data.preview);
    }
    yield put({
      type: ACTION.SEND_MESSAGE,
      data: {
        message: data.message,
        messagesPreview,
        chatData: {
          id: data.preview.id,
          participants: data.preview.participants,
          favoriteList: data.preview.favoriteList,
          blackList: data.preview.blackList,
        },
      },
    });
  } catch (err) {
    yield put({ type: ACTION.SEND_MESSAGE_ERROR, error: err.response });
  }
}

export function * changeChatFavorite (action) {
  try {
    const { data } = yield restController.changeChatFavorite(action.data);
    const { messagesPreview } = yield select(state => state.chatStore);
    messagesPreview.forEach(preview => {
      if (isEqual(preview.participants, data.participants))
        preview.favoriteList = data.favoriteList;
    });
    yield put({
      type: ACTION.SET_CHAT_FAVORITE_SUCCESS,
      data: { changedPreview: data, messagesPreview },
    });
  } catch (err) {
    yield put({ type: ACTION.SET_CHAT_FAVORITE_ERROR, error: err.response });
  }
}

export function * changeChatBlock (action) {
  try {
    const { data } = yield restController.changeChatBlock(action.data);
    const { messagesPreview } = yield select(state => state.chatStore);
    messagesPreview.forEach(preview => {
      if (isEqual(preview.participants, data.participants))
        preview.blackList = data.blackList;
    });
    yield put({
      type: ACTION.CHANGE_CHAT_BLOCK,
      data: { messagesPreview, chatData: data },
    });
  } catch (err) {
    yield put({ type: ACTION.SET_CHAT_BLOCK_ERROR, error: err.response });
  }
}

export function * getCatalogListSaga (action) {
  try {
    const { data } = yield restController.getCatalogList();
    yield put({ type: ACTION.RECEIVE_CATALOG_LIST, data });
  } catch (err) {
    yield put({ type: ACTION.RECEIVE_CATALOG_LIST_ERROR, error: err.response });
  }
}

export function * addChatToCatalog (action) {
  try {
    const { data } = yield restController.addChatToCatalog(action.data);
    const { catalogList } = yield select(state => state.chatStore);
    for (let i = 0; i < catalogList.length; i++) {
      if (catalogList[i].id === data.id) {
        catalogList[i].chats = data.chats;
        break;
      }
    }
    yield put({ type: ACTION.ADD_CHAT_TO_CATALOG, data: catalogList });
  } catch (err) {
    yield put({ type: ACTION.ADD_CHAT_TO_CATALOG_ERROR, error: err.response });
  }
}

export function * createCatalog (action) {
  try {
    const { data } = yield restController.createCatalog(action.data);
    yield put({ type: ACTION.CREATE_CATALOG_SUCCESS, data });
  } catch (err) {
    yield put({ type: ACTION.CREATE_CATALOG_ERROR, error: err.response });
  }
}

export function * deleteCatalog (action) {
  try {
    yield restController.deleteCatalog(action.data);
    const { catalogList } = yield select(state => state.chatStore);
    const newCatalogList = remove(
      catalogList,
      catalog => action.data.catalogId !== catalog.id
    );
    yield put({ type: ACTION.DELETE_CATALOG_SUCCESS, data: newCatalogList });
  } catch (err) {
    yield put({ type: ACTION.DELETE_CATALOG_ERROR, error: err.response });
  }
}

export function * removeChatFromCatalogSaga (action) {
  try {
    const { data } = yield restController.removeChatFromCatalog(action.data);
    const { catalogList } = yield select(state => state.chatStore);
    for (let i = 0; i < catalogList.length; i++) {
      if (catalogList[i].id === data.id) {
        catalogList[i].chats = data.chats;
        break;
      }
    }
    yield put({
      type: ACTION.REMOVE_CHAT_FROM_CATALOG_SUCCESS,
      data: { catalogList, currentCatalog: data },
    });
  } catch (err) {
    yield put({
      type: ACTION.REMOVE_CHAT_FROM_CATALOG_ERROR,
      error: err.response,
    });
  }
}

export function * changeCatalogName (action) {
  try {
    const { data } = yield restController.changeCatalogName(action.data);
    const { catalogList } = yield select(state => state.chatStore);
    for (let i = 0; i < catalogList.length; i++) {
      if (catalogList[i].id === data.id) {
        catalogList[i].catalogName = data.catalogName;
        break;
      }
    }
    yield put({
      type: ACTION.CHANGE_CATALOG_NAME_SUCCESS,
      data: { catalogList, currentCatalog: data },
    });
  } catch (err) {
    yield put({ type: ACTION.CHANGE_CATALOG_NAME_ERROR, error: err.response });
  }
}
