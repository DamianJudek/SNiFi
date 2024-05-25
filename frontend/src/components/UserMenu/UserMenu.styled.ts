import styled from "styled-components";
import MenuItem from "@mui/material/MenuItem";

export const StyledMenuItem = styled(MenuItem)`
  display: flex;
  gap: 15px;
  font-size: 16px;
  font-family: ${({ theme }) => theme.font.roboto} !important;
  color: ${({ theme }) => theme.palette.white} !important;

  &:hover {
    background-color: ${({ theme }) => theme.palette.darkBlue} !important;
  }

  i {
    color: ${({ theme }) => theme.palette.white};
  }
`;
