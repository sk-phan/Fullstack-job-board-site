const config = require('./config')
const express = require('express')
const session = require('express-session');

// const passport = require('passport')
// const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express()

const cors = require('cors')

const jobRouter = require('../controllers/jobs')
const userRouter = require('../controllers/users')
const loginRouter = require('../controllers/login')
const applicationRouter = require('../controllers/applications')

const middleware = require('./middleware')
const logger = require('./logger')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGO_URI)

mongoose.connect(config.MONGO_URI)
    .then(() => {
        logger.info('connecting to MongoDB')
    })
    .catch(error => {
        logger.error('error connecting to MongoDB', error)
    })

app.use(session({
 secret: config.SESSION_SECRET,
 resave: false,
 saveUninitialized: false
}));
// Configure Google OAuth credentials
// const GOOGLE_CLIENT_ID = '412119717362-jp25n0j9895eq5b906qvdd82dlhc54pb.apps.googleusercontent.com';
// const GOOGLE_CLIENT_SECRET = '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';
// const GOOGLE_CALLBACK_URL = 'http://localhost:3001/auth/google/callback';

// Configure Passport with Google Strategy
// passport.use(new GoogleStrategy({
//   clientID: GOOGLE_CLIENT_ID,
//   clientSecret: GOOGLE_CLIENT_SECRET,
//   callbackURL: GOOGLE_CALLBACK_URL
// }, (accessToken, refreshToken, profile, done) => {
//   // Handle the user's profile data received from Google
//   // You can perform additional operations here, such as saving the user to a database
//   return done(null, profile);
// }));

// Serialize and deserialize the user
// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser((user, done) => {
//   done(null, user);
// });

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

// Use Passport middleware
// app.use(passport.initialize());
// app.use(passport.session());

// Set up login routes
// app.get('/api/auth/google',
//   passport.authenticate('google', { scope: ['profile', 'email'] }));

// app.get('/api/auth/google/callback',
//   passport.authenticate('google', { failureRedirect: '/login' , scope: ['profile', 'email']}),
//   (req, res) => {
//     // Successful authentication, redirect to a success page or a dashboard.
//     res.redirect('http://localhost:8080/login');
//   });

app.use('/api/jobs', jobRouter)
app.use('/api/users', userRouter)
app.use('/api/token', loginRouter)
app.use('/api/applications', applicationRouter)

//Backend server is configured to serve static files from the uploads folder
app.use('/uploads', express.static('uploads'));


app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app