import styled from "styled-components";
import breakpoint from "../../styles/breakpoints";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const SquareRed = styled.div`
  width: 30px;
  height: 30px;
  background-color: ${({ theme }) => theme.palette.red};
`;

export const SquareBlue = styled.div`
  width: 30px;
  height: 30px;
  background-color: ${({ theme }) => theme.palette.blue};
  margin-left: ${({ theme }) => theme.spacing.tiny};

  @media ${breakpoint.desktop} {
    background-color: red;
  }
`;
