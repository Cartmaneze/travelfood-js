const winston = require('winston');

let colors = {
    debug: 'blue',
    info: 'green',
    warn: 'yellow',
    error: 'red'
};

winston.addColors(colors);

let logger = winston.createLogger({
    transports: [
        new winston.transports.File({
            filename: 'error.log',
            level: 'error',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            )
        }),
        new winston.transports.Console(
            {
                format: winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.colorize(),
                    winston.format.simple()
                )
            })
    ]
});

module.exports = logger;