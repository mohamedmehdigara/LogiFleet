import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentWizardComponent } from './shipment-wizard.component';

describe('ShipmentWizardComponent', () => {
  let component: ShipmentWizardComponent;
  let fixture: ComponentFixture<ShipmentWizardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipmentWizardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShipmentWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
