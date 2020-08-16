const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const FortyTwoStrategy = require('passport-42').Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const VKontakteStrategy = require('passport-vkontakte').Strategy;
const SpotifyStrategy = require('passport-spotify').Strategy;
const keys = require('./keys');
const userModel = require('../models/userModel');
const { UserException } = require('../errors');

const localStrategy = new LocalStrategy(
  async (username, password, done) => {
    const user = await userModel.getUserByLogin(username);
    if (user == null) {
      return done({ message: 'No user with that username' }, false);
    }
    try {
      if (await bcrypt.compare(password, user.passwd)) {
        return done(null, user);
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
  let user = await userModel.getUser({ email: profile.emails[0].value });
  if (user && user[0].googleid == null) {
    const res = await userModel.updateUser({ googleId: profile.id },
      { email: profile.emails[0].value });
    if (!res) {
      throw new UserException('Error add Google ID to user!');
    }
  }
  if (user == null) {
    await userModel.createUserBySource(profile.provider, profile);
    user = await userModel.getUserBySourceId(profile.provider, profile.id);
    return done(null, user);
  }
  return done(null, user[0]);
});

const fortytwoStrategy = new FortyTwoStrategy({
  clientID: keys.fortytwoApi.clientID,
  clientSecret: keys.fortytwoApi.clientSecret,
  callbackURL: 'http://localhost:8080/api/auth/login/42/callback',
},
async (accessToken, refreshToken, profile, done) => {
  let user = await userModel.getUserBySourceId(profile.provider, profile.id);
  if (user == null) {
    await userModel.createUserBySource(profile.provider, profile);
    user = await userModel.getUserBySourceId(profile.provider, profile.id);
    return done(null, user);
  }
  return done(null, user);
});

const githubStrategy = new GitHubStrategy({
  clientID: keys.githubApi.clientID,
  clientSecret: keys.githubApi.clientSecret,
  callbackURL: 'http://localhost:8080/api/auth/login/github/callback',
},
async (accessToken, refreshToken, profile, done) => {
  let user = await userModel.getUserBySourceId(profile.provider, profile.id);
  if (user == null) {
    await userModel.createUserBySource(profile.provider, profile);
    user = await userModel.getUserBySourceId(profile.provider, profile.id);
    return done(null, user);
  }
  return done(null, user);
});

const vkontakteStrategy = new VKontakteStrategy({
  clientID: keys.vkApi.clientID,
  clientSecret: keys.vkApi.clientSecret,
  callbackURL: 'http://localhost:8080/api/auth/login/vk/callback',
},
async (accessToken, refreshToken, profile, done) => {
  let user = await userModel.getUserBySourceId(profile.provider, profile.id);
  if (user == null) {
    await userModel.createUserBySource(profile.provider, profile);
    user = await userModel.getUserBySourceId(profile.provider, profile.id);
    return done(null, user);
  }
  return done(null, user);
});

const spotifyStrategy = new SpotifyStrategy({
  clientID: keys.spotifyApi.clientID,
  clientSecret: keys.spotifyApi.clientSecret,
  callbackURL: 'http://localhost:8080/api/auth/login/spotify/callback',
},
async (accessToken, refreshToken, profile, done) => {
  let user = await userModel.getUserBySourceId(profile.provider, profile.id);
  if (user == null) {
    await userModel.createUserBySource(profile.provider, profile);
    user = await userModel.getUserBySourceId(profile.provider, profile.id);
    return done(null, user);
  }
  return done(null, user);
});

module.exports = {
  localStrategy,
  googleStrategy,
  fortytwoStrategy,
  githubStrategy,
  vkontakteStrategy,
  spotifyStrategy,
};
