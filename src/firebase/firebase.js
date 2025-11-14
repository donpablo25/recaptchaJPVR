import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYbF7F1FiUEmza9CTWp39gzLUWXRSJNsM",
  authDomain: "projettest1-b35df.firebaseapp.com",
  projectId: "projettest1-b35df",
  storageBucket: "projettest1-b35df.firebasestorage.app",
  messagingSenderId: "884342503193",
  appId: "1:884342503193:web:502b71b16245aebe6cf788"
};
// Initialize Firebase
export const auth = getAuth(app);

const app = initializeApp(firebaseConfig);



export const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('6LfFHwwsAAAAABll-x53go9et7SJQUetBkHmLdaS'),
  isTokenAutoRefreshEnabled: true
});

