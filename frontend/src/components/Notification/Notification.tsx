import Button from "../../components/Button/Button";
import {
  Wrapper,
  TopRow,
  Type,
  Severity,
  DeviceIp,
  Date,
  Description,
} from "./Notification.styled";

export type NotificationType = {
  id: string;
  type: string;
  severity: number;
  device: {
    name: string;
    mac: string;
    ip: string;
  };
  scanId: string;
  timestamp: string;
  seen: boolean;
};

export type NotificationProps = NotificationType & {
  handleSeenClick: (id: string) => void;
};

export const Notification = ({
  id,
  type,
  severity,
  device,
  scanId,
  timestamp,
  seen,
  handleSeenClick,
}: NotificationProps) => {
  return (
    <Wrapper>
      <TopRow>
        <Type>{type}</Type>
        <Date>{timestamp}</Date>

        <Severity value={severity} max={severity} readOnly />
      </TopRow>
      <DeviceIp>{`From: ${device.ip}`}</DeviceIp>
      <Description>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores,
        autem?
      </Description>
      {!seen && <Button onClick={() => handleSeenClick(id)}>Ok</Button>}
    </Wrapper>
  );
};

export default Notification;
