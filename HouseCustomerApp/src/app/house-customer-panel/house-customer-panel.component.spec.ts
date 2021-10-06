import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseCustomerPanelComponent } from './house-customer-panel.component';

describe('HouseCustomerPanelComponent', () => {
  let component: HouseCustomerPanelComponent;
  let fixture: ComponentFixture<HouseCustomerPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseCustomerPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseCustomerPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
