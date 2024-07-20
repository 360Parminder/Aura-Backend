// firebase.js
const admin = require('firebase-admin');
const serviceAccount = require('../../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'slugplay-314e4.appspot.com'
});

const bucket = admin.storage().bucket();
const firestore = admin.firestore();

module.exports = { bucket, firestore };