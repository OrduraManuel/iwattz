import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCbjIv3Y2dbuZngIMYXZPF7_iV2kaTp7CA",
  authDomain: "iwattz.firebaseapp.com",
  projectId: "iwattz",
  storageBucket: "iwattz.appspot.com",
  messagingSenderId: "362039620361",
  appId: "1:362039620361:web:37b27cb04f447f13b999d8"
}

// init firebase
const app = initializeApp(firebaseConfig);

// init services
var db = getFirestore();
// init storage
const storage = getStorage(app);
// init auth
const auth = getAuth();

export { db, auth, storage };