import * as admin from 'firebase-admin';
const { getFirestore } = require('firebase-admin/firestore');

import * as serviceAccount from './serviceAccountKey.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as any),
});

const db = getFirestore();

export { db };
