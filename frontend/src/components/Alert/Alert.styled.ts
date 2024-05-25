import styled from "styled-components";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export const StyledSnackbar = styled(Snackbar)``;

export const StyledAlert = styled(Alert)`
  &.MuiPaper-root {
    padding: ${({ theme }) => theme.spacing.tiny}
      ${({ theme }) => theme.spacing.medium} !important;

    &.MuiAlert-colorSuccess {
      background-color: ${({ theme }) => theme.palette.darkGreen} !important;
      & .MuiAlert-icon {
        color: ${({ theme }) => theme.palette.green};
      }
    }

    &.MuiAlert-colorError {
      background-color: ${({ theme }) => theme.palette.darkRed} !important;
      & .MuiAlert-icon {
        color: ${({ theme }) => theme.palette.lightRed};
      }
    }

    &.MuiAlert-colorInfo {
      background-color: ${({ theme }) => theme.palette.darkBlue} !important;

      & .MuiAlert-icon {
        color: ${({ theme }) => theme.palette.lightBlue};
      }
    }

    &.MuiAlert-colorWarning {
      background-color: ${({ theme }) => theme.palette.darkYellow} !important;

      & .MuiAlert-icon {
        color: ${({ theme }) => theme.palette.gold};
      }
    }
  }
`;
