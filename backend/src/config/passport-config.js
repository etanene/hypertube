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
      return done({ message: 'No user with that username' }, false);
    }
    try {
      if (await bcrypt.compare(password, user.passwd)) {
        if (user.validate) {
          return done(null, user);
        }
        return done({ message: 'Account is not validated' }, false);
      }
      return done({ message: 'Password incorrect' }, false);
    } catch (e) {
      return done(e);
    }
  },
);

module.exports = {
  localStrategy,
};
