import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUT_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};

let app;

if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig, {
    experimentalAutoDetectLongPolling: true,
  });
  const auth = firebase.auth();
} else {
  app = firebase.app();
}

export { firebase };
