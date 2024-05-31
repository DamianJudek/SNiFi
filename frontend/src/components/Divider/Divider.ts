import styled from "styled-components";
import Divider from "@mui/material/Divider";
import { DividerProps } from "./Divider.interface";

export const StyledDivider = styled(Divider)<DividerProps>`
  background-color: ${({ theme }) => theme.palette.white};
  ${({ theme, spacing }) =>
    spacing ? `margin: ${theme.spacing[spacing]} 0 !important` : null};
  width: 100%;
`;

export default StyledDivider;
