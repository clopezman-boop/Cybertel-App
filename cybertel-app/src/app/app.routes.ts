import { Routes } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.page').then( m => m.RegisterPage)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'menu-principal',
    loadComponent: () => import('./menu-principal/menu-principal.page').then( m => m.MenuPrincipalPage)
  },
  {
    path: 'catalogo',
    loadComponent: () => import('./catalogo/catalogo.page').then( m => m.CatalogoPage)
  },
  {
    path: 'solicitud-producto',
    loadComponent: () => import('./solicitud-producto/solicitud-producto.page').then( m => m.SolicitudProductoPage)
  },
  {
    path: 'confirmacion-producto',
    loadComponent: () => import('./confirmacion-producto/confirmacion-producto.page').then( m => m.ConfirmacionProductoPage)
  },
  {
    path: 'soporte-tecnico',
    loadComponent: () => import('./soporte-tecnico/soporte-tecnico.page').then( m => m.SoporteTecnicoPage)
  },
  {
    path: 'confirmacion-soporte-tecnico',
    loadComponent: () => import('./confirmacion-soporte-tecnico/confirmacion-soporte-tecnico.page').then( m => m.ConfirmacionSoporteTecnicoPage)
  },
  {
    path: 'historial-solicitudes',
    loadComponent: () => import('./historial-solicitudes/historial-solicitudes.page').then( m => m.HistorialSolicitudesPage)
  },
  {
    path: 'acerca-de-mi-cuenta',
    loadComponent: () => import('./acerca-de-mi-cuenta/acerca-de-mi-cuenta.page').then( m => m.AcercaDeMiCuentaPage)
  },
  {
    path: 'notificaciones-cliente',
    loadComponent: () => import('./notificaciones-cliente/notificaciones-cliente.page').then( m => m.NotificacionesClientePage)
  },
  {
    path: 'panel-admin',
    loadComponent: () => import('./panel-admin/panel-admin.page').then(m => m.PanelAdminPage),
    canActivate: [AdminGuard]
  },
  {
    path: 'gestion-solicitudes',
    loadComponent: () => import('./gestion-solicitudes/gestion-solicitudes.page').then( m => m.GestionSolicitudesPage)
  },
  {
    path: 'detalle-historial-solicitudes',
    loadComponent: () => import('./detalle-historial-solicitudes/detalle-historial-solicitudes.page').then( m => m.DetalleHistorialSolicitudesPage)
  },
  {
    path: 'acerca-de-mi-cuenta-admin',
    loadComponent: () => import('./acerca-de-mi-cuenta-admin/acerca-de-mi-cuenta-admin.page').then( m => m.AcercaDeMiCuentaAdminPage)
  },
];
