/**
 * Prueba unitaria para la página Historial de Solicitudes
 * Comprueba que el componente se crea correctamente.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistorialSolicitudesPage } from './historial-solicitudes.page';

describe('HistorialSolicitudesPage', () => {
  let component: HistorialSolicitudesPage;
  let fixture: ComponentFixture<HistorialSolicitudesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialSolicitudesPage],
    }).compileComponents();

    fixture = TestBed.createComponent(HistorialSolicitudesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Prueba básica
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
