import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudProductoPage } from './solicitud-producto.page';

describe('SolicitudProductoPage', () => {
  let component: SolicitudProductoPage;
  let fixture: ComponentFixture<SolicitudProductoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudProductoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
