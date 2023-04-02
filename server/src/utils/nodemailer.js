const nodemailer = require('nodemailer');
const config = require('../config/nodemailerConfig.json');

const sendMail = message =>
  nodemailer.createTransport(config).sendMail(message, (err, info) => {
    try {
      console.log('Email sent: ', info);
    } catch (err) {
      console.log(err);
    }
  });

module.exports = sendMail;
