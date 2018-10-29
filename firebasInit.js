const admin = require("firebase-admin");

const serviceAccount = require("./ev07pti-firebase-adminsdk-ttrsu-22f6c81c01.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;


