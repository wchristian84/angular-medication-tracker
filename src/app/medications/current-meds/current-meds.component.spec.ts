import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentMedsComponent } from './current-meds.component';

describe('CurrentMedsComponent', () => {
  let component: CurrentMedsComponent;
  let fixture: ComponentFixture<CurrentMedsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentMedsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentMedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
