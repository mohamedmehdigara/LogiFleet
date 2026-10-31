import { Component } from '@angular/core';
import { FleetService } from '../../services/fleet.service';
import { Shipment } from '../../models/fleet.model';

@Component({
  selector: 'app-shipment-list',
  template: `
    <div class="bg-white p-6 rounded-xl shadow-md border border-slate-100">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold text-slate-800">Shipment Manifest</h2>
        <span class="text-xs bg-blue-50 text-blue-600 font-semibold px-2.5 py-1 rounded-full">
          Total: {{ fleetService.getShipments().length }}
        </span>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b border-slate-100 text-xs text-slate-400 uppercase">
              <th class="py-3 px-2">Tracking #</th>
              <th class="py-3 px-2">Route / Destination</th>
              <th class="py-3 px-2">Weight / Hazmat</th>
              <th class="py-3 px-2">Status</th>
              <th class="py-3 px-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 text-sm">
            <tr *ngFor="let shipment of fleetService.getShipments()" class="hover:bg-slate-50 transition-colors">
              <td class="py-3 px-2 font-semibold text-slate-700">{{ shipment.trackingNumber }}</td>
              <td class="py-3 px-2 text-slate-600">
                <span class="block text-xs font-medium text-slate-800">{{ shipment.senderName }} ➔</span>
                <span class="text-xs text-slate-500">{{ shipment.destination }}</span>
              </td>
              <td class="py-3 px-2 text-slate-600">
                {{ shipment.weightKg }} Kg
                <span *ngIf="shipment.isHazmat" class="ml-1 text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded font-bold">HAZMAT</span>
              </td>
              <td class="py-3 px-2">
                <span class="text-xs px-2.5 py-1 rounded-full font-medium"
                  [ngClass]="{
                    'bg-amber-100 text-amber-700': shipment.status === 'pending',
                    'bg-blue-100 text-blue-700': shipment.status === 'dispatched' || shipment.status === 'in-transit',
                    'bg-green-100 text-green-700': shipment.status === 'delivered'
                  }">
                  {{ shipment.status }}
                </span>
              </td>
              <td class="py-3 px-2 text-right">
                <button *ngIf="shipment.status === 'pending'" 
                  (click)="quickDispatch(shipment.id)"
                  class="px-3 py-1 bg-slate-900 text-white text-xs font-medium rounded hover:bg-blue-600 transition-colors">
                  Dispatch
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class ShipmentListComponent {
  constructor(public fleetService: FleetService) {}

  quickDispatch(shipmentId: string) {
    // Quick status update logic
    const shipment = this.fleetService.getShipments().find(s => s.id === shipmentId);
    if (shipment) {
      shipment.status = 'dispatched';
      alert(`Shipment ${shipment.trackingNumber} dispatched to network!`);
    }
  }
}