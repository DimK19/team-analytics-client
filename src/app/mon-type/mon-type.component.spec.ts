import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonTypeComponent } from './mon-type.component';

describe('MonTypeComponent', () => {
  let component: MonTypeComponent;
  let fixture: ComponentFixture<MonTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
