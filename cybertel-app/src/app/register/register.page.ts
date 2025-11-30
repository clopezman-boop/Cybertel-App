// Importa Component para definir un componente Angular
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// Importa Router para navegación entre páginas
import { Router } from '@angular/router';
// Importa componentes standalone de Ionic usados en el template
import {
  IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonTitle, IonToolbar
} from '@ionic/angular/standalone';

// Importa el servicio de autenticación
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register', // Selector 
  templateUrl: './register.page.html', // Ruta al HTML asociado
  styleUrls: ['./register.page.scss'], // Ruta al SCSS asociado
  standalone: true,
  // Componentes y módulos que el template necesita
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonItem, IonLabel, IonButton, IonInput,
    CommonModule, FormsModule
  ]
})

  export class RegisterPage {

  // Datos enlazados al formulario
  fullName: string = '';
  phone: string = '';
  email: string = '';
  username: string = '';
  password: string = '';

  // Inyecta Router y AuthService en el constructor
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  // Registro en Firebase
  async onSubmit() {
    try {
      // Llama al servicio de autenticación para registrar el usuario
      await this.authService.registerUser(
        this.fullName,
        this.phone,
        this.email,
        this.username,
        this.password
      );

      // Redirige al usuario a la pantalla de login para que inicie sesión
      alert('Registro exitoso');
      this.goToLogin(); // Se llama al método correcto

    } catch (error: any) {
      alert("Error en registro: " + error.message);
    }
  }

  // Navega a la página de inicio de sesión
  goToLogin() {
    // Usa Router para navegar a la ruta '/login'
    this.router.navigate(['/login']);
  }
}
