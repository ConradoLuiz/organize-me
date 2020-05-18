const admin = require('firebase-admin');
let serviceAccount = require('../todo-mvc-c5999-42cd687704ca.json');

console.log(process.env.PRIVATE_KEY);
console.log(process.env.PRIVATE_KEY_ID);


serviceAccount.private_key = process.env.PRIVATE_KEY
serviceAccount.private_key_id = process.env.PRIVATE_KEY_ID

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = db;