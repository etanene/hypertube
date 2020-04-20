const express = require('express');
const cors = require('cors');
const session = require('express-session');
const path = require('path');
const http = require('http');

const router = require('./routes');

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

app.use('/', router);

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
