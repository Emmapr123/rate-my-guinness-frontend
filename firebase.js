import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: 'AIzaSyDeQtU4ReyPguO3tY6bWx0-_bLCFeCVvnc',
  authDomain: 'guinness-backend.firebaseapp.com',
  databaseURL: 'https://guinness-backend-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'guinness-backend',
  storageBucket: 'guinness-backend.appspot.com',
  messagingSenderId: '830781784006',
  appId: '1:830781784006:web:239345bd8151f8bbe17cc7',
  measurementId: 'G-JK9S60X53D',
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
