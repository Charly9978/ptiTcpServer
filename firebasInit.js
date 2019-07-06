const admin = require("firebase-admin");

const serviceAccount = require("./bip-pti-013e330dd07d.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;


