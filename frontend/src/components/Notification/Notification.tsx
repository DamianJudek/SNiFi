import Button from "../../components/Button/Button";
import { displayDate } from "../../utils/date";
import { NotificationType, NotificationProps } from "./Notification.interface";
import {
  Wrapper,
  TopRow,
  Type,
  Severity,
  DeviceIp,
  DeviceMAC,
  Date,
  Description,
} from "./Notification.styled";

const mapType = (type: NotificationType) => {
  switch (type) {
    case "new_device":
      return "New device";
    case "ip_change":
      return "Device IP change";
    case "device_offline":
      return "Device offline";
    case "blocked_query":
      return "Blocked DNS";
  }
};

export const Notification = ({
  uid,
  type,
  severity,
  device,
  timestamp,
  seen,
  query,
  handleSeenClick,
}: NotificationProps) => {
  const mapDescription = () => {
    switch (type) {
      case "new_device":
        return `We detected new device with ${device?.mac} mac address on your network`;
      case "ip_change":
        return "One of the devices on your network has changed its IP address";
      case "device_offline":
        return "One of the devices has disappeared from your network";
      case "blocked_query":
        return `We have blocked the DNS query to a suspicious domain: ${query}`;
    }
  };

  return (
    <Wrapper>
      <TopRow>
        <Type>{mapType(type)}</Type>
        <Date>{displayDate(timestamp)}</Date>
        <Severity value={severity} max={severity} readOnly />
      </TopRow>
      {device?.mac && <DeviceMAC>{`MAC: ${device.mac}`}</DeviceMAC>}
      {device?.ip && <DeviceIp>{`IP: ${device.ip}`}</DeviceIp>}
      <Description>{mapDescription()}</Description>
      {!seen && <Button onClick={() => handleSeenClick(uid)}>Ok</Button>}
    </Wrapper>
  );
};

export default Notification;
