// Importa el decorador Component para definir un componente
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// Router para navegar entre páginas
import { Router } from '@angular/router';
// Importaciones de IONIC UI
import {
  IonButton, IonContent, IonHeader, IonInput, IonItem,
  IonLabel, IonTitle, IonToolbar, IonCard, IonCardHeader,
  IonCardTitle, IonCardSubtitle, IonCardContent
} from '@ionic/angular/standalone';

// Firebase
import { Auth } from '@angular/fire/auth';
import { Firestore, collection, addDoc, Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-solicitud-producto', // Nombre del selector
  templateUrl: './solicitud-producto.page.html', // Vista HTML asociada
  styleUrls: ['./solicitud-producto.page.scss'], // SCSS asociado
  standalone: true,
  // Lista de módulos usados
  imports: [
    IonContent, IonHeader, IonToolbar, IonTitle, IonItem,
    IonLabel, IonButton, IonInput, IonCard, IonCardHeader,
    IonCardTitle, IonCardSubtitle, IonCardContent,
    CommonModule, FormsModule
  ]
})

  export class SolicitudProductoPage {

  // Variables del formulario
  nombreCompleto = '';
  telefono = '';
  direccion = '';

  // Carrito con los productos seleccionados
  carrito: any[] = [];

  constructor(
    private router: Router,
    private auth: Auth,
    private firestore: Firestore
  ) {}

  // ngOnInit(): carga el carrito desde localStorage
  ngOnInit() {
    const guardado = localStorage.getItem('carritoProductos');
    this.carrito = guardado ? JSON.parse(guardado) : [];
  }

  // Elimina un producto del carrito por su índice
  eliminarProducto(index: number) {
    this.carrito.splice(index, 1);
    // Actualiza el localStorage con el nuevo carrito
    localStorage.setItem('carritoProductos', JSON.stringify(this.carrito));
  }

    // Envia la solicitud a Firebase
    async enviarSolicitud() {

    // Validación de datos obligatorios
    if (!this.nombreCompleto || !this.telefono || !this.direccion) {
      alert('Complete todos los campos.');
      return;
    }

    if (this.carrito.length === 0) {
      alert('Debe seleccionar al menos un producto.');
      return;
    }

    try {
      // Obtiene el usuario autenticado
      const user = this.auth.currentUser;

      if (!user) {
        alert("No hay sesión activa.");
        return;
      }

      // Guarda solicitud en Firestore
      const refSolicitudes = collection(this.firestore, 'solicitudes_productos');

      await addDoc(refSolicitudes, {
        uid: user.uid,
        nombreCompleto: this.nombreCompleto,
        telefono: this.telefono,
        direccion: this.direccion,
        productos: this.carrito,
        estado: 'pendiente',
        fecha: Timestamp.now() // Timestamp de Firebase
      });

      // Crear notificación automática
      const refNotificaciones = collection(this.firestore, 'notificaciones');

      await addDoc(refNotificaciones, {
        uid: user.uid,
        mensaje: `Tu pedido fue recibido y está en espera.`,
        estado: 'pendiente',
        fecha: Timestamp.now()
      });

      // Limpia el carrito después de enviar formulario
      localStorage.removeItem('carritoProductos');
      this.carrito = [];

      // Redirigir a la página de confirmación
      this.router.navigate(['/confirmacion-producto']);

    } catch (e: any) {
      alert('Error al enviar: ' + e.message);
    }
  }

  // Método para volver al menú principal
    volverAlMenu() {
      this.router.navigate(['/menu-principal']);
    }
  }
