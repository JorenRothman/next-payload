import winston from 'winston';

export function createLogger(defaultMeta: {}, level: string = 'info') {
    const logger = winston.createLogger({
        silent: true,
        level,
        format: winston.format.json(),
        defaultMeta,
        transports: [
            //
            // - Write to all logs with level `info` and below to `combined.log`
            // - Write all logs error (and below) to `error.log`.
            //
            new winston.transports.File({
                filename: 'error.log',
                level: 'error',
            }),
            new winston.transports.File({ filename: 'combined.log' }),
        ],
    });

    return logger;
}
