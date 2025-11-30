import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmacionProductoPage } from './confirmacion-producto.page';

describe('ConfirmacionProductoPage', () => {
  let component: ConfirmacionProductoPage;
  let fixture: ComponentFixture<ConfirmacionProductoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmacionProductoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
