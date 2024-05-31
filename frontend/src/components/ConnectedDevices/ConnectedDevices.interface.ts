export type DeviceStatus = "up" | "down" | "blocked";

export type Availability = {
  timestamp: string;
  available: boolean;
}[];

export interface DeviceApiResponse {
  mac: string;
  name: string | null;
  ip: string;
  isNew: boolean;
  isBlocked: boolean;
  discoveredAt: string;
  availability: Availability;
}

export type ConnectedDevicesApiResponse = DeviceApiResponse[];
