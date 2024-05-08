import Badge from "../Badge/Badge";
import Switch from "../Switch/Switch";
import AvailabilityBar from "../AvailabilityBar/AvailabilityBar";
import IconBadge from "../IconBadge/IconBadge";
import Divider from "../Divider/Divider";
import {
  ConnectedDevicesApiResponse,
  DeviceProps,
} from "./ConnectedDevices.interface";
import { mapLabel } from "./ConnectedDevices.functions";
import {
  Contaienr,
  Top,
  Title,
  HeaderRow,
  HeaderLabel,
  Content,
  Row,
  BadgeWrapper,
  Info,
  Name,
  Ip,
  AvailabilityWrapper,
  NewBadgeWrapper,
  ButtonWrapper,
} from "./ConnectedDevices.styled";

const mockedAvailablity = [
  { timestamp: "Tue Apr 16 21:52:44 2024", available: false },
  { timestamp: "Tue Apr 16 21:52:45 2024", available: false },
  { timestamp: "Tue Apr 16 21:52:46 2024", available: true },
  { timestamp: "Tue Apr 16 21:52:47 2024", available: true },
  { timestamp: "Tue Apr 16 21:52:48 2024", available: true },
  { timestamp: "Tue Apr 16 21:52:49 2024", available: true },
];

const apiMockedResponse: ConnectedDevicesApiResponse = [
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

const Device = ({
  mac,
  name,
  ip,
  availability = [],
  available,
  isNew,
  isBlocked,
  handleBlock,
  handleVerify,
}: DeviceProps) => {
  return (
    <Row>
      <NewBadgeWrapper>
        {isNew && (
          <IconBadge iconName="star" color="gold">
            New
          </IconBadge>
        )}
      </NewBadgeWrapper>
      <BadgeWrapper>
        <Badge
          red={isBlocked === true}
          green={available === true}
          gray={available === false && isBlocked === false}
        >
          {mapLabel(available, isBlocked)}
        </Badge>
      </BadgeWrapper>
      <Info>
        <Name>{name ? name : "<unknown device>"}</Name>
        <Ip>{ip}</Ip>
      </Info>
      <AvailabilityWrapper>
        <AvailabilityBar availability={availability} isBlocked={isBlocked} />
      </AvailabilityWrapper>
      <ButtonWrapper>
        <Switch
          disableLabel
          label="verified"
          checked={!isNew}
          setChecked={() => handleVerify(mac, !isNew)}
        />
      </ButtonWrapper>
      <ButtonWrapper>
        <Switch
          disableLabel
          label="block"
          checked={!isBlocked}
          setChecked={() => handleBlock(mac, !isBlocked)}
        />
      </ButtonWrapper>
    </Row>
  );
};

const ConnectedDevices = () => {
  const handleVerify = (mac: string, state: boolean) => {
    console.log(mac, "verified", state);
  };

  const handleBlock = (mac: string, state: boolean) => {
    console.log(mac, "switch", state);
  };

  const devices = apiMockedResponse.map(
    ({ mac, name, ip, isBlocked, isNew, available, discoveredAt }) => (
      <Device
        key={mac}
        mac={mac}
        name={name}
        ip={ip}
        isNew={isNew}
        isBlocked={isBlocked}
        available={available}
        availability={mockedAvailablity}
        handleVerify={handleVerify}
        handleBlock={handleBlock}
        discoveredAt={discoveredAt}
      />
    )
  );

  return (
    <Contaienr>
      <Top>
        <Title>Conected devices</Title>
      </Top>
      <HeaderRow>
        <HeaderLabel>Status</HeaderLabel>
        <HeaderLabel>Name/addres</HeaderLabel>
        <HeaderLabel>Availability</HeaderLabel>
        <HeaderLabel>Verified</HeaderLabel>
        <HeaderLabel>Allowed</HeaderLabel>
      </HeaderRow>
      <Divider />
      <Content>{devices}</Content>
    </Contaienr>
  );
};

export default ConnectedDevices;
