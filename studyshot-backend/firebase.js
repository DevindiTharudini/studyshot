// firebase.js
const admin = require('firebase-admin');

// Replace the path with the correct path to your firebase-admin.json file
const serviceAccount = require('C:/Users/Devin/Desktop/StudyShot/studyshot-backend/firebase-admin.json');  // Ensure this path is correct

// Initialize Firebase Admin SDK with service account credentials
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore(); // Firestore instance
const auth = admin.auth();    // Firebase Authentication instance

module.exports = { admin, db, auth };
