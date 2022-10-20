import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastMedsComponent } from './past-meds.component';

describe('PastMedsComponent', () => {
  let component: PastMedsComponent;
  let fixture: ComponentFixture<PastMedsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PastMedsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PastMedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
