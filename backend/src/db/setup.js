const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

const client = new Client();

const users = fs.readFileSync(path.join(__dirname, '/migrates/users.sql')).toString();
const root = fs.readFileSync(path.join(__dirname, '/migrates/root.sql')).toString();
const comments = fs.readFileSync(path.join(__dirname, '/migrates/comments.sql')).toString();

(async () => {
  await client.connect();

  // Созданаем таблицу users
  await client.query(users);
  console.log('Tables users created');

  // Создаем таблицу comments
  await client.query(comments);
  console.log('Comments created');

  // Создаем в users рута
  await client.query(root);
  console.log('Root created');

  client.end();
})();
