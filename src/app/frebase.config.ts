// src/app/firebase.config.ts
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';
// import { getAnalytics, Analytics } from "firebase/analytics"; // Descomente se for usar Analytics

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDk0W17YVdjX9kyPb-RFVnuJM4sZmWqIFY', // Mantenha suas chaves seguras! Considere variáveis de ambiente.
  authDomain: 'scoutcalendar-eaf98.firebaseapp.com',
  projectId: 'scoutcalendar-eaf98',
  storageBucket: 'scoutcalendar-eaf98.firebasestorage.app',
  messagingSenderId: '342080927986',
  appId: '1:342080927986:web:b60bd418ea34015b48b86b',
  measurementId: 'G-F7H5MF8SJE', // Opcional
};

// Initialize Firebase
export const FIREBASE_APP: FirebaseApp = initializeApp(firebaseConfig);
export const FIREBASE_AUTH: Auth = getAuth(FIREBASE_APP);
export const FIREBASE_FIRESTORE: Firestore = getFirestore(FIREBASE_APP);
// export const FIREBASE_ANALYTICS: Analytics = getAnalytics(FIREBASE_APP); // Descomente se for usar

// Opcional: provedores para injeção de dependência
// import { importProvidersFrom } from '@angular/core';
// import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
// import { provideAuth, getAuth } from '@angular/fire/auth';
// import { provideFirestore, getFirestore } from '@angular/fire/firestore';

// export function firebaseProviders() {
//   return importProvidersFrom(
//     provideFirebaseApp(() => initializeApp(firebaseConfig)),
//     provideAuth(() => getAuth()),
//     provideFirestore(() => getFirestore())
//   );
// }
