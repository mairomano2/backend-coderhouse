const winston = require("winston");
const args = require("../config/args.config")

const environment = args.mode;


const costumeLevelOptions = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
};

const prodLogger = winston.createLogger({
  levels: costumeLevelOptions.levels.info,
  transports: [
    new winston.transports.Console({ level: "info" }),
    new winston.transports.File({ filename: "errors.log", level: "error" }),
  ],
});

const devLogger = winston.createLogger({
  levels: costumeLevelOptions.levels.debug,
  transports: [
    new winston.transports.Console({ level: "info" }),
    new winston.transports.File({ filename: "errors.log", level: "error" }),
  ],
});

const logger = environment !== "production" ? devLogger : prodLogger;

module.exports = logger
