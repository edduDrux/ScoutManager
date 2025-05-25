import { ApplicationConfig } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

const firebaseConfig = {
  apiKey: 'AIzaSyDk0W17YVdjX9kyPb-RFVnuJM4sZmWqIFY',
  authDomain: 'scoutcalendar-eaf98.firebaseapp.com',
  projectId: 'scoutcalendar-eaf98',
  storageBucket: 'scoutcalendar-eaf98.firebasestorage.app',
  messagingSenderId: '342080927986',
  appId: '1:342080927986:web:b60bd418ea34015b48b86b',
  ainedId: 'G-F7H5MF8SJE',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};
