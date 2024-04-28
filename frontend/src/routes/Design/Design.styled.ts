import styled from "styled-components";

export const Container = styled.div``;

export const Header = styled.h1`
  width: 100%;
  font-family: ${({ theme }) => theme.font.inter};
  font-size: 40px;
  text-align: center;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 30px;
  border-bottom: 2px dashed ${({ theme }) => theme.palette.gray};
`;

export const SectionHeader = styled.h2`
  font-family: ${({ theme }) => theme.font.roboto};
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
`;
