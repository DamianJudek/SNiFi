import { ReactNode } from "react";
import { ButtonProps as MuiButtonProps } from "@mui/base/Button";
import { StyledButton, InnerText } from "./Button.styled";
import Icon from "../Icon/Icon";

interface ButtonProps extends MuiButtonProps {
  icon?: string;
  color?: "red" | "blue";
  children: ReactNode;
}

const Button = ({ icon, color = "blue", children, ...props }: ButtonProps) => {
  return (
    <StyledButton $color={color} {...props}>
      {icon && <Icon name={icon} />}
      <InnerText>{children}</InnerText>
    </StyledButton>
  );
};

export default Button;
