import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GestionSolicitudesPage } from './gestion-solicitudes.page';

describe('GestionSolicitudesPage', () => {
  let component: GestionSolicitudesPage;
  let fixture: ComponentFixture<GestionSolicitudesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionSolicitudesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
