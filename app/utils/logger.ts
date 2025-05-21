import { createLogger, format, transports } from "winston";
import "winston-daily-rotate-file";
const { combine, timestamp, json, align, prettyPrint } = format;
// Create the logger instance
const logger = createLogger({
  level: "info",
  format: combine(
    timestamp({ format: "DD-MM-YYYY HH:mm:ss Z" }), // Indian Standard Time (IST) is +05:30
    json(),
    prettyPrint(),
    align()
  ),
  transports: [
    new transports.Console({
      format: combine(
        timestamp({ format: "DD-MM-YYYY HH:mm:ss Z" }), // Indian Standard Time (IST) is +05:30
        json(),
        prettyPrint(),
        align()
      ),
    }),
    new transports.DailyRotateFile({
      dirname: "logs",
      filename: "nextjs-app-logs-%DATE%.txt", // Save as .txt
      datePattern: "DD-MM-YYYY",
      maxFiles: "30d",
    }),
  ],
});

export default logger;
