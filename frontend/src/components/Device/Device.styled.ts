import styled from "styled-components";
import { LabelSmallBold, SmallInfo } from "../../styles/typography";

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
  ${LabelSmallBold};
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
