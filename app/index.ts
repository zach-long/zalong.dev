import express from 'express';
import session from 'express-session';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import passport from 'passport';
import { Strategy } from 'passport-local';
import mongoose from 'mongoose';

import dotenv from 'dotenv';
dotenv.config();

const { secret, port, dbPath } = require('./config.js');
const User = require('./models/user.js');

const app: express.Application = express();

const LocalStrategy = Strategy;

const indexRoutes: any = require('./routes/index');
const userRoutes: any = require('./routes/user');
const projectRoutes: any = require('./routes/project');
const skillRoutes: any = require('./routes/skill');
const settingsRoutes: any = require('./routes/settings');

mongoose.connect(dbPath);
const db = mongoose.connection;
db.on('error', console.error.bind(console, `connection error:`));
db.once('open', () => {
    console.log(`MongoDB connected successfully at "${dbPath}".`);
});

// app.use(helmet.contentSecurityPolicy());
app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());

app.use(session({
    secret: secret,
    saveUninitialized: true,
    resave: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

passport.deserializeUser((id: any, done) => {
    User.findById(id, (err: any, user: any) => {
        done(err, user);
    });
});

const localStrategy = new LocalStrategy((username, password, done) => {
    console.log(`* authenticating with local strategy`);
    User.findOne({username: username}, (err: any, user: any) => {
        console.log(`* found user '${user.name}'`);
        if (err) return done(err);
        if (!user) return done(null, false, {message: `Incorrect username.`});
        !User.isValidPassword(password, user.password, (err: any, match: boolean) => {
            if (err) return done(err);
            if (!match) return done(null, false, {message: `Incorrect password.`});
            console.log(`* authentication successful`);
            return done(null, user);
        });
    });
});

passport.use('local', localStrategy);

app.use(express.static(path.join(__dirname, './../public')));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.use('/', indexRoutes);
app.use('/admin', userRoutes);
app.use('/project', projectRoutes);
app.use('/skill', skillRoutes);
app.use('/settings', settingsRoutes);

app.listen(port, () => {
    console.log(`Application started on port ${port}.`)
});