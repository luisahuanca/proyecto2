
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyD6KYBOrxc-Xa_wZWFlmc-LTW0KYIbJIO4",
  authDomain: "crud2-dd291.firebaseapp.com",
  projectId: "crud2-dd291",
  storageBucket: "crud2-dd291.appspot.com",
  messagingSenderId: "610530439804",
  appId: "1:610530439804:web:697e88d092b562f5488ff9"
};


const app = initializeApp(firebaseConfig);
export const dbConfig = getFirestore(app);