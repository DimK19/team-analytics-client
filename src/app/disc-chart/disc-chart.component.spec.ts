import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscChartComponent } from './disc-chart.component';

describe('DiscChartComponent', () => {
  let component: DiscChartComponent;
  let fixture: ComponentFixture<DiscChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
