import Badge from "../Badge/Badge";
import Switch from "../Switch/Switch";
import AvailabilityBar from "../AvailabilityBar/AvailabilityBar";
import IconBadge from "../IconBadge/IconBadge";
import { DeviceProps } from "./Device.interface";
import { mapLabel } from "./Device.function";
import {
  Row,
  BadgeWrapper,
  Info,
  Name,
  Ip,
  AvailabilityWrapper,
  NewBadgeWrapper,
  ButtonWrapper,
} from "./Device.styled";

export const Device = ({
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

export default Device;
