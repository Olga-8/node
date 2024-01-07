import winston from "winston";

const logger = winston.createLogger({
	level: 'info',
	format: winston.format.json(),
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({ filename: 'error.log', level: 'error' })
	]
});

logger.error('An error occurred', { metadata: 'some additional data' });

logger.info('Server started on port 3000');

export default logger;
