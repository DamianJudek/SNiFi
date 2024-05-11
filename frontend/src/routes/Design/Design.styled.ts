import styled from "styled-components";
import { H2, H3 } from "../../styles/typography";

export const Container = styled.div``;

export const Header = styled.h2`
  ${H2};
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 30px;
  border-bottom: 2px dashed ${({ theme }) => theme.palette.gray};
`;

export const SectionHeader = styled.h3`
  ${H3};
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
`;
