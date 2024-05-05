import Badge from "../Badge/Badge";
import Switch from "../Switch/Switch";
import {
  DeviceStatus,
  ConnectedDevicesApiResponse,
  DeviceProps,
} from "./ConnectedDevices.interface";
import {
  Contaienr,
  Top,
  Title,
  Content,
  Row,
  BadgeWrapper,
  Info,
  Name,
  Ip,
  ButtonWrapper,
} from "./ConnectedDevices.styled";

const apiMockedResponse: ConnectedDevicesApiResponse = {
  scanId: "0ef59eeb-42ab-49ef-9cdf-c719be67f6bd",
  scanResult: {
    nmap: {
      command_line: "nmap -oX - -sn 192.168.0.1/24",
      scaninfo: {},
      scanstats: {
        timestr: "Tue Apr 16 21:52:44 2024",
        elapsed: "40.33",
        uphosts: "32",
        downhosts: "224",
        totalhosts: "256",
      },
    },
    scan: {
      "192.168.0.1": {
        hostnames: [
          {
            name: "PC-1234",
            type: "",
          },
        ],
        addresses: {
          ipv4: "192.168.0.1",
        },
        vendor: {},
        status: {
          state: "up",
          reason: "syn-ack",
        },
      },
      "192.168.0.4": {
        hostnames: [
          {
            name: "iphone 13",
            type: "",
          },
        ],
        addresses: {
          ipv4: "192.168.0.4",
        },
        vendor: {},
        status: {
          state: "down",
          reason: "conn-refused",
        },
      },
      "192.168.0.5": {
        hostnames: [
          {
            name: "",
            type: "",
          },
        ],
        addresses: {
          ipv4: "192.168.0.5",
        },
        vendor: {},
        status: {
          state: "blocked",
          reason: "conn-refused",
        },
      },
    },
  },
};

const mapLabel = (status: DeviceStatus) => {
  switch (status) {
    case "up":
      return "online";
    case "down":
      return "offline";
    case "blocked":
      return "blocked";
    default:
      return "offline";
  }
};

const Device = ({ status, hostname, address }: DeviceProps) => {
  return (
    <Row>
      <BadgeWrapper>
        <Badge
          red={status === "down"}
          green={status === "up"}
          gray={status === "blocked"}
        >
          {mapLabel(status)}
        </Badge>
      </BadgeWrapper>
      <Info>
        <Name>{hostname ? hostname : "<unknown device>"}</Name>
        <Ip>{address}</Ip>
      </Info>
      <ButtonWrapper>
        <Switch disableLabel label="temp" checked setChecked={() => {}} />
      </ButtonWrapper>
    </Row>
  );
};

const ConnectedDevices = () => {
  const devices = Object.values(apiMockedResponse.scanResult.scan).map(
    ({ hostnames, addresses, status }) => (
      <Device
        key={addresses.ipv4}
        status={status.state}
        hostname={hostnames[0].name}
        address={addresses.ipv4}
      />
    )
  );

  return (
    <Contaienr>
      <Top>
        <Title>Conected devices</Title>
      </Top>
      <Content>{devices}</Content>
    </Contaienr>
  );
};

export default ConnectedDevices;
