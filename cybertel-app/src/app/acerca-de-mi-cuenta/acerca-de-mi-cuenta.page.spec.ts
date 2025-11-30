/**
 * Pruebas unitarias para la página Acerca de mi Cuenta
 * Verifica que el componente se cree correctamente.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AcercaDeMiCuentaPage } from './acerca-de-mi-cuenta.page';

describe('AcercaDeMiCuentaPage', () => {
  let component: AcercaDeMiCuentaPage;
  let fixture: ComponentFixture<AcercaDeMiCuentaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcercaDeMiCuentaPage],
    }).compileComponents();

    fixture = TestBed.createComponent(AcercaDeMiCuentaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
