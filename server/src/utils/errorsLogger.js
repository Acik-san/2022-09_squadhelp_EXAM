const fs = require("fs")
const { ERROS_LOG_PATH } = require("../constants")

module.exports.errosLogger = (err) => {
  const errorData = [{ message: err.message, time: Date.now(), code: err.code, stackTrace: err.stack }]
  if (!fs.existsSync(ERROS_LOG_PATH) || fs.statSync(ERROS_LOG_PATH).size === 0) { fs.appendFileSync(ERROS_LOG_PATH, JSON.stringify(errorData)) }
  fs.writeFileSync(ERROS_LOG_PATH, JSON.stringify([...JSON.parse(fs.readFileSync(ERROS_LOG_PATH)), ...errorData]))
}