import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileUserSalesComponent } from './profile-user-sales.component';

describe('ProfileUserSalesComponent', () => {
  let component: ProfileUserSalesComponent;
  let fixture: ComponentFixture<ProfileUserSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileUserSalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileUserSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
