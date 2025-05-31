// src/app/app.config.ts
import { provideHttpClient } from '@angular/common/http'; // Se for fazer chamadas HTTP além do Firebase
import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'; // Para Angular Material
import { provideRouter, withComponentInputBinding } from '@angular/router'; // withComponentInputBinding para passar params de rota como inputs
import { routes } from './app.routes';

// Opcional: Se for usar @angular/fire
// import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
// import { provideAuth, getAuth } from '@angular/fire/auth';
// import { provideFirestore, getFirestore } from '@angular/fire/firestore';
// import { firebaseConfig } from './firebase.config'; // Se o firebaseConfig estiver no mesmo arquivo

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()), // Habilita binding de parâmetros de rota para inputs de componentes
    provideHttpClient(),
    provideAnimationsAsync(),
    // Se usar @angular/fire:
    // importProvidersFrom(
    //   provideFirebaseApp(() => initializeApp(firebaseConfig)),
    //   provideAuth(() => getAuth()),
    //   provideFirestore(() => getFirestore())
    // ),
  ],
};
