import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// Importa el Router para permitir navegación entre páginas.
import { Router } from '@angular/router';
// Importa todos los componentes de Ionic que serán usados en el HTML
import {
  IonButton, IonContent, IonHeader, IonItem, IonLabel,
  IonList, IonTitle, IonToolbar
} from '@ionic/angular/standalone';
// Importa servicio de autenticación para controlar login/logout.
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-menu-principal', // Nombre del selector del componente
  templateUrl: './menu-principal.page.html', // Ruta del archivo HTML asociado
  styleUrls: ['./menu-principal.page.scss'], // Ruta del archivo de estilos CSS/SCSS
  standalone: true,
  // Lista de módulos y componentes
  imports: [
    IonContent, IonHeader, IonToolbar, IonTitle,
    IonItem, IonLabel, IonButton, IonList, CommonModule
  ]
})

  export class MenuPrincipalPage {

    // Inyección del servicio Router para manejar navegación
  constructor(
    private router: Router,
    // Inyección de tu servicio AuthService para cerrar sesión
    private authService: AuthService
  ) {}

  // Método que recibe el nombre de una página.
  goTo(page: string) {
    this.router.navigate([`/${page}`]);
  }

  // Cierra sesión usando Firebase Auth
  async logout() {
    // Llama a la función logout del AuthService para cerrar sesión en Firebase
    await this.authService.logout(); 
    // Redirige al usuario a la pantalla de login.
    this.router.navigate(['/login']);
  }
}
