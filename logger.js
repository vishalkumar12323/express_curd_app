import { format, createLogger, transports } from "winston";

const { colorize, combine, timestamp, json } = format;

const consoleLogFormat = format.combine(
  format.colorize(),
  format.printf(({ level, message }) => {
    return `[${timestamp}] ${level}: ${message}`;
  })
);

const logger = createLogger({
  level: "info",
  format: combine(colorize(), timestamp(), json()),
  transports: [
    new transports.Console({
      format: consoleLogFormat,
    }),
    new transports.File({ filename: "app.log" }),
  ],
});

export { logger };
