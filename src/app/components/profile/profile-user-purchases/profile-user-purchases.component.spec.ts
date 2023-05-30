import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileUserPurchasesComponent } from './profile-user-purchases.component';

describe('ProfileUserPurchasesComponent', () => {
  let component: ProfileUserPurchasesComponent;
  let fixture: ComponentFixture<ProfileUserPurchasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileUserPurchasesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileUserPurchasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
