import styled from "styled-components";
import { Button, buttonClasses } from "@mui/base/Button";

interface StyledButtonProps {
  $color: "red" | "blue";
}

const upper = (color: string): "Red" | "Blue" => {
  const colorTemp = [...color];
  colorTemp[0] = colorTemp[0].toUpperCase();
  return colorTemp.join("") as "Red" | "Blue";
};

export const StyledButton = styled(Button)<StyledButtonProps>(
  ({ theme, $color }) => `
    display: flex;
    align-items: center; 
    justify-content: center;
    font-family: ${theme.font.roboto};
    font-weight: ${theme.weight.medium};
    padding: ${theme.spacing.small} ${theme.spacing.medium}; 
    margin: ${theme.spacing.tiny}; 
    transition: all 150ms ease;
    cursor: pointer;
    border-radius: 25px;
    border:none;
    background-color: ${theme.palette[$color]};
    color: ${theme.palette.white};

    &:hover {
      background-color: ${theme.palette[`dark${upper($color)}`]};
    }
  
    &.${buttonClasses.active} {
      background-color: ${theme.palette[`dark${upper($color)}`]};
    }
  
    &.${buttonClasses.focusVisible} {
      background-color: ${theme.palette[`light${upper($color)}`]};
    }
  
    &.${buttonClasses.disabled} {
      background-color: ${theme.palette[`light${upper($color)}`]};
      opacity:0.6;
    }

    & i {
      margin-right: ${theme.spacing.tiny};
      font-size: 16px;
      color:white;
    }

    `
);

export const InnerText = styled.span`
  font-size: 16px;
`;

export default StyledButton;
