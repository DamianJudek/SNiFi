import styled from "styled-components";
import { H2, LabelBold, SmallInfo } from "../../styles/typography";

// ConnectedDevices part

export const Contaienr = styled.section`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  min-width: 350px;
  border-radius: 5px;
`;

export const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.medium};
  background-color: ${({ theme }) => theme.palette.darkGray};
  border-radius: 5px;
`;

export const Title = styled.h2`
  ${H2};
  margin: 0;
  font-size: 25px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 350px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.palette.lightBlack};
  padding: ${({ theme }) => theme.spacing.medium};
`;

// DEVICE PART

export const Row = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: ${({ theme }) => `${theme.spacing.small} 0`};
`;

export const BadgeWrapper = styled.div`
  flex: 20%;
`;

export const Info = styled.div`
  flex: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  margin-left: ${({ theme }) => theme.spacing.small};
`;

export const Name = styled.div`
  ${LabelBold};
`;

export const Ip = styled.div`
  ${SmallInfo}
`;

export const ButtonWrapper = styled.div`
  flex: 10%;
`;
