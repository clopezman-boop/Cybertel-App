/**
 * Guard para proteger las rutas del Administrador
 */

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  // Método que decide si el usuario puede entrar a la ruta protegida
  async canActivate(): Promise<boolean> {

    // Obtener UID del usuario actualmente autenticado
    const uid = await this.authService.getCurrentUid();

    // Si no hay UID, nadie está logeado → regresar al login
    if (!uid) {
      console.warn('No hay usuario autenticado. Redirigiendo al login...');
      this.router.navigate(['/login']);
      return false;
    }

    // Obtener el rol del usuario desde Firestore
    const role = await this.authService.getUserRole(uid);

    // Verificar si el rol es ADMIN
    if (role === 'admin') {
      console.log('Acceso permitido: usuario administrador.');
      return true;
    }

    // Si no es admin → acceso denegado → volver al login
    console.warn('Acceso denegado: no es administrador.');
    this.router.navigate(['/login']);
    return false;
  }
}
