import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TuesdayComponent } from './tuesday.component';

describe('TuesdayComponent', () => {
  let component: TuesdayComponent;
  let fixture: ComponentFixture<TuesdayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TuesdayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TuesdayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
