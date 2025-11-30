// Importa el decorador Component para definir este archivo como componente de Angular.
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// Importa el Router para permitir navegación entre páginas.
import { Router } from '@angular/router';

// Componentes de Ionic usados en el template
import {
  IonContent, IonHeader, IonToolbar, IonTitle, IonList,
  IonItem, IonLabel, IonButton
} from '@ionic/angular/standalone';

// Servicio de Firebase Authentication
import { Auth } from '@angular/fire/auth';
// Funciones necesarias para consultar y eliminar documentos de Firestore
import {
  Firestore,
  collection,
  query,
  where,
  orderBy,
  getDocs,
  deleteDoc,
  doc,
  Timestamp
} from '@angular/fire/firestore';

@Component({
  selector: 'app-notificaciones-cliente', // Nombre del selector
  templateUrl: './notificaciones-cliente.page.html', // Archivo HTML asociado
  styleUrls: ['./notificaciones-cliente.page.scss'], // Archivo SCSS asociado
  standalone: true,
  // Componentes requeridos para mostrar listas, botones y estructura básica
  imports: [
    IonContent, IonHeader, IonToolbar, IonTitle,
    IonList, IonItem, IonLabel, IonButton, CommonModule
  ],
})

  export class NotificacionesClientePage {

  // Arreglo que almacenará todas las notificaciones obtenidas de Firestore
  notificaciones: any[] = [];

  // Router para navegar a otras páginas
  constructor(
    private router: Router,
    private auth: Auth,
    private firestore: Firestore
  ) {}

  // Aquí obtenemos todas las notificaciones del usuario actual
  async ionViewWillEnter() {
    // Obtiene el usuario autenticado actualmente
    const user = this.auth.currentUser;

    // Si no hay usuario autenticado
    if (!user) {
      alert("Debe iniciar sesión nuevamente.");
      return;
    }

    // Referencia a la colección "notificaciones" en Firestore
    const ref = collection(this.firestore, 'notificaciones');

    // Filtra las notificaciones que pertenezcan al usuario actual
    const q = query(
      ref,
      where('uid', '==', user.uid),
      orderBy('fecha', 'desc')
    );

    // Ejecuta la consulta y obtiene los documentos
    const snap = await getDocs(q);

    // Mapea cada documento para convertirlo en un objeto usable
    this.notificaciones = snap.docs.map(docSnap => {
      // Obtiene los datos del documento
      const data: any = docSnap.data();

      // Convertimos el Timestamp de Firebase a objeto Date
      const fechaDate: Date = data.fecha.toDate();

      // === FORMATEO DE FECHA ===
      const fechaFormateada = fechaDate.toLocaleDateString('es-PE', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });

      // === CÁLCULO DE TIEMPO RELATIVO ===
      const tiempoRelativo = this.calcularTiempoRelativo(fechaDate);

      return {
        id: docSnap.id,
        ...data,

        // Campos adicionales para mostrar en pantalla
        fechaFormateada,
        tiempoRelativo
      };
    });
  }

  // Calcula "Hace X minutos/horas/días"
  calcularTiempoRelativo(fecha: Date): string {
    // Recibe una fecha para compararla con la actual
    const ahora = new Date();
    const diffMs = ahora.getTime() - fecha.getTime();

    const minutos = Math.floor(diffMs / 60000);
    const horas = Math.floor(diffMs / 3600000);
    const dias = Math.floor(diffMs / 86400000);

    if (minutos < 1) return "Hace segundos";
    if (minutos < 60) return `Hace ${minutos} min`;
    if (horas < 24) return `Hace ${horas} h`;
    return `Hace ${dias} día(s)`;
  }

    // Elimina solo una notificación
    async borrarNotificacion(id: string) {

  // Marcamos la notificación como animando
  const index = this.notificaciones.findIndex(n => n.id === id);
  // Si no la encuentra, termina la función
  if (index === -1) return;

  // Activa la propiedad "animando" para mostrar una animación
  this.notificaciones[index].animando = true;

  //Esperamos 400ms para permitir la animación
  setTimeout(async () => {
    // Elimina el documento desde Firestore
    await deleteDoc(doc(this.firestore, 'notificaciones', id));
    // Filtra el arreglo para removerla de pantalla
    this.notificaciones = this.notificaciones.filter(n => n.id !== id);
  }, 400);
}

  // Borra todas las notificaciones del usuario
  async borrarNotificaciones() {

    if (this.notificaciones.length === 0) {
      alert("No hay notificaciones para borrar.");
      return;
    }

    // Confirma antes de borrar
    if (!confirm("¿Deseas borrar todas las notificaciones?")) return;

    // Elimina una por una desde Firestore
    for (let notif of this.notificaciones) {
      await deleteDoc(doc(this.firestore, 'notificaciones', notif.id));
    }

    // Limpia el arreglo local
    this.notificaciones = [];
    alert("Todas las notificaciones fueron eliminadas.");
  }

  // Método que redirige al menú principal
  volverAlMenu() {
    this.router.navigate(['/menu-principal']);
  }
}
