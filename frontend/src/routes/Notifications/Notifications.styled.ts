import styled from "styled-components";
import { H2, H3, Paragraph } from "../../styles/typography";

export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Header = styled.h2`
  ${H2};
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

export const NotificationsTab = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.lightBlack};
  max-width: 500px;
  margin-bottom: ${({ theme }) => theme.spacing.large};
  width: 100%;
  max-height: 70vh;
  overflow-y: auto;
`;

export const NotificationsTabName = styled.h3`
  ${H3};
  text-align: left;
  padding: ${({ theme }) => `${theme.spacing.small} ${theme.spacing.medium}`};
  background-color: ${({ theme }) => theme.palette.darkGray};
  border-radius: 5px;
`;

export const NotificationsTabContent = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: ${({ theme }) =>
    `0 ${theme.spacing.medium} ${theme.spacing.medium}`};
`;

export const NoNotificationsInfo = styled.p`
  ${Paragraph};
  padding: 50px;
  margin: 0 auto;
`;
