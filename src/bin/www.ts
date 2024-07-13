import http from 'http';
import 'dotenv/config';
import { LoggerUtil } from '../utils';
import App from '../app';
import config from '../config/variables.config';

const { PORT } = config;

const init = () => {
  const server = http.createServer();
  
  App.init();

  const _onError = (error: Error) => {
    LoggerUtil.error(error.message);
  };

  const _onListening = () => {
    const address = server.address();
    const bind = typeof address === 'string'
        ? `pipe ${address}`
        : `${address?.port}`;

    LoggerUtil.info(`Likolad started:`);
    LoggerUtil.info(`\tPort: ${bind}`);
    LoggerUtil.info(`\tStart date: ${(new Date()).toUTCString()} \n`);
  };

  server.listen(PORT);
  server.on('error', _onError);
  server.on('listening', _onListening);
};

init()