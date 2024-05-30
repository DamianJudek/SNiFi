import styled from "styled-components";
import { H3 } from "../../styles/typography";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing.medium};
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-width: 300px;
  max-width: 800px;
  padding: ${({ theme }) => theme.spacing.large};
  border: 2px dashed ${({ theme }) => theme.palette.darkBlue};
  border-radius: 5px;
`;

export const Header = styled.h3`
  ${H3};
  color: ${({ theme }) => theme.palette.blue};
`;
