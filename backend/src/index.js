const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const http = require('http');
const router = require('./routes');
const { localStrategy } = require('./config/passport-config');

passport.use('local', localStrategy);
const app = express();
const port = process.env.PORT || 8000;
const server = http.createServer(app);
app.use('/public', express.static(path.resolve(__dirname, '../public')));
app.use(cors());
app.use(session({
  secret: 'hypertube',
  saveUninitialized: false,
  resave: false,
}));
app.use(express.json({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  console.log('serialize user', user);
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use('/', router);

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
