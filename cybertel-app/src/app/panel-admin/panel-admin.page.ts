// Importa el decorador Component para definir un componente Angular
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// Importa Router para permitir navegar entre rutas dentro de la app
import { Router } from '@angular/router';
// Importa componentes standalone de Ionic que se usarán en el template
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonButton
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-panel-admin', // Selector
  templateUrl: './panel-admin.page.html', // Archivo HTML asociado
  styleUrls: ['./panel-admin.page.scss'], // Archivo SCSS asociado
  standalone: true,
  // Componentes y módulos requeridos por el template
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonList,
    IonButton,
    CommonModule
  ]
})

  export class PanelAdminPage {
  // Constructor donde inyectamos Router para navegación
  constructor(private router: Router) {}

  /**
   * Navegar a la ruta indicada
   * @param route nombre de la ruta
   */
  goTo(route: string) {
    // Navega a /<route> usando Router
    this.router.navigate([`/${route}`]);
  }

  // Cierra la sesión del Administrador
  logout() {
    alert('Sesión finalizada correctamente.');
    // Redirige a la pantalla de login después de cerrar sesión
    this.router.navigate(['/login']);
  }
}
