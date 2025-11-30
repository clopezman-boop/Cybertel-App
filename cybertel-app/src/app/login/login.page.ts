// Importa Component para definir el componente Angular
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// FormsModule para trabajar con [(ngModel)]
import { FormsModule } from '@angular/forms';
// Router para navegar entre páginas
import { Router } from '@angular/router';
// Componentes de Ionic Standalone
import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonTitle, IonToolbar } 
from '@ionic/angular/standalone';
// Servicio de autenticación
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  // Componentes de Ionic + módulos
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonItem, IonButton, IonInput, IonLabel,
    CommonModule, FormsModule
  ]
})
export class LoginPage {

  // Variables enlazadas al formulario de login
  username: string = '';
  password: string = '';

  // Inyecta Router y AuthService
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  // Método principal: se ejecuta cuando el usuario inicia sesión
  async onSubmit() {
    try {
      // Llama al servicio y obtiene el rol si el login fue correcto
      const role = await this.authService.loginUser(this.username, this.password);

      if (!role) {
        alert("Usuario sin rol o no encontrado");
        return;
      }

      // Redirecciones según el rol retornado por Firestore
      if (role === 'admin') {
        alert('Bienvenido Administrador');
        this.router.navigate(['/panel-admin']);
      }
      else if (role === 'cliente') {
        alert('Bienvenido Cliente');
        this.router.navigate(['/menu-principal']);
      }
      else {
        alert("Rol desconocido");
      }

    } catch (error: any) {
      alert("Error en login: " + error.message);
    }
  }
}

