import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleHistorialSolicitudesPage } from './detalle-historial-solicitudes.page';

describe('DetalleHistorialSolicitudesPage', () => {
  let component: DetalleHistorialSolicitudesPage;
  let fixture: ComponentFixture<DetalleHistorialSolicitudesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleHistorialSolicitudesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
