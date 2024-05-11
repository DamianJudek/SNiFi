import { Dispatch, SetStateAction } from "react";
import { SelectChangeEvent } from "@mui/material/Select";
import {
  StyledBox,
  StyledSelect,
  StyledInputLabel,
  StyledMenuItem,
  StyledFormControl,
} from "./Select.styled";

type SelectItem = {
  name: string;
  value: string | number;
};

type SelectProps = {
  value: string | number;
  setValue: Dispatch<SetStateAction<string>> | Dispatch<SetStateAction<number>>;
  label: string;
  options: SelectItem[];
};

export default function Select({
  setValue,
  value,
  label,
  options,
}: SelectProps) {
  const handleChange = (event: SelectChangeEvent<string | number>) => {
    // @ts-ignore
    setValue(event.target.value);
  };

  return (
    <StyledBox sx={{ minWidth: 220 }}>
      <StyledFormControl fullWidth size="small">
        <StyledInputLabel>{label}</StyledInputLabel>
        <StyledSelect
          value={value}
          label={label}
          // @ts-ignore
          onChange={handleChange}
        >
          {options.map(({ name, value }) => (
            <StyledMenuItem key={name} value={value}>
              {name}
            </StyledMenuItem>
          ))}
        </StyledSelect>
      </StyledFormControl>
    </StyledBox>
  );
}
