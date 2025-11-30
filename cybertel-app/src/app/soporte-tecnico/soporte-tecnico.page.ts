// Importa el decorador Component desde Angular
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// Importa Router para realizar navegaciones entre páginas
import { Router } from '@angular/router';

// Importa los componentes UI de Ionic
import {
  IonButton, IonContent, IonHeader, IonInput, IonItem,
  IonLabel, IonTextarea, IonTitle, IonToolbar
} from '@ionic/angular/standalone';

// Servicio de autenticación de Firebase
import { Auth } from '@angular/fire/auth';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
// Timestamp de Firebase para guardar fechas correctamente
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-soporte-tecnico', // Nombre del selector
  templateUrl: './soporte-tecnico.page.html', // HTML asociado
  styleUrls: ['./soporte-tecnico.page.scss'], // SCSS asociado
  standalone: true,
  // Módulos que necesita
  imports: [
    IonContent, IonHeader, IonToolbar, IonTitle,
    IonItem, IonLabel, IonButton, IonInput, IonTextarea,
    CommonModule, FormsModule
  ]
})

  export class SoporteTecnicoPage {

  // Variables del formulario
  tipoDispositivo: string = '';
  descripcion: string = '';

  constructor(
    private router: Router,
    private auth: Auth,
    private firestore: Firestore
  ) {}

  // Registrar solicitud de soporte
  async registrarSolicitud() {

    // Validación de campos vacíos
    if (!this.tipoDispositivo || !this.descripcion) {
      alert('Complete todos los campos.');
      return;
    }

    try {
      // Verificar si existe un usuario conectado
      const user = this.auth.currentUser;

      // Si el usuario no está logueado
      if (!user) {
        alert("No hay sesión activa. Inicie sesión nuevamente.");
        return;
      }

      // Guardar solicitud en la colección "solicitudes_soporte"
      const refSolicitudes = collection(this.firestore, 'solicitudes_soporte');

      await addDoc(refSolicitudes, {
        uid: user.uid,
        tipoDispositivo: this.tipoDispositivo,
        descripcion: this.descripcion,
        estado: 'pendiente',
        fecha: Timestamp.now() 
      });

      // Crear notificación automática
      const refNotificaciones = collection(this.firestore, 'notificaciones');

      await addDoc(refNotificaciones, {
        // Vincula notificación al usuario
        uid: user.uid,
        mensaje: `Tu solicitud de soporte para "${this.tipoDispositivo}" fue registrada y está en espera.`,
        estado: 'pendiente',
        fecha: Timestamp.now()
      });

      // Limpiar formulario después de enviar
      this.tipoDispositivo = '';
      this.descripcion = '';

      // Redirige a página de confirmación
      this.router.navigate(['/confirmacion-soporte-tecnico']);

    } catch (e: any) {
      // Muestra el error en consola y alerta
      console.error("ERROR FIRESTORE:", e);
      alert("Ocurrió un error al enviar la solicitud: " + e.message);
    }
  }

  // Método para volver al menú principal
  volverAlMenu() {
    this.router.navigate(['/menu-principal']);
  }
}
