import Tooltip from "@mui/material/Tooltip";
import { Bar, Stick } from "./AvailabilityBar.styled";
import { Availability } from "../ConnectedDevices/ConnectedDevices.interface";

interface AvailabilityBarProps {
  availability: Availability;
  isBlocked: boolean;
}

const AvailabilityBar = ({ availability, isBlocked }: AvailabilityBarProps) => {
  const sticks = availability.map(({ available, timestamp }) => {
    return (
      <Tooltip
        key={timestamp}
        disableFocusListener
        disableTouchListener
        title={timestamp}
      >
        <Stick
          role="button"
          $gray={!available}
          $green={available}
          $red={isBlocked && !available}
        />
      </Tooltip>
    );
  });

  const fallback = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => (
    <Stick $gray key={index} />
  ));

  const fallbackSticksTohow =
    sticks.length < 10 ? fallback.slice(0, 10 - sticks.length) : [];

  return <Bar>{[...fallbackSticksTohow, ...sticks]}</Bar>;
};

export default AvailabilityBar;
