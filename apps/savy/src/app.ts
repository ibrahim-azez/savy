import * as express from 'express';
import * as compression from 'compression';
import helmet from 'helmet';
import * as morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import * as cookieParser from 'cookie-parser';
import * as ExpressSession from 'express-session';
// import * as xss from 'xss-clean';
import * as hpp from 'hpp';
import * as passport from 'passport';
import { Repository } from 'typeorm';
import { ISession, TypeormStore } from 'connect-typeorm';
import { Session } from './app/core/entities/session.entity';
import { myDataSource } from './app/core/utils/database';
import { environment } from '@environment';

export const app = express();

/**
 * Enable reverse proxy support in Express. This causes the
 * the "X-Forwarded-Proto" header field to be trusted so its
 * value can be used to determine the protocol. See
 * http://expressjs.com/api#app-settings for more details.
 */
app.enable('trust proxy');

/**
 *
 * ----------------- COMPRESS ASS RESPONSES -------------------
 */
app.use(compression());

/**
 *
 * ----------------- SET SECURITY HTTP HEADERS -------------------
 */
app.use(helmet());

/**
 *
 * ----------------- DEVELOPMENT LOGGING -------------------
 */
if (!environment.production) {
  app.use(morgan('dev'));
}

/**
 *
 * ----------------- LIMIT REQUESTS FROM THE SAME API -------------------
 */
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

/**
 *
 * ----------------- BODY PARSER, READING DATA FROM BODY INTO req.body -------------------
 */
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

/**
 *  ----------------- SESSION SETUP -------------------
 */
const sessionRepository: Repository<ISession> =
  myDataSource.getRepository(Session);

app.use(
  ExpressSession({
    name: 'auth',
    secret: environment.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: new TypeormStore({
      limitSubquery: false, // If using MariaDB.
      ttl: 86400,
    }).connect(sessionRepository),
    cookie: { secure: environment.production, maxAge: 1000 * 60 * 60 * 24 * 7 },
  })
);

/**
 *  ----------------- PASSPORT AUTHENTICATION -------------------
 * Need to require Passport config module so app.ts knows about it
 */
app.use(passport.initialize());
app.use(passport.session());
import './app/core/utils/passport-session';

/**
 *  ----------------- DATA SANITIZATION AGAINST XSS -------------------
 */
// app.use(xss());

/**
 *  ----------------- PREVENT PARAMETER POLLUTION -------------------
 */
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
