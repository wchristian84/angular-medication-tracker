import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaturdayComponent } from './saturday.component';

describe('SaturdayComponent', () => {
  let component: SaturdayComponent;
  let fixture: ComponentFixture<SaturdayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaturdayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaturdayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
