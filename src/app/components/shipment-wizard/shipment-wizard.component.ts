import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FleetService } from '../../services/fleet.service';

@Component({
  selector: 'app-shipment-wizard',
  template: `
    <div class="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md border border-slate-100">
      <h2 class="text-xl font-bold text-slate-800 mb-4">Dispatch New Shipment</h2>
      
      <form [formGroup]="shipmentForm" (ngSubmit)="onSubmit()" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Sender Name -->
          <div>
            <label class="block text-sm font-medium text-slate-600 mb-1">Sender Name</label>
            <input type="text" formControlName="senderName" class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            <span *ngIf="shipmentForm.get('senderName')?.touched && shipmentForm.get('senderName')?.invalid" class="text-xs text-red-500 mt-1">Sender name is required.</span>
          </div>

          <!-- Recipient Name -->
          <div>
            <label class="block text-sm font-medium text-slate-600 mb-1">Recipient Name</label>
            <input type="text" formControlName="recipientName" class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            <span *ngIf="shipmentForm.get('recipientName')?.touched && shipmentForm.get('recipientName')?.invalid" class="text-xs text-red-500 mt-1">Recipient name is required.</span>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Destination -->
          <div>
            <label class="block text-sm font-medium text-slate-600 mb-1">Destination Zone</label>
            <input type="text" formControlName="destination" class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>

          <!-- Weight -->
          <div>
            <label class="block text-sm font-medium text-slate-600 mb-1">Weight (Kg)</label>
            <input type="number" formControlName="weightKg" class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
        </div>

        <!-- Hazmat Checkbox -->
        <div class="flex items-center gap-2 pt-2">
          <input type="checkbox" formControlName="isHazmat" id="hazmat" class="w-4 h-4 text-blue-600 rounded border-slate-300" />
          <label for="hazmat" class="text-sm font-medium text-slate-700">Contains Hazardous Material (Requires special handling clearance)</label>
        </div>

        <!-- Submit Button -->
        <button type="submit" [disabled]="shipmentForm.invalid" 
          class="w-full py-2.5 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 disabled:bg-slate-300 transition-colors">
          Register & Dispatch Shipment
        </button>
      </form>
    </div>
  `
})
export class ShipmentWizardComponent {
  shipmentForm: FormGroup;

  constructor(private fb: FormBuilder, private fleetService: FleetService) {
    this.shipmentForm = this.fb.group({
      senderName: ['', [Validators.required, Validators.minLength(3)]],
      recipientName: ['', [Validators.required, Validators.minLength(3)]],
      destination: ['', Validators.required],
      weightKg: [1.0, [Validators.required, Validators.min(0.1)]],
      isHazmat: [false]
    });
  }

  onSubmit() {
    if (this.shipmentForm.valid) {
      this.fleetService.addShipment(this.shipmentForm.value);
      this.shipmentForm.reset({ weightKg: 1.0, isHazmat: false });
      alert('Shipment successfully registered into dispatch network!');
    }
  }
}