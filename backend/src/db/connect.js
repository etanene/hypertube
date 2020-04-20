const { Client } = require('pg');

const client = new Client();

client.connect();
console.log('db client connected!');

module.exports = client;
