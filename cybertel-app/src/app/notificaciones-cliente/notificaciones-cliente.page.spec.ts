/**
 * Pruebas unitarias para la página Notificaciones del Cliente 
 * que comprueba que el componente se crea correctamente.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificacionesClientePage } from './notificaciones-cliente.page';

describe('NotificacionesClientePage', () => {
  let component: NotificacionesClientePage;
  let fixture: ComponentFixture<NotificacionesClientePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificacionesClientePage],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificacionesClientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Prueba básica: Verifica que la página se cree correctamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
