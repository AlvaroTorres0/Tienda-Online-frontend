import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePrincipalComponentComponent } from './home-principal-component.component';

describe('HomePrincipalComponentComponent', () => {
  let component: HomePrincipalComponentComponent;
  let fixture: ComponentFixture<HomePrincipalComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePrincipalComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePrincipalComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
