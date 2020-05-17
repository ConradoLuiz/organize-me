const admin = require('firebase-admin');
let serviceAccount = require('../todo-mvc-c5999-42cd687704ca.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = db;