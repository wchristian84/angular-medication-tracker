import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SundayComponent } from './sunday.component';

describe('SundayComponent', () => {
  let component: SundayComponent;
  let fixture: ComponentFixture<SundayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SundayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SundayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
