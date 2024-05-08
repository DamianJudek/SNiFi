import styled from "styled-components";
import { H2, LabelBold, SmallInfo } from "../../styles/typography";

// ConnectedDevices part

export const Contaienr = styled.section`
  display: flex;
  flex-direction: column;
  max-width: 700px;
  min-width: 550px;
  border-radius: 5px;
`;

export const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  width: 100%;
  padding: 20px 20px 20px 50px;
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
  padding: 20px 20px 20px 50px;
`;

// DEVICE PART

export const HeaderRow = styled.div`
  display: grid;
  grid-template-columns: 1fr repeat(2, 3fr) repeat(2, 1.5fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  padding: 20px 20px 20px 50px;
  background-color: ${({ theme }) => theme.palette.lightBlack};
`;

export const HeaderLabel = styled.span`
  ${LabelBold}
  text-align: center;
`;

export const Row = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr repeat(2, 3fr) repeat(2, 1.5fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  width: 100%;
  margin: ${({ theme }) => `${theme.spacing.small} 0`};
`;

export const BadgeWrapper = styled.div``;

export const Info = styled.div`
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

export const AvailabilityWrapper = styled.div``;

export const NewBadgeWrapper = styled.div`
  position: absolute;
  bottom: 100%;
  left: -40px;
  opacity: 0.5;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: o auto;
`;
