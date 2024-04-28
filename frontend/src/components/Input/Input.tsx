import { InputProps as MuiInputProps } from "@mui/base/Input";
import { StyledInput } from "./Input.styled";

type InputProps = MuiInputProps & {
  fullWidth?: boolean;
};

const Input = ({ fullWidth = false, ...props }: InputProps) => {
  return <StyledInput $fullWidth={fullWidth} {...props} />;
};

export default Input;
