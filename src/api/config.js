import { initializeApp } from 'firebase/app'
import { getStorage } from "firebase/storage";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCnsG2wTD_b4JWdrs27fMg66xNcItLL-WI",
  authDomain: "vue3-project-28394.firebaseapp.com",
  projectId: "vue3-project-28394",
  storageBucket: "vue3-project-28394.appspot.com",
  messagingSenderId: "320948926233",
  appId: "1:320948926233:web:22847b8f82262b5513b788",
  storageBucket: 'gs://vue3-project-28394.appspot.com'
}

// init firebase
initializeApp(firebaseConfig)

// init services
var db = getFirestore()
// init storage
const storage = getStorage();
// init auth
const auth = getAuth()

export { db, auth, storage }