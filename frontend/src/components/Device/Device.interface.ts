import { DeviceApiResponse } from "../ConnectedDevices/ConnectedDevices.interface";

export interface DeviceProps extends DeviceApiResponse {
  available: boolean;
  handleVerify: (mac: string, state: boolean) => void;
  handleBlock: (mac: string, state: boolean) => void;
}
