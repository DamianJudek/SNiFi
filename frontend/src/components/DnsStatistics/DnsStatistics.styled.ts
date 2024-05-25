import styled from "styled-components";
import { H3, H4 } from "../../styles/typography";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h2`
  ${H3};
  text-align: left;
  margin: 0 0 ${({ theme }) => theme.spacing.small} 0;
`;

export const List = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.palette.lightBlack};
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.small}
    ${({ theme }) => theme.spacing.medium};
`;

export const Name = styled.span`
  ${H3};
  text-align: center;
  letter-spacing: 0;
  font-weight: ${({ theme }) => theme.weight.bold};
  margin: 0 0 ${({ theme }) => theme.spacing.small} 0;
`;

export const Value = styled.span`
  ${H4};
  text-align: center;
  margin: 0;
`;
