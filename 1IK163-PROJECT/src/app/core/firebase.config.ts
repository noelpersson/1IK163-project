import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Din Firebase-konfiguration
export const firebaseConfig = {
  apiKey: "AIzaSyBpCEbafL2RExB0fT37MBdmWvc2rthusYA",
  authDomain: "ik163-project.firebaseapp.com",
  projectId: "ik163-project",
  storageBucket: "ik163-project.appspot.com",
  messagingSenderId: "373521731708",
  appId: "1:373521731708:web:93a9a014d624f21137b9f9"
};

// Kontrollera om appen redan är initierad
export const firebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();

// Exportera Auth och Firestore instanser
export const auth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);
