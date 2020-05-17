require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const path = require('path');

const db = require('./db');
const router = require('./routes');

const app = express();
const port = process.env.PORT || 8000;

db.sequelize.sync().then(() => {
  console.log('synced db');
});

app.use('/public', express.static(path.resolve(__dirname, '../public')));
app.use(cors());
app.use(session({
  secret: process.env.SESSION_SECRET || 'hypertube',
  saveUninitialized: false,
  resave: false,
}));
app.use(express.json({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/', router);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
