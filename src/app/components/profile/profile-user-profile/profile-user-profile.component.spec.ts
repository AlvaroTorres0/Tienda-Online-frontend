import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileUserProfileComponent } from './profile-user-profile.component';

describe('ProfileUserProfileComponent', () => {
  let component: ProfileUserProfileComponent;
  let fixture: ComponentFixture<ProfileUserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileUserProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
