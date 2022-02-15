import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyDgbMkz1xuiP_pW7rnnCDULhZWGwgS66D4',
	authDomain: 'kick-off-ff2a8.firebaseapp.com',
	databaseURL: 'https://kick-off-ff2a8-default-rtdb.firebaseio.com',
	projectId: 'kick-off-ff2a8',
	storageBucket: 'kick-off-ff2a8.appspot.com',
	messagingSenderId: '932924712528',
	appId: '1:932924712528:web:82b9dc5d80940d73135355',
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
