/**
 * Aquí se inicializa Firebase con Ionic Standalone Components.
 */

import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

// Importamos la configuración desde environment.ts
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),

    // Inicializar Firebase
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),

    // Autenticación
    provideAuth(() => getAuth()),

    // Base de datos Firestore
    provideFirestore(() => getFirestore())
  ],
};