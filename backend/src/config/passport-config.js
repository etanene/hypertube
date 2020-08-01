const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const FortyTwoStrategy = require('passport-42').Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys');
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

const googleStrategy = new GoogleStrategy({
  clientID: keys.googleApi.clientID,
  clientSecret: keys.googleApi.clientSecret,
  callbackURL: 'http://localhost:8080/api/auth/login/google/callback',
},
async (accessToken, refreshToken, profile, done) => {
  let user = await userModel.getUserBySourceId(profile.provider, profile.id);
  console.log('we have user', user);
  if (user == null) {
    await userModel.createUserBySource(profile.provider, profile);
    user = await userModel.getUserBySourceId(profile.provider, profile.id);
    console.log('user after create by id', user);
    return done(null, user);
  }
  // console.log('accessToke', accessToken);
  // console.log('refreshToken', refreshToken);
  // console.log('google profile', profile);
  return done(null, user);
});

const fortytwoStrategy = new FortyTwoStrategy({
  clientID: keys.fortytwoApi.clientID,
  clientSecret: keys.fortytwoApi.clientSecret,
  callbackURL: 'http://localhost:8080/api/auth/login/42/callback',
},
async (accessToken, refreshToken, profile, done) => {
  let user = await userModel.getUserBySourceId(profile.provider, profile.id);
  console.log('we have user', user);
  if (user == null) {
    await userModel.createUserBySource(profile.provider, profile);
    user = await userModel.getUserBySourceId(profile.provider, profile.id);
    console.log('user after create by id', user);
    return done(null, user);
  }
  // console.log('accessToke', accessToken);
  // console.log('refreshToken', refreshToken);
  // console.log('google profile', profile);
  return done(null, user);
});

const githubStrategy = new GitHubStrategy({
  clientID: keys.githubApi.clientID,
  clientSecret: keys.githubApi.clientSecret,
  callbackURL: 'http://localhost:8080/api/auth/login/github/callback',
},
async (accessToken, refreshToken, profile, done) => {
  let user = await userModel.getUserBySourceId(profile.provider, profile.id);
  console.log('we have user', user);
  if (user == null) {
    await userModel.createUserBySource(profile.provider, profile);
    user = await userModel.getUserBySourceId(profile.provider, profile.id);
    console.log('user after create by id', user);
    return done(null, user);
  }
  return done(null, user);
});

module.exports = {
  localStrategy,
  googleStrategy,
  fortytwoStrategy,
  githubStrategy,
};
