import { Component } from '@angular/core';
import { FleetService } from '../../services/fleet.service';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="min-h-screen bg-slate-50 p-6">
      <header class="max-w-6xl mx-auto mb-8 flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight">LogiFleet Hub</h1>
          <p class="text-slate-500">Enterprise Logistics & Regional Telemetry Dashboard</p>
        </div>
        <div class="flex gap-4">
          <div class="bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200 text-center">
            <span class="block text-xs text-slate-400 font-semibold uppercase">Active Fleet</span>
            <span class="text-xl font-bold text-blue-600">{{ fleetService.getActiveFleetCount() }}</span>
          </div>
          <div class="bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200 text-center">
            <span class="block text-xs text-slate-400 font-semibold uppercase">Pending Queues</span>
            <span class="text-xl font-bold text-amber-600">{{ fleetService.getPendingShipmentsCount() }}</span>
          </div>
        </div>
      </header>

      <main class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left 2 Cols: Fleet Telemetry & Active Shipments Grid -->
        <div class="lg:col-span-2 space-y-6">
          <div class="bg-white p-6 rounded-xl shadow-md border border-slate-100">
            <h2 class="text-xl font-bold text-slate-800 mb-4">Live Driver Telemetry</h2>
            
            <div class="space-y-3">
              <div *ngFor="let driver of fleetService.getDrivers()" class="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div>
                  <span class="font-semibold text-slate-800">{{ driver.name }}</span>
                  <span class="ml-2 text-xs px-2 py-0.5 rounded-full font-medium"
                    [ngClass]="{
                      'bg-green-100 text-green-700': driver.status === 'active' || driver.status === 'delivering',
                      'bg-slate-200 text-slate-600': driver.status === 'offline'
                    }">
                    {{ driver.status }}
                  </span>
                </div>
                <div class="text-sm text-slate-500 flex gap-4">
                  <span>GPS: [{{ driver.location.lat.toFixed(4) }}, {{ driver.location.lng.toFixed(4) }}]</span>
                  <span class="font-medium" [class.text-red-500]="driver.batteryLevel < 20">🔋 {{ driver.batteryLevel }}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Col: Wizard Form Component -->
        <div>
          <app-shipment-wizard></app-shipment-wizard>
        </div>
      </main>
    </div>
  `
})
export class DashboardComponent {
  constructor(public fleetService: FleetService) {}
}