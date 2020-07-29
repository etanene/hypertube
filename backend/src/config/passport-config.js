const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
// const FortyTwoStrategy = require('passport-42').Strategy;
// const GitHubStrategy = require('passport-github').Strategy;
// const GoogleStrategy = require('passport-google').Strategy;

const userModel = require('../models/userModel');

const localStrategy = new LocalStrategy(
  async (username, password, done) => {
    const user = await userModel.getUserByLogin(username);
    if (user == null) {
      return done(null, false, { message: 'No user with that username' });
    }
    try {
      if (await bcrypt.compare(password, user.passwd)) {
        if (user.validate) {
          return done(null, user);
        }
        return done(null, false, { message: 'Account not validated' });
      }
      return done(null, false, { message: 'Password incorrect' });
    } catch (e) {
      return done(e);
    }
  },
);

module.exports = {
  localStrategy,
};
