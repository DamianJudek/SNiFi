import styled from "styled-components";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import { LabelBold } from "../../styles/typography";

export const CircularContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.large};
  margin: 0 auto;
`;

export const StyledCircularLoader = styled(CircularProgress)`
  svg {
    color: ${({ theme }) => theme.palette.blue};
  }
`;

export const LinearContainer = styled.div`
  display: flex;
  align-items: center;
  min-width: 300px;
  padding: 0 ${({ theme }) => theme.spacing.medium};
`;

export const Progress = styled.span`
  ${LabelBold};
  padding-left: ${({ theme }) => theme.spacing.medium};
`;

export const StyledLinearLoader = styled(LinearProgress)<LinearProgressProps>`
  min-width: 300px;
  background-color: ${({ theme }) => theme.palette.lightBlue} !important;

  span {
    background-color: ${({ theme }) => theme.palette.darkBlue};
  }
`;
