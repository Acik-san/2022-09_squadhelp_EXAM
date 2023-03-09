const { auth: { user } } = require('../config/nodemailerConfig.json')
const { MAIL_MESSAGE: { SUBJECT } } = require('../constants')

module.exports.messagePrepair = async (req, res, next) => {
  try {
    const { body: { email, firstName, status } } = req
    const message = {
      from: `<${user}>`,
      to: `<${email}>`,
      subject: SUBJECT,
      html: `<h1>${firstName}</h1><p>Your offer was ${status}</p>`
    }
    req.message = message
    next()
  } catch (error) {
    next(error)
  }
}