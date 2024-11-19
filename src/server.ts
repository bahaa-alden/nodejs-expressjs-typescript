import * as express from 'express';
import * as mongoose from 'mongoose';
import * as compression from 'compression';
import * as cors from 'cors';
//R <dont remove this line>
import { userRoutes } from './routes/user.routes';
import { env_vars } from './config';
import helmet from 'helmet';
import * as passport from 'passport';
import errHandler from './middlewares/errHandler';
import customResponses from './middlewares/custom.middleware';
import Logger from './core/Logger';

class Server {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();

    this.routes();
    this.mongo();
  }

  public routes(): void {
    this.app.use('/api/v1/users', userRoutes.router);
    //ROUTES <dont remove this line>
    this.app.use(errHandler);
  }

  public config(): void {
    this.app.use(customResponses);
    this.app.set('port', env_vars.port || 3000);
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(compression());
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(passport.initialize());
  }

  private mongo() {
    const connection = mongoose.connection;
    connection.on('connected', () => {
      Logger.info('Mongo Connection Established');
    });
    connection.on('reconnected', () => {
      Logger.info('Mongo Connection Reestablished');
    });
    connection.on('disconnected', () => {
      Logger.info('Mongo Connection Disconnected');
      Logger.info('Trying to reconnect to Mongo ...');
      setTimeout(() => {
        mongoose.connect(env_vars.mongoose.url);
      }, 3000);
    });

    connection.on('close', () => {
      Logger.info('Mongo Connection Closed');
    });
    connection.on('error', (error: Error) => {
      Logger.info('Mongo Connection ERROR: ' + error);
    });

    const run = async () => {
      await mongoose.connect(env_vars.mongoose.url);
    };
    run().catch((error) => Logger.error(error));
  }

  public start(): void {
    this.app.listen(this.app.get('port'), () => {
      Logger.info(
        `API is running at http://localhost: ${this.app.get('port')}`,
      );
    });
  }
}

const server = new Server();

server.start();
