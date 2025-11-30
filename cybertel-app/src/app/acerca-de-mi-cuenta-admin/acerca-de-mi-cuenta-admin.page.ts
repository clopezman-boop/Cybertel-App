/**
 * Página que muestra los datos del Admin obtenidos desde la colección "users".
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

// Importación de los componentes de Ionic usados en esta página
import {
  IonContent, IonHeader, IonToolbar, IonTitle,
  IonItem, IonLabel, IonButton,
  IonList
} from '@ionic/angular/standalone';

// Importa el servicio de autenticación de Firebase
import { Auth } from '@angular/fire/auth';
// Importa Firestore y las funciones necesarias para leer documentos
import { Firestore, doc, getDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-acerca-de-mi-cuenta-admin',
  // Ruta del archivo HTML asociado al componente
  templateUrl: './acerca-de-mi-cuenta-admin.page.html',
  // Archivo de estilos SCSS del componente
  styleUrls: ['./acerca-de-mi-cuenta-admin.page.scss'],
  // Indica que el componente utiliza standalone
  standalone: true,
  // Componentes de Ionic y Angular
  imports: [
    IonContent, IonHeader, IonToolbar, IonTitle,
    IonItem, IonLabel, IonButton, CommonModule,
    IonList
  ],
})
export class AcercaDeMiCuentaAdminPage {

  /** Objeto que almacena los datos del usuario administrador */
  usuario: any = {
    fullName: '',
    phone: '',
    email: '',
    username: ''
  };

  // Constructor del componente
  constructor(
    private router: Router,
    private auth: Auth,
    private firestore: Firestore
  ) {}

  /** Se ejecuta al entrar */
  async ionViewWillEnter() {

    // Obtiene al usuario autenticado actualmente
    const user = this.auth.currentUser;

    // Si no existe un usuario logueado, se avisa y se detiene todo
    if (!user) {
      alert("Debe iniciar sesión nuevamente.");
      return;
    }

    // Construye la referencia al documento: users/{uid}
    const ref = doc(this.firestore, 'users', user.uid);
    // Solicita a Firestore el documento del administrador
    const snap = await getDoc(ref);

    // Si el documento existe, llena los datos en el objeto `usuario`
    if (snap.exists()) {
      this.usuario = snap.data();
    } else {
      alert("No se encontraron datos del admin en Firebase.");
    }
  }

  /**
   * Función para regresar al panel principal del administrador"
   */
  volverAlMenu() {
    this.router.navigate(['/panel-admin']);
  }

}
