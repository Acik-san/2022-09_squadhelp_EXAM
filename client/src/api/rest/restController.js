import httpClient from '../interceptor';
import qs from 'query-string';

export const registerRequest = data => httpClient.post('registration', data);
export const loginRequest = data => httpClient.post('login', data);
export const getUser = () => httpClient.get('profile');
export const updateUser = data => httpClient.patch('profile', data);
export const getDataForContest = contestName =>
  httpClient.get(`startContest/${contestName}`);
export const getCustomersContests = ({ limit, offset, contestStatus }) =>
  httpClient.get(
    `dashboard/customerContests?${qs.stringify({
      limit,
      offset,
      contestStatus,
    })}`
  );
export const getCreatorContests = (data) =>
  httpClient.get(
    `dashboard/creatorContests?${qs.stringify(data)}`
  );
export const getContestById = id => httpClient.get(`contests/${id}`);
export const updateContest = (data, id) =>
  httpClient.patch(`contests/${id}`, data);
export const setNewOffer = ({ contestId, data }) =>
  httpClient.post(`contests/${contestId}/offer`, data);
export const setOfferStatus = ({ contestId, data }) =>
  httpClient.patch(`contests/${contestId}/offer`, data);
export const changeMark = data =>
  httpClient.post(`contests/${data.contestId}/rating`, data);
export const payMent = data => httpClient.post('payment', data.formData);
export const cashOut = data => httpClient.post('profile/cashout', data);
export const getChats = () => httpClient.get('chats');
export const getChat = ({ interlocutorId }) =>
  httpClient.get(`chats/${interlocutorId}`);
export const newMessage = ({ recipient, messageBody, interlocutor }) =>
  httpClient.post(`chats/${recipient}`, { messageBody, interlocutor });
export const changeChatFavorite = data =>
  httpClient.patch('chats/favorite', data);
export const changeChatBlock = data =>
  httpClient.patch('chats/blackList', data);
export const getCatalogList = () => httpClient.get('chats/catalogs');
export const createCatalog = data => httpClient.post('chats/catalogs', data);
export const deleteCatalog = ({ catalogId }) =>
  httpClient.delete(`chats/catalogs/${catalogId}`);
export const addChatToCatalog = ({ chatId, catalogId }) =>
  httpClient.post(`chats/catalogs/${catalogId}`, { chatId });
export const removeChatFromCatalog = ({ catalogId, chatId }) =>
  httpClient.delete(`chats/catalogs/${catalogId}/${chatId}`);
export const changeCatalogName = ({ catalogName, catalogId, chats }) =>
  httpClient.patch(`chats/catalogs/${catalogId}`, { catalogName, chats });
export const getOffers = ({ limit, offset }) =>
  httpClient.get(`offers?${qs.stringify({ limit, offset })}`);
export const setModerateOfferStatus = ({
  id,
  customerId,
  status,
  email,
  firstName,
}) =>
  httpClient.patch(`offers/${id}`, { customerId, status, email, firstName });
