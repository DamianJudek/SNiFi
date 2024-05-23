import { useEffect, useState } from "react";
import { getDevices, updateDevice } from "../../api";
import Divider from "../Divider/Divider";
import Device from "../Device/Device";
import {
  Contaienr,
  Top,
  Title,
  HeaderRow,
  HeaderLabel,
  Content,
} from "./ConnectedDevices.styled";
import CircularLoader from "../Loader/Loader";
// import { devicesApiMockedResponse } from "../apiMocks";

const ConnectedDevices = () => {
  const [detectedDevices, setDetectedDevices] = useState([]);

  const handleVerify = (mac: string, isNew: boolean) => {
    updateDevice(mac, isNew)
      .then((res) => {
        if (res.status === 200) {
          refreshDevices();
        }

        throw res.text;
      })
      .catch((e) => console.log("error updating device", e));
  };

  const handleBlock = (mac: string, isBlocked: boolean) => {
    updateDevice(mac, undefined, undefined, isBlocked)
      .then((res) => {
        if (res.status === 200) {
          refreshDevices();
        }

        throw res.text;
      })
      .catch((e) => console.log("error updating device", e));
  };

  const refreshDevices = () => {
    getDevices()
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        console.log("devicesResponse", resp);
        setDetectedDevices(resp);
      })

      .catch((err) => console.error(err));
  };

  const devices = detectedDevices.map(
    ({
      mac,
      name,
      ip,
      isBlocked,
      isNew,
      available,
      discoveredAt,
      availability,
    }) => (
      <Device
        key={ip}
        mac={mac}
        name={name}
        ip={ip}
        isNew={isNew}
        isBlocked={isBlocked}
        available={available}
        availability={availability}
        handleVerify={handleVerify}
        handleBlock={handleBlock}
        discoveredAt={discoveredAt}
      />
    )
  );

  useEffect(refreshDevices, []);

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
      <Content>{devices.length === 0 ? <CircularLoader /> : devices}</Content>
    </Contaienr>
  );
};

export default ConnectedDevices;
