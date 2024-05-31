export type NotificationType =
  | "new_device"
  | "ip_change"
  | "device_offline"
  | "blocked_query";

export interface Notification {
  uid: string;
  type: NotificationType;
  severity: number;
  device: {
    name: string;
    mac: string;
    ip: string;
  };
  timestamp: string;
  seen: boolean;
  query?: string;
  scanId?: string;
}

export interface NotificationProps extends Notification {
  handleSeenClick: (id: string) => void;
}
