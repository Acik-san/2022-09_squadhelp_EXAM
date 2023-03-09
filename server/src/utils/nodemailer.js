const nodemailer = require('nodemailer')
const config = require('../config/nodemailerConfig.json')

const sendMail = message => nodemailer.createTransport(config).sendMail(message, (err, info) => {
  if (err) { throw err }
  console.log('Email sent: ', info)
})

module.exports = sendMail