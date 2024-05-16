import styled from "styled-components";
import Divider from "@mui/material/Divider";
import { SpacingKeys } from "../../styles/theme/spacing";

type DividerProps = {
  spacing?: SpacingKeys;
};

export const StyledDivider = styled(Divider)<DividerProps>`
  background-color: ${({ theme }) => theme.palette.white};
  ${({ theme, spacing }) =>
    spacing ? `margin: ${theme.spacing[spacing]} 0 !important` : null};
  width: 100%;
`;

export default StyledDivider;
