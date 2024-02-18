import express, { NextFunction, Request, Response } from 'express';
import config from './config';
import cors from 'cors';
import router from './routers';
import errorHandler from './middleware/error/errorHandler';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import helmet from 'helmet';
import morgan from 'morgan';
import { logger, stream } from './config/logger';

const app = express();
require('dotenv').config();

Sentry.init({
  dsn: config.sentryDsn,
  environment: config.sentryEnvironment,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],
  tracesSampleRate: 1.0,
});

app.use(helmet({ contentSecurityPolicy: false }));
app.use(Sentry.Handlers.requestHandler() as express.RequestHandler);
app.use(Sentry.Handlers.tracingHandler());

const allowedOrigins = [
  'http://localhost:3000',
  'http://192.168.0.134:3000',
  'http://192.168.0.123:3000',
  'http://192.168.0.126:3000',
  'http://192.168.0.128:3000',
  'https://www.tttime.store',
  'https://tttime.store',
  'https://api.tttime.store',
  'https://t-time.vercel.app',
  config.ec2URL,
];
const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
};

app.use(cors(corsOptions));
app.use((req, res, next) => {
  const origin: string = req.headers.origin!;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
  res.header(
    'Access-Control-Allow-Headers',
    'X-Requested-With, content-type, x-access-token',
  );
  next();
});

app.use(morgan('combined', { stream: stream }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', router);
app.use(Sentry.Handlers.errorHandler());
app.use(errorHandler);

//Error Handler
interface ErrorType {
  message: string;
  status: number;
}

app.use(function (
  err: ErrorType,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'production' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app
  .listen(config.port, () => {
    console.log(`
    ################################################
          🛡️  Server listening on port: ${config.port} 🛡️
    ################################################
  `);
    logger.info('T.Time Server Start');
  })
  .on('error', (err) => {
    logger.error(err);
    process.exit(1);
  });

export default app;
