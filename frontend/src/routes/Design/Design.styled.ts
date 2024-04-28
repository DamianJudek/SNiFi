import styled from "styled-components";

export const Container = styled.div`
  background-color: ${({ theme }) => theme.palette.lightBlack};
`;

export const Header = styled.h1`
  width: 100%;
  font-family: ${({ theme }) => theme.font.inter};
  font-size: 40px;
  text-align: center;
  color: ${({ theme }) => theme.palette.darkWhite};
  margin: 0 0 20px 0;
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
  color: ${({ theme }) => theme.palette.darkWhite};
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
`;
