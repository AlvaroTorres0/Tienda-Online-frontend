import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseImagesComponent } from './purchase-images.component';

describe('PurchaseImagesComponent', () => {
  let component: PurchaseImagesComponent;
  let fixture: ComponentFixture<PurchaseImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseImagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
