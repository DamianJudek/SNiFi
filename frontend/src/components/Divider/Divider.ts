import styled from "styled-components";
import Divider from "@mui/material/Divider";

export const StyledDivider = styled(Divider)`
  background-color: ${({ theme }) => theme.palette.white};
`;

export default StyledDivider;
