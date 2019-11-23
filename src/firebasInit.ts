
import * as admin from 'firebase-admin'
let serviceAccount = require('../bip-pti-013e330dd07d.json');



admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

let db = admin.firestore()

export default db