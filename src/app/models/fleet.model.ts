export type DriverStatus = 'active' | 'delivering' | 'offline';

export type ShipmentStatus = 'pending' | 'dispatched' | 'in-transit' | 'delivered';

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Driver {
  id: string;
  name: string;
  status: DriverStatus;
  location: Coordinates;
  batteryLevel: number; // 0 to 100 percentage
  currentShipmentId?: string; // Links driver to an active delivery
}

export interface Shipment {
  id: string;
  trackingNumber: string;
  senderName: string;
  recipientName: string;
  weightKg: number;
  isHazmat: boolean; // Hazardous material flag for custom form validation
  destination: string;
  status: ShipmentStatus;
  assignedDriverId?: string;
}