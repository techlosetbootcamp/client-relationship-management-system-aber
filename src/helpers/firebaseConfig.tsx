import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/app"

const firebaseConfig = {
  apiKey: "AIzaSyAdQKUBOzG9sawUjFInLtAbonJ5Z1paAa0",
  authDomain: "crm-techloset.firebaseapp.com",
  projectId: "crm-techloset",
  storageBucket: "crm-techloset.appspot.com",
  messagingSenderId: "465704996946",
  appId: "1:465704996946:web:b8e4f9de4d7d6df9634f8b",
  measurementId: "G-3ECPQ34VTR",
};

export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);