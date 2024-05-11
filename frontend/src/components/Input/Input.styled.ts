import styled from "styled-components";
import { Input, inputClasses } from "@mui/base/Input";

type StyledInput = {
  fullWidth?: boolean;
};

export const StyledInput = styled(Input)<StyledInput>`
  padding: ${({ theme }) => `${theme.spacing.tiny} ${theme.spacing.medium}`};
  margin: 0 ${({ theme }) => theme.spacing.tiny};
  transition: color 150ms ease;
  cursor: pointer;
  border-radius: 25px;
  background-color: ${({ theme }) => theme.palette.black};
  border: 1px solid ${({ theme }) => theme.palette.lightGray};
  ${({ $fullWidth }) => $fullWidth && "width: 100%"};

  & .${inputClasses.input} {
    border: none;
    outline: none;
    font-size: 16px;
    background-color: ${({ theme }) => theme.palette.black};
    color: ${({ theme }) => theme.palette.darkWhite};
    font-family: ${({ theme }) => theme.font.roboto};
    font-weight: ${({ theme }) => theme.weight.regular};

    &::placeholder {
      color: ${({ theme }) => theme.palette.darkGray};
    }

    &::-ms-input-placeholder {
      color: ${({ theme }) => theme.palette.darkGray};
    }
  }

  &:hover {
    border-color: ${({ theme }) => theme.palette.blue};
  }

  &.${inputClasses.focused} {
    border-color: ${({ theme }) => theme.palette.blue};
  }

  &.${inputClasses.error} {
    border-color: ${({ theme }) => theme.palette.red};

    & .${inputClasses.input} {
      color: ${({ theme }) => theme.palette.red};
    }
  }
`;

export default StyledInput;
