
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// Router para navegar entre páginas
import { Router } from '@angular/router';

// Importación de componentes de Ionic standalone
import {
  IonContent, IonHeader, IonToolbar, IonTitle,
  IonList, IonItem, IonLabel, IonBadge, IonButton
} from '@ionic/angular/standalone';

// Importa Auth para obtener el usuario logueado
import { Auth } from '@angular/fire/auth';
// Importa funciones de Firestore
import {
  Firestore, collection, query, getDocs, where, orderBy, doc, getDoc
} from '@angular/fire/firestore';

@Component({
  selector: 'app-historial-solicitudes', // Etiqueta del componente
  templateUrl: './historial-solicitudes.page.html', // HTML asociado
  styleUrls: ['./historial-solicitudes.page.scss'], // Estilos asociados
  standalone: true,
  imports: [
    IonContent, IonHeader, IonToolbar, IonTitle,
    IonList, IonItem, IonLabel, IonBadge, IonButton,
    CommonModule
  ],
})

  export class HistorialSolicitudesPage {

  // Array donde se almacenará el historial final unificado
  solicitudes: any[] = [];

  // Constructor recibe Router, Auth y Firestore
  constructor(
    private router: Router,
    private auth: Auth,
    private firestore: Firestore
  ) {}

  // Carga historial al entrar
  async ionViewWillEnter() {
    // Obtiene el usuario actual desde Auth
    const user = this.auth.currentUser;
    // Si no está logueado, no permite continuar
    if (!user) { alert("Debe iniciar sesión."); return; }

    // Limpia el array antes de volverlo a llenar
    this.solicitudes = [];

    /* Cargar Soporte */
    try {
      // Referencia a la colección "solicitudes_soporte"
      const refSop = collection(this.firestore, 'solicitudes_soporte');
      // Query: solicitudes donde uid === usuario actual
      const qSop = query(refSop, where('uid', '==', user.uid), orderBy('fecha', 'desc'));
      // Ejecuta query y obtiene lista
      const snapSop = await getDocs(qSop);

      // Recorre cada documento
      for (const d of snapSop.docs) {
        const data: any = d.data();
        // Solicitud de soporte al array final
        this.solicitudes.push({
          id: d.id,
          tipo: 'soporte',
          tipoDispositivo: data.tipoDispositivo || 'Sin dispositivo',
          descripcion: data.descripcion || 'Sin descripción',
          fecha: data.fecha?.toDate?.() || new Date(data.fecha),
          estado: data.estado || 'pendiente',
        });
      }
    } catch (err) {
      console.error("Error cargando soporte:", err);
    }

    /* Cargar Productos */
    try {
      // Referencia a la colección de productos
      const refProd = collection(this.firestore, 'solicitudes_productos');
      // Obtiene TODOS los documentos
      const snapProd = await getDocs(refProd);

      // Recorre cada documento
      for (const d of snapProd.docs) {
        const data: any = d.data();

        // Solo tomar las solicitudes del usuario actual
        if (data.uid !== user.uid) continue;

        // Convierte fecha a Date
        const fecha = data.fecha?.toDate?.() || new Date(data.fecha);

        // Variable que guarda los nombres de los productos 
        let nombres: string[] = [];

        // 1. Array de productos
        if (Array.isArray(data.productos)) {
          nombres = data.productos.map((p: any) =>
            (p?.nombre || p?.producto || p?.name || p || '')
          );
        }
        // 2. Producto único en distintos campos
        else if (typeof data.productoLista === 'string') nombres = [data.productoLista];
        else if (typeof data.producto === 'string') nombres = [data.producto];
        else if (typeof data.productoSeleccionado === 'string') nombres = [data.productoSeleccionado];
        else nombres = ['Sin producto'];

        // Agrega la solicitud al array final
        this.solicitudes.push({
          id: d.id,
          tipo: 'producto',
          productoLista: nombres.join(', '),
          fecha,
          estado: data.estado || 'pendiente',
        });
      }
    } catch (err) {
      console.error("Error cargando productos:", err);
    }

    // Ordenar todas las solicitudes por fecha descendente
    this.solicitudes.sort((a, b) => b.fecha.getTime() - a.fecha.getTime());
    // Muestra en consola el resultado final
    console.log("Historial final:", this.solicitudes);
  }

  // Retorna color segun el estado
  getEstadoColor(estado: string): string {
    switch ((estado || '').toLowerCase()) {
      case 'atendido': return 'success';
      case 'en proceso': return 'warning';
      case 'pendiente': return 'danger';
      default: return 'medium';
    }
  }

  // Método para volver al menú principal
  volverAlMenu() {
    this.router.navigate(['/menu-principal']);
  }
}
