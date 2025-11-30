// Importamos Component para definir un componente Angular
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// Router para navegación entre páginas
import { Router } from '@angular/router';
// Importamos componentes de Ionic standalone
import {
  IonButton, IonContent, IonHeader, IonTitle, IonToolbar
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-confirmacion-soporte-tecnico', // Selector del componente
  templateUrl: './confirmacion-soporte-tecnico.page.html', // HTML asociado
  styleUrls: ['./confirmacion-soporte-tecnico.page.scss'], // CSS asociado
  // Componente independiente
  standalone: true,
  // Componentes usados
  imports: [IonContent, IonHeader, IonToolbar, IonTitle, IonButton, CommonModule],
})
  export class ConfirmacionSoporteTecnicoPage {

  // Constructor inyectando Router para controlar la navegación
  constructor(private router: Router) {}

  // Método para regresar al menú principal
  volverAlMenu() {
    this.router.navigate(['/menu-principal']);
  }

  // Método para registrar una nueva solicitud
  nuevaSolicitud() {
    this.router.navigate(['/soporte-tecnico']);
  }
}
