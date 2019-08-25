// This is for Prod, there can be another similar file for Dev environment with a different Firebase project (Ex : Staging)
const admin = require("firebase-admin");
const process = require('process');
const fs = require('fs');

function getCredentials() {
  const credentialFile = './config/pravegaherokufirebase-firebase-adminsdk-0a1ch-9727ab5137.json';
  let credentialText = ""

  if ( fs.existsSync(credentialFile) ) {
    console.log("On Local Dev, taking from file. ");
    credentialText = fs.readFileSync(credentialFile);
  }
  
  else {
    console.log("On Heroku, taking from environment variable. ");
    credentialText = process.env.FIREBASE_SERVICE_ACCOUNT;
  }

  return JSON.parse(credentialText);
}

admin.initializeApp({
  credential: admin.credential.cert(getCredentials()),
  databaseURL: "https://pravegaherokufirebase.firebaseio.com"
});

module.exports = admin;
