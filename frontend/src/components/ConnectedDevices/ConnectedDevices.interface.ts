export type DeviceStatus = "up" | "down" | "blocked";

export interface DeviceApiResponse {
  mac: string;
  name: string | null;
  ip: string;
  isNew: boolean;
  isBlocked: boolean;
  available: boolean;
  discoveredAt: string;
  availability: Availability;
}

export type Availability = {
  timestamp: string;
  available: boolean;
}[];

export type ConnectedDevicesApiResponse = DeviceApiResponse[];

export interface DeviceProps extends DeviceApiResponse {
  handleVerify: (mac: string, state: boolean) => void;
  handleBlock: (mac: string, state: boolean) => void;
}
