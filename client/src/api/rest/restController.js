import http from '../interceptor';
import qs from "query-string"

export const registerRequest = (data) => http.post('registration', data);
export const loginRequest = (data) => http.post('login', data);
export const getUser = () => http.get('getUser');
export const updateContest = (data,id) => http.patch(`contests/${id}`, data);
export const setNewOffer = (data) => http.post('setNewOffer', data);
export const setOfferStatus = (data) => http.post('setOfferStatus', data);
export const downloadContestFile = (data) => http.get(`downloadFile/${data.fileName}`);
export const payMent = (data) => http.post('pay', data.formData);
export const changeMark = (data) => http.post('changeMark', data);
export const getPreviewChat = () => http.post('getPreview');
export const getDialog = (data) => http.post('getChat', data);
export const getDataForContest = (contestName) => http.get(`startContest/${contestName}`);
export const cashOut = (data) => http.post('cashout', data);
export const updateUser = (data) => http.post('updateUser', data);
export const newMessage = (data) => http.post('newMessage', data);
export const changeChatFavorite = (data) => http.post('favorite', data);
export const changeChatBlock = (data) => http.post('blackList', data);
export const getCatalogList = (data) => http.post('getCatalogs', data);
export const addChatToCatalog = (data) => http.post('addNewChatToCatalog', data);
export const createCatalog = (data) => http.post('createCatalog', data);
export const deleteCatalog = (data) => http.post('deleteCatalog', data);
export const removeChatFromCatalog = (data) => http.post('removeChatFromCatalog', data);
export const changeCatalogName = (data) => http.post('updateNameCatalog', data);
export const getCustomersContests = ({limit,offset,contestStatus}) => http.get(`dashboard/customerContests?${qs.stringify({limit,offset,contestStatus})}`);
export const getCreatorContests = ({
  offset, limit, typeIndex, contestId, industry, awardSort, ownEntries,
}) => http.get(`dashboard/creatorContests?${qs.stringify({  offset, limit, typeIndex, contestId, industry, awardSort, ownEntries})}`);
export const getContestById = (id) => http.get(`contests/${id}`);
