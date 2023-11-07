import logger from "../utils/logger.js";

export const loggerTest = (req, res) => {
  logger.debug("This's a DEBUG message");
  logger.http("This's a HTTP message");
  logger.info("This's a INFO message");
  logger.warning("This's a WARNING message");
  logger.error("This's a ERROR message");
  logger.fatal("This's a FATAL message");

  res.json({ message: "this is a Logger test" });
};