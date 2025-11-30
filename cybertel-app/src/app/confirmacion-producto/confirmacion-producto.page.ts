// Importamos Component para definir un componente Angular
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// Router para navegación entre páginas
import { Router } from '@angular/router';
// Importamos componentes de Ionic standalone
import {
  IonButton,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-confirmacion-producto', // Selector del componente
  templateUrl: './confirmacion-producto.page.html', // HTML asociado
  styleUrls: ['./confirmacion-producto.page.scss'], // CSS asociado
  standalone: true, 
  // Componentes usados
  imports: [IonContent, IonHeader, IonToolbar, IonTitle, IonButton, CommonModule],
})
export class ConfirmacionProductoPage {

  // Se implementa el Router para controlar la navegación entre páginas
  constructor(private router: Router) {}

  // Método para regresar al menú principal
  volverAlMenu() {
    this.router.navigate(['/menu-principal']);
  }

  // Método para redirigir al catálogo de productos
  verCatalogo() {
    this.router.navigate(['/catalogo']);
  }
}
