import * as admin from 'firebase-admin';
import * as serviceAccount from './serviceAccountKey.json';

const { getFirestore } = require('firebase-admin/firestore');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as any),
});

const db = getFirestore();

export { db };
