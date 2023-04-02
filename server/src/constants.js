require('dotenv').config();
const {
  JWT_SECRET,
  ACCESS_TOKEN_TIME,
  SALT_ROUNDS,
  SQUADHELP_BANK_NUMBER,
  SQUADHELP_BANK_NAME,
  SQUADHELP_BANK_CVC,
  SQUADHELP_BANK_EXPIRY,
} = process.env;

module.exports = {
  JWT_SECRET,
  ACCESS_TOKEN_TIME: Number(ACCESS_TOKEN_TIME),
  SALT_ROUNDS: Number(SALT_ROUNDS),
  SQUADHELP_BANK_NUMBER,
  SQUADHELP_BANK_NAME,
  SQUADHELP_BANK_CVC,
  SQUADHELP_BANK_EXPIRY,
  CUSTOMER: 'customer',
  CREATOR: 'creator',
  CREATOR_ENTRIES: 'creator_entries',
  CONTEST_STATUS_ACTIVE: 'active',
  CONTEST_STATUS_FINISHED: 'finished',
  CONTEST_STATUS_PENDING: 'pending',
  CONTESTS_DEFAULT_DIR: 'public/contestsFiles/',
  NAME_CONTEST: 'name',
  LOGO_CONTEST: 'logo',
  TAGLINE_CONTEST: 'tagline',
  OFFER_STATUS_PENDING: 'pending',
  OFFER_STATUS_REJECTED: 'rejected',
  OFFER_STATUS_WON: 'won',
  FILES_PATH: 'public/',
  SOCKET_CONNECTION: 'connection',
  SOCKET_SUBSCRIBE: 'subscribe',
  SOCKET_UNSUBSCRIBE: 'unsubscribe',
  NOTIFICATION_ENTRY_CREATED: 'onEntryCreated',
  NOTIFICATION_CHANGE_MARK: 'changeMark',
  NOTIFICATION_CHANGE_OFFER_STATUS: 'changeOfferStatus',
  NEW_MESSAGE: 'newMessage',
  CHANGE_BLOCK_STATUS: 'CHANGE_BLOCK_STATUS',
  CONTEST_NAMES: {
    CONTEST_NAME: 'name',
    CONTEST_TAGLINE: 'tagline',
    CONTEST_LOGO: 'logo',
  },
  CONTEST_TYPES: {
    NAME_STYLE: 'nameStyle',
    TYPE_OF_NAME: 'typeOfName',
    TYPE_OF_TAGLINE: 'typeOfTagline',
    BRAND_STYLE: 'brandStyle',
    INDUSTRY: 'industry',
  },
  TIME_ERRORS_LOG: '00 00 10 * * 0-6',
  ERRORS_LOG_PATH: './errorsLogs/errorsData.json',
  MAIL_MESSAGE: { SUBJECT: "Squadhelp, offer's moderation" },
};
