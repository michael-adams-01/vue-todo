import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDTy5Gbh2mmANhPJfq38cNcarnHRFGfaEM",
  authDomain: "vuetodo-26a3c.firebaseapp.com",
  databaseURL: "https://vuetodo-26a3c-default-rtdb.firebaseio.com",
  projectId: "vuetodo-26a3c",
  storageBucket: "vuetodo-26a3c.firebasestorage.app",
  messagingSenderId: "885606280472",
  appId: "1:885606280472:web:2ffb7b185746ffe71e826d"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }
