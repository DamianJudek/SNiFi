import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing.medium};
`;

export const StatisticsWrapper = styled.div`
  max-width: 1600px;
  width: 100%;
  margin: ${({ theme }) => `0 auto ${theme.spacing.large} auto`};
`;

export const HalfContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.large};
  width: 100%;
  max-width: 1600px;
  padding: ${({ theme }) => theme.spacing.medium};
  margin: ${({ theme }) => `0 auto ${theme.spacing.large} auto`};

  @media (min-width: 1200px) {
    flex-direction: row;
    align-items: stretch;
  }
`;
