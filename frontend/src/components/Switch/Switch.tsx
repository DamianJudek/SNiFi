import { Dispatch, SetStateAction } from "react";

import { StyledFormControlLabel, StyledSwitch } from "./Switch.styled";

type SwitchProps = {
  label: string;
  checked: boolean;
  setChecked: Dispatch<SetStateAction<boolean>>;
  disableLabel?: boolean;
};

export default function Switch({
  label,
  checked,
  setChecked,
  disableLabel,
}: SwitchProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  const content = (
    <StyledSwitch
      aria-label={label}
      checked={checked}
      //   @ts-ignore
      onChange={handleChange}
    />
  );

  if (disableLabel) {
    return content;
  }

  return <StyledFormControlLabel control={content} label={label} />;
}
