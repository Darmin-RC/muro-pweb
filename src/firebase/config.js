import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBlA8C9pIetJkbLOAIiZwU8VfHycslGGpU",
  authDomain: "muro-darmin.firebaseapp.com",
  projectId: "muro-darmin",
  storageBucket: "muro-darmin.firebasestorage.app",
  messagingSenderId: "348622024298",
  appId: "1:348622024298:web:c3d12e972dfcd7828aa413"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);