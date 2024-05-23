import { DeviceApiResponse } from "../ConnectedDevices/ConnectedDevices.interface";

export interface DeviceProps extends DeviceApiResponse {
  handleVerify: (mac: string, state: boolean) => void;
  handleBlock: (mac: string, state: boolean) => void;
}
