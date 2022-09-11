import * as express from 'express';
import * as compression from 'compression';
import helmet from 'helmet';
import * as morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import * as cookieParser from 'cookie-parser';
import * as ExpressSession from 'express-session';
// import * as xss from 'xss-clean';
import * as mongoSanitize from 'express-mongo-sanitize';
import * as hpp from 'hpp';

import { userRouter } from './app/modules/user/user.router';
import { authRouter } from './app/modules/auth/auth.router';
import { environment } from '@environment';
import { TypeormStore } from 'connect-typeorm/out';
import { myDataSource } from './database';
import { Session } from '@core/utils/session';

export const app = express();

// compress all responses
app.use(compression());

// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

/**
 *  ----------------- SESSION SETUP -------------------
 */
const sessionRepository = myDataSource.getRepository(Session);
app.use(
  ExpressSession({
    secret: environment.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    store: new TypeormStore({
      limitSubquery: false, // If using MariaDB.
      ttl: 86400,
    }).connect(sessionRepository),
    cookie: { secure: environment.production, maxAge: 1000 * 60 * 60 * 24 * 7 },
  })
);

// Data sanitization against XSS
// app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);

// 3) ROUTES
const root = '/api/v1';
app.use(`${root}/user`, userRouter);
app.use(`${root}/auth`, authRouter);

// app.all('*', (req, res, next) => {
//   next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
// });

// app.use(globalErrorHandler);

// // Test middleware
// app.use((req, res, next) => {
//   req.requestTime = new Date().toISOString();
//   next();
// });
