import styled from "styled-components";
import Box from "@mui/material/Box";
import Select, { SelectProps } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

export const StyledBox = styled(Box)`
  padding: ${({ theme }) => theme.spacing.tiny};

  .MuiInputBase-root {
    border-radius: 25px;
  }

  .Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: ${({ theme }) => theme.palette.blue} !important;
  }
`;

export const StyledSelect = styled(Select)<SelectProps>`
  &.MuiInputBase-root {
    color: ${({ theme }) => theme.palette.darkWhite};
  }

  .MuiSvgIcon-root {
    color: ${({ theme }) => theme.palette.darkWhite};
  }

  .MuiOutlinedInput-notchedOutline {
    border-color: ${({ theme }) => theme.palette.lightGray} !important;
  }
`;

export const StyledInputLabel = styled(InputLabel)`
  &.MuiFormLabel-root {
    color: ${({ theme }) => theme.palette.darkWhite};
  }

  &.Mui-focused.MuiFormLabel-root {
    color: ${({ theme }) => theme.palette.blue} !important;
  }
`;

export const StyledMenuItem = styled(MenuItem)`
  &.MuiButtonBase-root.MuiMenuItem-root {
    background-color: ${({ theme }) => theme.palette.darkGray};
    color: ${({ theme }) => theme.palette.darkWhite};
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 5px;

    &:hover {
      background-color: ${({ theme }) => theme.palette.gray};
    }
  }
`;

export const StyledFormControl = styled(FormControl)``;
