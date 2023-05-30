import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasePrincipalComponent } from './purchase-principal.component';

describe('PurchasePrincipalComponent', () => {
  let component: PurchasePrincipalComponent;
  let fixture: ComponentFixture<PurchasePrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchasePrincipalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchasePrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
