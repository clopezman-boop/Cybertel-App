/**
 * Pruebas unitarias para la página de Confirmación de Soporte Técnico
 * Asegura que el componente se cree correctamente y cargue sin errores.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmacionSoporteTecnicoPage } from './confirmacion-soporte-tecnico.page';

describe('ConfirmacionSoporteTecnicoPage', () => {
  let component: ConfirmacionSoporteTecnicoPage;
  let fixture: ComponentFixture<ConfirmacionSoporteTecnicoPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmacionSoporteTecnicoPage], // Importamos la página standalone
    }).compileComponents();

    // Creamos la instancia del componente
    fixture = TestBed.createComponent(ConfirmacionSoporteTecnicoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Caso de prueba básico
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
