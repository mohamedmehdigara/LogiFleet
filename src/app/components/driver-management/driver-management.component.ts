import { Component } from '@angular/core';
import { FleetService } from '../../services/fleet.service';
import { Driver } from '../../models/fleet.model';

@Component({
  selector: 'app-driver-management',
  template: `
    <div class="bg-white p-6 rounded-xl shadow-md border border-slate-100">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold text-slate-800">Fleet Workforce Control</h2>
        <span class="text-xs bg-green-50 text-green-600 font-semibold px-2.5 py-1 rounded-full">
          Active Drivers: {{ fleetService.getActiveFleetCount() }}
        </span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div *ngFor="let driver of fleetService.getDrivers()" 
          class="p-4 rounded-lg border border-slate-200 bg-slate-50 flex flex-col justify-between">
          <div>
            <div class="flex justify-between items-start mb-2">
              <span class="font-bold text-slate-800">{{ driver.name }}</span>
              <span class="text-xs px-2 py-0.5 rounded-full font-medium"
                [ngClass]="{
                  'bg-green-100 text-green-700': driver.status === 'active' || driver.status === 'delivering',
                  'bg-slate-200 text-slate-600': driver.status === 'offline'
                }">
                {{ driver.status }}
              </span>
            </div>
            
            <p class="text-xs text-slate-500 mb-1">Battery: <span class="font-semibold" [class.text-red-500]="driver.batteryLevel < 20">{{ driver.batteryLevel }}%</span></p>
            <p class="text-xs text-slate-500 font-mono">GPS: {{ driver.location.lat.toFixed(3) }}, {{ driver.location.lng.toFixed(3) }}</p>
          </div>

          <div class="mt-4 pt-3 border-t border-slate-200 flex justify-between items-center">
            <span class="text-[11px] text-slate-400">ID: {{ driver.id }}</span>
            <button (click)="toggleDriverStatus(driver)" 
              class="px-2.5 py-1 text-xs font-medium rounded border transition-colors"
              [ngClass]="driver.status === 'offline' ? 'bg-green-600 text-white border-green-600 hover:bg-green-700' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'">
              {{ driver.status === 'offline' ? 'Bring Online' : 'Set Offline' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DriverManagementComponent {
  constructor(public fleetService: FleetService) {}

  toggleDriverStatus(driver: Driver) {
    if (driver.status === 'offline') {
      driver.status = 'active';
    } else {
      driver.status = 'offline';
    }
  }
}