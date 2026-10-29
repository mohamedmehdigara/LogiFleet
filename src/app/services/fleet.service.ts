import { Injectable } from '@angular/core';
import { Driver, Shipment } from '../models/fleet.model';

@Injectable({
  providedIn: 'root'
})
export class FleetService {
  private driversList: Driver[] = [
    { id: 'd1', name: 'Karim Salah', status: 'active', location: { lat: 36.8065, lng: 10.1815 }, batteryLevel: 92, currentShipmentId: 's1' },
    { id: 'd2', name: 'Leila Neji ', status: 'delivering', location: { lat: 36.8189, lng: 10.1658 }, batteryLevel: 78, currentShipmentId: 's2' },
    { id: 'd3', name: 'Mehdi Fathi', status: 'offline', location: { lat: 36.7538, lng: 10.2189 }, batteryLevel: 15 }
  ];

  private shipmentsList: Shipment[] = [
    { id: 's1', trackingNumber: 'TRK-9821-TN', senderName: 'MedTech Logistics', recipientName: 'Pharmacie Centrale', weightKg: 12.5, isHazmat: false, destination: 'Tunis Centre', status: 'in-transit', assignedDriverId: 'd1' },
    { id: 's2', trackingNumber: 'TRK-4432-TN', senderName: 'Sfax Industrial Hub', recipientName: 'Electro Shop', weightKg: 140.0, isHazmat: true, destination: 'Ariana Ville', status: 'dispatched', assignedDriverId: 'd2' },
    { id: 's3', trackingNumber: 'TRK-1092-TN', senderName: 'Carthage Goods', recipientName: 'SuperMarket Express', weightKg: 45.2, isHazmat: false, destination: 'La Marsa', status: 'pending' }
  ];

  constructor() {
    this.startRealtimeSimulation();
  }

  getDrivers(): Driver[] {
    return this.driversList;
  }

  getShipments(): Shipment[] {
    return this.shipmentsList;
  }

  getActiveFleetCount(): number {
    return this.driversList.filter((d: Driver) => d.status !== 'offline').length;
  }

  getPendingShipmentsCount(): number {
    return this.shipmentsList.filter((s: Shipment) => s.status === 'pending').length;
  }

  addShipment(newShipment: Omit<Shipment, 'id' | 'status' | 'trackingNumber'>) {
    const created: Shipment = {
      ...newShipment,
      id: 's' + (this.shipmentsList.length + 1),
      trackingNumber: `TRK-${Math.floor(1000 + Math.random() * 9000)}-TN`,
      status: 'pending'
    };
    this.shipmentsList = [created, ...this.shipmentsList];
  }

  private startRealtimeSimulation() {
    setInterval(() => {
      this.driversList = this.driversList.map((driver: Driver) => {
        if (driver.status === 'offline') return driver;
        return {
          ...driver,
          location: {
            lat: driver.location.lat + (Math.random() - 0.5) * 0.002,
            lng: driver.location.lng + (Math.random() - 0.5) * 0.002
          },
          batteryLevel: Math.max(5, driver.batteryLevel - (Math.random() > 0.7 ? 1 : 0))
        };
      });
    }, 4000);
  }
}