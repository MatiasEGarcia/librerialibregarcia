import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA2iYenDy_5NRi2fVfDPDtjzo6FjP5fhtc",
  authDomain: "librerialibre-662fd.firebaseapp.com",
  projectId: "librerialibre-662fd",
  storageBucket: "librerialibre-662fd.appspot.com",
  messagingSenderId: "417861493940",
  appId: "1:417861493940:web:0f7dbda637a12ae02363e1"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
