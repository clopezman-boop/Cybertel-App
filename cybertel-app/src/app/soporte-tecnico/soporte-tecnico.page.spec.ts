/**
 * Pruebas unitarias para la página de Soporte Técnico
 * Verifica que el componente se cree correctamente.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SoporteTecnicoPage } from './soporte-tecnico.page';

describe('SoporteTecnicoPage', () => {
  let component: SoporteTecnicoPage;
  let fixture: ComponentFixture<SoporteTecnicoPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoporteTecnicoPage], // Importamos la página standalone
    }).compileComponents();

    // Creamos una instancia del componente para las pruebas
    fixture = TestBed.createComponent(SoporteTecnicoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Caso de prueba: Verifica que el componente exista
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
