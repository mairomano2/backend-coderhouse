const logger = require("../logger/loger");

const addLogger = (req, res, next) => {
  req.logger = logger;
  logger.info(
    `[${logger.method}] => ${req.url} - ${new Date().toLocaleTimeString}`
  );
  next();
};

module.exports = addLogger;
