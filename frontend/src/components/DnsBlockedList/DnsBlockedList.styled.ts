import styled from "styled-components";
import { H3 } from "../../styles/typography";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h2`
  ${H3};
  text-align: left;
  margin: 0 0 ${({ theme }) => theme.spacing.small} 0;
`;
