// Archivo de prueba unitaria básica generado automáticamente
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuPrincipalPage } from './menu-principal.page';

describe('MenuPrincipalPage', () => {
  let component: MenuPrincipalPage;
  let fixture: ComponentFixture<MenuPrincipalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuPrincipalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Prueba: verificar que la página se cree correctamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
