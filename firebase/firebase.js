// This is for Prod, there can be another similar file for Dev environment with a different Firebase project (Ex : Staging)
const admin = require("firebase-admin");
const process = require('process');
const fs = require('fs');

const credentialFile = './pravegaherokufirebase-firebase-adminsdk-0a1ch-9727ab5137.json';

const credential = fs.existsSync(credentialFile) ? require(credentialFile) : process.env.FIREBASE_SERVICE_ACCOUNT;
// console.log(credential);

admin.initializeApp({
  credential: admin.credential.cert(credential),
  databaseURL: "https://pravegaherokufirebase.firebaseio.com"
});

module.exports = admin;
