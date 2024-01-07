
import dotenv from "dotenv";
dotenv.config();

import { createServer } from './server';
import { PORT } from './config';
import * as net from 'net';
import debugModule from 'debug';
import logger from './utils/logger';

export const debug = debugModule('my-app:server');

async function main() {
    const app = await createServer();
    const server = app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        logger.info(`Server is running on port ${PORT}`);
        debug(`Listening on http://localhost:${PORT}`);
    });

    let connections: net.Socket[] = [];

    server.on('connection', (connection) => {
        connections.push(connection);
        connection.on('close', () => {
            connections = connections.filter((curr) => curr !== connection);
        });
    });

    const shutdown = (): void => {
        //console.log('Received kill signal, shutting down gracefully');
        logger.info('Received kill signal, shutting down gracefully');
        server.close((): void => {
            console.log('Closed out remaining connections');
            process.exit(0);
        });

        connections.forEach((connection) => connection.end());

        setTimeout((): void => {
            connections.forEach((connection) => connection.destroy());
        }, 10000);

        setTimeout((): void => {
            console.error('Could not close connections in time, forcefully shutting down');
            process.exit(1);
        }, 20000);
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
}

main().catch(err => {
    console.error('Ошибка при инициализации приложения:', err);
    logger.error('Ошибка при инициализации приложения:', err);
    process.exit(1);
});
