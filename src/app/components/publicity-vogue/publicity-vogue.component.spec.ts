import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicityVogueComponent } from './publicity-vogue.component';

describe('PublicityVogueComponent', () => {
  let component: PublicityVogueComponent;
  let fixture: ComponentFixture<PublicityVogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicityVogueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicityVogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
