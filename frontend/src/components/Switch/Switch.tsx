import { Dispatch, SetStateAction } from "react";

import { StyledFormControlLabel, StyledSwitch } from "./Switch.styled";

type SwitchProps = {
  label: string;
  checked: boolean;
  setChecked: Dispatch<SetStateAction<boolean>>;
};

export default function Switch({ label, checked, setChecked }: SwitchProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <StyledFormControlLabel
      control={
        <StyledSwitch
          checked={checked}
          //   @ts-ignore
          onChange={handleChange}
        />
      }
      label={label}
    />
  );
}
