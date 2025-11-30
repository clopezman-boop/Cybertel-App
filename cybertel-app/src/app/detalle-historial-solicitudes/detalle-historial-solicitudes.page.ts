
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// Componentes Ionic standalone que se usarán en el HTML
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonBadge, IonLabel, IonButton
} from '@ionic/angular/standalone';

// Firestore y funciones necesarias
import {
  Firestore, collection, getDocs, query, where,
  doc, getDoc
} from '@angular/fire/firestore';

@Component({
  selector: 'app-detalle-historial-solicitudes', // Selector HTML
  templateUrl: './detalle-historial-solicitudes.page.html', // HTML asociado
  styleUrls: ['./detalle-historial-solicitudes.page.scss'], // CSS asociado
  // Componente independiente
  standalone: true,
  // Componentes usados en el template
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonList, IonItem, IonBadge, IonLabel, IonButton,
    CommonModule
  ]
})

  export class DetalleHistorialSolicitudesPage {

  // Array de solicitudes para el HTML
  solicitudesAtendidas: any[] = [];

  // Inyectamos Firestore
  constructor(private firestore: Firestore) {}

  // Cargar solicitudes al inicializar
  async ngOnInit() {
    // Llama a la función que carga todas las solicitudes atendidas
    await this.cargarSolicitudesAtendidas();
  }

  // Función principal que carga solicitudes de dos colecciones: productos y soporte
  async cargarSolicitudesAtendidas() {
    // Se limpia el arreglo para evitar duplicados al recargar
    this.solicitudesAtendidas = [];

    /* SOLICITUDES DE PRODUCTO */
    try {
      // Referencia a la colección solicitudes_productos
      const refProd = collection(this.firestore, 'solicitudes_productos');

      // Filtramos por estado EXACTO 'atendido'
      const qProd = query(refProd, where('estado', '==', 'atendido'));
      // Ejecutamos la consulta y obtenemos el snapshot de resultados
      const snapProd = await getDocs(qProd);

      // Recorremos cada documento encontrado
      for (const docSnap of snapProd.docs) {
        // Obtenemos la data del documento
        const data: any = docSnap.data();

        // Normalizamos la fecha convirtiéndola a objeto Date
        const fecha = data.fecha?.toDate?.() || new Date(data.fecha);

        // Nombre del cliente robusto
        let nombreCliente =
          data.clienteNombre ||
          data.nombreCompleto ||
          data.cliente ||
          '';

        // Si el nombre viene vacío, buscamos en users/{uid}
        if ((!nombreCliente || nombreCliente.trim() === '') && data.uid) {
          try {
            // Obtiene el documento del usuario usando su UID
            const uSnap = await getDoc(doc(this.firestore, 'users', data.uid));
            // Si el documento existe, extraemos el nombre del cliente
            if (uSnap.exists()) {
              const u: any = uSnap.data();
              // Encontrar el nombre según campo disponible
              nombreCliente = u.fullName || u.displayName || u.name || nombreCliente;
            }
          } catch (err) {        
            console.warn('No se pudo leer users/{uid} para producto atendido', err);
          }
        }

        // Si sigue sin nombre, se establece un valor por defecto
        if (!nombreCliente) nombreCliente = 'Cliente';

        // Normaliza el campo productos a un array real
        const productosArr: any[] = Array.isArray(data.productos) ? data.productos : [];

        // Convertimos cada producto a texto seguro y legible
        const productosNombres = productosArr.map(p => {
          // Si viene nulo
          if (!p) return '';
          // Si es un objeto, extraemos el nombre desde diferentes posibles claves
          if (typeof p === 'object') {
            return p.nombre || p.producto || p.name || '';
          }
          // Si es un string, lo devolvemos directamente
          if (typeof p === 'string') return p;
          // Si no coincide con nada, lo convertimos a JSON
          try { return JSON.stringify(p); } catch { return ''; }
          // Elimina vacíos
        }).filter(Boolean);

        // Construimos la propiedad que usa tu HTML: productoLista (string)
        const productoLista = productosNombres.length > 0 ? productosNombres.join(', ') : 'Sin productos';


        // Guardamos la solicitud formateada en el array principal
        this.solicitudesAtendidas.push({
          id: docSnap.id,
          tipo: 'producto',
          nombreCliente,
          productoLista,      
          productos: productosArr,
          fecha,
          estado: 'atendido'
        });
      }
    } catch (err) {
      // Error en caso falle cargar las solicitudes de productos
      console.error("Error cargando productos atendidos:", err);
    }

    /* SOLICITUDES DE SOPORTE */
    try {
      // Referencia a la colección solicitudes_soporte
      const refSop = collection(this.firestore, 'solicitudes_soporte');
      // Filtramos solo los documentos cuyo estado es "atendido"
      const qSop = query(refSop, where('estado', '==', 'atendido'));
      // Obtenemos los documentos resultantes
      const snapSop = await getDocs(qSop);

      // Recorremos cada documento encontrado
      for (const docSnap of snapSop.docs) {
        // Obtenemos los datos del documento
        const data: any = docSnap.data();
        // Normalizamos la fecha
        const fecha = data.fecha?.toDate?.() || new Date(data.fecha);
        // Intentamos obtener el nombre del cliente
        let nombreCliente =
          data.clienteNombre ||
          data.nombreCompleto ||
          data.cliente ||
          '';

        // Si hay nombre vacío, buscamos en users/{uid}
        if ((!nombreCliente || nombreCliente.trim() === '') && data.uid) {
          try {
            // Leemos el documento del usuario
            const uSnap = await getDoc(doc(this.firestore, 'users', data.uid));
            // Si existe, extraemos el nombre más adecuado
            if (uSnap.exists()) {
              const u: any = uSnap.data();
              nombreCliente = u.fullName || u.displayName || u.name || nombreCliente;
            }
          } catch (err) {
            console.warn('No se pudo leer users/{uid} para soporte atendido', err);
          }
        }

        // Si sigue sin nombre, asignamos uno por defecto
        if (!nombreCliente) nombreCliente = 'Cliente';

        // Agregamos la solicitud formateada al array
        this.solicitudesAtendidas.push({
          id: docSnap.id,
          tipo: 'soporte',
          nombreCliente,
          dispositivo: data.tipoDispositivo || data.dispositivo || 'Sin dispositivo',
          descripcion: data.descripcion || 'Sin descripción',
          fecha,
          estado: 'atendido'
        });
      }
    } catch (err) {
      // Error en caso falle cargar solicitudes de soporte
      console.error("Error cargando soporte atendido:", err);
    }

    /* ORDENAR POR FECHA (desc) */
    this.solicitudesAtendidas.sort((a, b) => b.fecha.getTime() - a.fecha.getTime());
  }

  // Método que devuelve el color del badge según el estado
  getEstadoColor(estado: string): string {
    return (estado || '').toLowerCase() === 'atendido' ? 'success' : 'medium';
  }

  // Método para volver
  volver() {
    history.back();
  }
}
