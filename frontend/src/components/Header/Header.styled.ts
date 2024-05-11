import styled from "styled-components";
import { H1 } from "../../styles/typography";

export const StyledHeader = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing.small} ${theme.spacing.large}`};
  width: 100%;
  background-color: ${({ theme }) => theme.palette.lightBlack};
`;

export const Logo = styled.i`
  font-size: 50px;
  color: ${({ theme }) => theme.palette.blue};
`;

export const Heading = styled.h1`
  ${H1};
  margin: ${({ theme }) => ` 0  auto 0 ${theme.spacing.medium}`};
`;
