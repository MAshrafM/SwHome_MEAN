import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTravelComponent } from './add-travel.component';

describe('AddTravelComponent', () => {
  let component: AddTravelComponent;
  let fixture: ComponentFixture<AddTravelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTravelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
