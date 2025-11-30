/**
 * Página que muestra los datos del usuario obtenidos de la colección "users".
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

// Importa los componentes de Ionic usados en el HTML de esta página
import {
  IonContent, IonHeader, IonToolbar, IonTitle,
  IonItem, IonLabel, IonButton,
  IonList
} from '@ionic/angular/standalone';

// Firebase
import { Auth } from '@angular/fire/auth';
// Firestore y funciones para leer documentos
import { Firestore, doc, getDoc } from '@angular/fire/firestore';

@Component({
  // Nombre del selector del componente
  selector: 'app-acerca-de-mi-cuenta',
  // Archivo HTML asociado al componente
  templateUrl: './acerca-de-mi-cuenta.page.html',
  // Archivo de estilos
  styleUrls: ['./acerca-de-mi-cuenta.page.scss'],
  // Indica que el componente es standalone
  standalone: true,
  // Componentes necesarios que serán usados en el HTML
  imports: [
    IonContent, IonHeader, IonToolbar, IonTitle,
    IonItem, IonLabel, IonButton, CommonModule,
    IonList
  ],
})

  export class AcercaDeMiCuentaPage {
  /**
   * Objeto donde se almacenarán los datos del usuario actual
   */
  usuario: any = {
    fullName: '',
    phone: '',
    email: '',
    username: ''
  };

  constructor(
    private router: Router,
    private auth: Auth,
    private firestore: Firestore
  ) {}

  /**
   * Aquí se lee los datos del usuario
   */
  async ionViewWillEnter() {

    // Obtiene el usuario autenticado actualmente
    const user = this.auth.currentUser;

    // Si no existe sesión abierta, se pide volver a iniciar sesión
    if (!user) {
      alert("Debe iniciar sesión nuevamente.");
      return;
    }

    // Se construye la referencia al documento en Firestore: users/{uid}
    const ref = doc(this.firestore, 'users', user.uid);

    // Realiza la lectura del documento
    const snap = await getDoc(ref);

    // Si el documento existe, asigna los datos al objeto usuario
    if (snap.exists()) {
      // Se asigna los datos reales al objeto usuario
      this.usuario = snap.data();
    } else {
      // Si no se encontró en Firestore, se alerta al usuario
      alert("No se encontraron datos del usuario en Firebase.");
    }
  }

    /**
    * Función para regresar al panel principal del administrador"
    */
    volverAlMenu() {
      this.router.navigate(['/menu-principal']);
      }
    }
