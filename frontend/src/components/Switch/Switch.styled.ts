import styled from "styled-components";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

export const StyledFormControlLabel = styled(FormControlLabel)`
  color: ${({ theme }) => theme.palette.darkWhite};
`;

export const StyledSwitch = styled(Switch)`
  .MuiSwitch-switchBase {
    color: ${({ theme }) => theme.palette.lightGray};
  }
  .MuiSwitch-switchBase.Mui-checked {
    color: ${({ theme }) => theme.palette.darkBlue};
  }

  .MuiSwitch-track {
    background-color: ${({ theme }) => theme.palette.darkWhite} !important;
  }

  .Mui-checked + .MuiSwitch-track {
    background-color: ${({ theme }) => theme.palette.blue} !important;
  }
`;
