import { createLogger, format, transports, addColors } from "winston";
import { LOG_ENV} from "../config.js";
import { __dirname } from "../utils.js";

const { combine, printf, timestamp, colorize } = format;

const levels = {
  fatal: 0,
  error: 1,
  warning: 2,
  info: 3,
  http: 4,
  debug: 5,
};

const colors = {
    fatal: 'bold red whiteBG',
    error: 'bold red',
    warning: 'bold yellowBG',
    info: 'bold blueBG',
    http: 'bold grey',
    debug: 'bold whiteBG',
  };
  
  
let consoleLevel;

if (LOG_ENV === "DEVELOPMENT") {
  consoleLevel = "debug";
} else {
  consoleLevel = "info";
}


const timestampFormat = "YYYY-MM-DD HH:mm:ss";

const printLogger = (info) => {
    if (info.level && info.timestamp && info.message) {
      return `${info.level} | ${info.timestamp} | ${info.message}`;
    } else {
      return "Invalid log information";
    }
  };
  
  addColors(colors);
  

const logger = createLogger({
  levels,
  transports: [
    new transports.File({
      filename: __dirname + "/logs/errors.log",
      level: "error",
      format: combine(
        timestamp({
          format: timestampFormat,
        }),
        printf(printLogger)
      ),
    }),
    new transports.Console({
      level: consoleLevel,
      format: combine(
        timestamp({
          format: timestampFormat,
        }),
        colorize({ colors }),
        printf(printLogger)
      ),
    }),
  ],
});


// logger.fatal("This's a FATAL message");
// logger.error("This's a ERROR message");
// logger.warning("This's a WARNING message");
// logger.info("This's a INFO message");
// logger.http("This's a HTTP message");
// logger.debug("This's a DEBUG message");

export default logger;