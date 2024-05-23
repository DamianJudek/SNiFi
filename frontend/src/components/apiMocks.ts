import { ConnectedDevicesApiResponse } from "./ConnectedDevices/ConnectedDevices.interface";
const router = "192.168.178.1";
export const scanResultApiResponse = {
  scanId: "e97557c0-0016-4177-a021-9a9101385f73",
  timestamp: "2024-05-19 19:07:43.185261",
  type: "discovery",
  uphosts: 22,
  result: [
    {
      ip: "192.168.0.1",
      mac: "34:60:f9:f4:67:64",
    },
    {
      ip: "192.168.0.9",
      mac: "e0:98:06:df:8f:61",
    },
    {
      ip: "192.168.0.12",
      mac: "48:e7:29:48:b1:f1",
    },
    {
      ip: "192.168.0.35",
      mac: "9c:9c:1f:93:2c:d9",
    },
    {
      ip: "192.168.0.36",
      mac: "c4:dd:57:00:ef:53",
    },
    {
      ip: "192.168.0.57",
      mac: "20:df:b9:5b:2c:ce",
    },
    {
      ip: "192.168.0.58",
      mac: "d8:3a:dd:cf:ea:f9",
    },
    {
      ip: "192.168.0.61",
      mac: "70:03:9f:64:0a:ff",
    },
    {
      ip: "192.168.0.77",
      mac: "e8:db:84:47:fb:ab",
    },
    {
      ip: "192.168.0.81",
      mac: "70:03:9f:64:04:fb",
    },
    {
      ip: "192.168.0.113",
      mac: "d8:8c:79:6b:47:64",
    },
    {
      ip: "192.168.0.127",
      mac: "c4:dd:57:28:d3:bd",
    },
    {
      ip: "192.168.0.140",
      mac: "c4:dd:57:00:92:aa",
    },
    {
      ip: "192.168.0.142",
      mac: "9c:9c:1f:93:4c:20",
    },
    {
      ip: "192.168.0.145",
      mac: "34:98:7a:e0:b7:13",
    },
    {
      ip: "192.168.0.167",
      mac: "ff:ff:ff:ff:ff:ff",
    },
    {
      ip: "192.168.0.169",
      mac: "20:1f:3b:25:59:43",
    },
    {
      ip: "192.168.0.177",
      mac: "d8:3a:dd:0b:0d:c2",
    },
    {
      ip: "192.168.0.184",
      mac: "d8:f1:5b:b3:a5:c6",
    },
    {
      ip: "192.168.0.185",
      mac: "b0:a7:32:1e:11:f0",
    },
    {
      ip: "192.168.0.200",
      mac: "b4:2e:99:f5:1c:a7",
    },
    {
      ip: "192.168.0.223",
      mac: "cc:50:e3:74:a6:96",
    },
  ],
};

export const mockedAvailablity = [
  { timestamp: "Tue Apr 16 21:52:44 2024", available: false },
  { timestamp: "Tue Apr 16 21:52:45 2024", available: false },
  { timestamp: "Tue Apr 16 21:52:46 2024", available: true },
  { timestamp: "Tue Apr 16 21:52:47 2024", available: true },
  { timestamp: "Tue Apr 16 21:52:48 2024", available: true },
  { timestamp: "Tue Apr 16 21:52:49 2024", available: true },
];

export const devicesApiMockedResponse: ConnectedDevicesApiResponse = [
  {
    mac: "34:60:f9:f4:67:64",
    name: null,
    ip: "192.168.0.1",
    isNew: false,
    isBlocked: false,
    available: true,
    discoveredAt: "2024-05-05 18:26:04.047171",
    availability: mockedAvailablity,
  },
  {
    mac: "34:60:f9:f4:67:65",
    name: null,
    ip: "192.168.0.2",
    isNew: true,
    isBlocked: false,
    available: false,
    discoveredAt: "2024-05-05 18:26:04.047171",
    availability: mockedAvailablity,
  },
  {
    mac: "34:60:f9:f4:67:66",
    name: null,
    ip: "192.168.0.3",
    isNew: false,
    isBlocked: true,
    available: false,
    discoveredAt: "2024-05-05 18:26:04.047171",
    availability: mockedAvailablity,
  },
];
