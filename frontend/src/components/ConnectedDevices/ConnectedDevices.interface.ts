export type DeviceStatus = "up" | "down" | "blocked";

export type DeviceApiResponse = {
  hostnames: [
    {
      name: string;
      type: string;
    },
  ];
  addresses: {
    ipv4: string;
  };
  vendor: Record<string, unknown>;
  status: {
    state: DeviceStatus;
    reason: string;
  };
};

export type ConnectedDevicesApiResponse = {
  scanId: string;
  scanResult: {
    nmap: {
      command_line: string;
      scaninfo: Record<string, unknown>;
      scanstats: {
        timestr: string;
        elapsed: string;
        uphosts: string;
        downhosts: string;
        totalhosts: string;
      };
    };
    scan: Record<string, DeviceApiResponse>;
  };
};

export type DeviceProps = {
  status: DeviceStatus;
  hostname: string;
  address: string;
};
