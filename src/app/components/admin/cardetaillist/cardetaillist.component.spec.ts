import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardetaillistComponent } from './cardetaillist.component';

describe('CardetaillistComponent', () => {
  let component: CardetaillistComponent;
  let fixture: ComponentFixture<CardetaillistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardetaillistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardetaillistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
