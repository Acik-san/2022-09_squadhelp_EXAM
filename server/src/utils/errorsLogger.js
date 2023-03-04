const fs = require("fs")
const path = require('path');
const CronJob = require("cron").CronJob
const { TIME_ERRORS_LOG, ERRORS_LOG_PATH } = require("../constants")
const env = process.env.NODE_ENV || 'development';
const devErrorsLogsPath = path.resolve(__dirname, '../../errorsLogs');

const errorsLogsPath = env === 'production'
  ? '/var/www/html/errorsLogs'
  : devErrorsLogsPath;

if (!fs.existsSync(errorsLogsPath)) {
  fs.mkdirSync(errorsLogsPath, {
    recursive: true,
  });
}

const job = new CronJob(TIME_ERRORS_LOG, () => { if (fs.existsSync(ERRORS_LOG_PATH) && fs.statSync(ERRORS_LOG_PATH).size !== 0) { fs.readFile(ERRORS_LOG_PATH, "utf8", (err, data) => { fs.appendFileSync(`./errorsLogs/${Date.now()}.json`, JSON.stringify(JSON.parse(data).map((err) => ({ message: err.message, code: err.code, time: err.time })))); fs.truncateSync(ERRORS_LOG_PATH) }) } }, null)

job.start()

module.exports.errorsLogger = (err) => {
  const errorData = [{ message: err.message, time: Date.now(), code: err.code, stackTrace: err.stack }]
  if (!fs.existsSync(ERRORS_LOG_PATH) || fs.statSync(ERRORS_LOG_PATH).size === 0) { fs.appendFileSync(ERRORS_LOG_PATH, JSON.stringify(errorData)) }
  fs.writeFileSync(ERRORS_LOG_PATH, JSON.stringify([...JSON.parse(fs.readFileSync(ERRORS_LOG_PATH)), ...errorData]))
}