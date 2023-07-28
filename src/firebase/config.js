import { initializeApp } from "firebase/app";
import { getFirestore, Timestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD7vWri23XCfAbDaBKMmisrJBvfqGNZUYc",
  authDomain: "my-money-19d85.firebaseapp.com",
  projectId: "my-money-19d85",
  storageBucket: "my-money-19d85.appspot.com",
  messagingSenderId: "630299651031",
  appId: "1:630299651031:web:b2a94467da3eb70afef992",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

const timestamp = Timestamp;

export { db, auth, timestamp };
