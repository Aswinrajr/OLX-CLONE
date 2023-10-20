import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDlT7ITI-8bVd-LpyeB3kCvv9V7ZJ8fNSE",
  authDomain: "olx-clone-d8009.firebaseapp.com",
  projectId: "olx-clone-d8009",
  storageBucket: "olx-clone-d8009.appspot.com",
  messagingSenderId: "527314065671",
  appId: "1:527314065671:web:25ff81bf78da8652678da2",
  measurementId: "G-5X9205R37J",
};

export default firebase.initializeApp(firebaseConfig);
