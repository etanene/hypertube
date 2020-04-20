const { Client } = require('pg');
const fs = require('fs');
const path = require('path');


const client = new Client();

const users = fs.readFileSync(path.join(__dirname, '/migrates/users.sql')).toString();
const root = fs.readFileSync(path.join(__dirname, '/migrates/root.sql')).toString();


(async () => {
  await client.connect();

  // Созданаем таблицу users
  await client.query(users);
  console.log('Tables users created');

  // Создаем в users рута
  await client.query(root);
  console.log('Root created');

  client.end();
})();
