import http from '../interceptor';
import qs from 'query-string';

export const registerRequest = data => http.post('registration', data);
export const loginRequest = data => http.post('login', data);
export const getUser = () => http.get('profile');
export const updateUser = data => http.patch('profile', data);
export const getDataForContest = contestName =>
  http.get(`startContest/${contestName}`);
export const getCustomersContests = ({ limit, offset, contestStatus }) =>
  http.get(
    `dashboard/customerContests?${qs.stringify({
      limit,
      offset,
      contestStatus,
    })}`
  );
export const getCreatorContests = ({
  offset,
  limit,
  typeIndex,
  contestId,
  industry,
  awardSort,
  ownEntries,
}) =>
  http.get(
    `dashboard/creatorContests?${qs.stringify({
      offset,
      limit,
      typeIndex,
      contestId,
      industry,
      awardSort,
      ownEntries,
    })}`
  );
export const getContestById = id => http.get(`contests/${id}`);
export const updateContest = (data, id) => http.patch(`contests/${id}`, data);
export const setNewOffer = ({ contestId, data }) =>
  http.post(`contests/${contestId}/offer`, data);
export const setOfferStatus = ({ contestId, data }) =>
  http.patch(`contests/${contestId}/offer`, data);
export const changeMark = data =>
  http.post(`contests/${data.contestId}/rating`, data);
export const payMent = data => http.post('payment', data.formData);
export const cashOut = data => http.post('profile/cashout', data);
export const getChats = () => http.get('chats');
export const getChat = ({ interlocutorId }) =>
  http.get(`chats/${interlocutorId}`);
export const newMessage = ({ recipient, messageBody, interlocutor }) =>
  http.post(`chats/${recipient}`, { messageBody, interlocutor });
export const changeChatFavorite = data => http.patch('chats/favorite', data);
export const changeChatBlock = data => http.patch('chats/blackList', data);
export const getCatalogList = () => http.get('catalogs');
export const createCatalog = data => http.post('catalogs', data);
export const deleteCatalog = ({ catalogId }) =>
  http.delete(`catalogs/${catalogId}`);
export const addChatToCatalog = ({ chatId, catalogId }) =>
  http.post(`catalogs/${catalogId}`, { chatId });
export const removeChatFromCatalog = ({ catalogId, chatId }) =>
  http.delete(`catalogs/${catalogId}/${chatId}`);
export const changeCatalogName = ({ catalogName, catalogId }) =>
  http.patch(`catalogs/${catalogId}`, { catalogName });
