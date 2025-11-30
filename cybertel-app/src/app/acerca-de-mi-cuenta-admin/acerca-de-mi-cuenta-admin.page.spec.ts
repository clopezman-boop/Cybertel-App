import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AcercaDeMiCuentaAdminPage } from './acerca-de-mi-cuenta-admin.page';

describe('AcercaDeMiCuentaAdminPage', () => {
  let component: AcercaDeMiCuentaAdminPage;
  let fixture: ComponentFixture<AcercaDeMiCuentaAdminPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AcercaDeMiCuentaAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
