import styled from "styled-components";
import Rating from "@mui/material/Rating";
import {
  LabelBold,
  LabelSmallBold,
  Paragraph,
  LabelSmall,
} from "../../styles/typography";

export const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.palette.white};
  min-width: 300px;
  max-width: 400px;
  min-height: 60px;
  padding: ${({ theme }) => theme.spacing.small};
  margin: ${({ theme }) => `${theme.spacing.small} 0`};
  border-radius: 5px;
  color: ${({ theme }) => theme.palette.lightBlack};

  button {
    margin: 0 0 0 auto;
  }
`;

export const TopRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;

export const Type = styled.p`
  ${LabelBold};
  margin-right: ${({ theme }) => theme.spacing.medium};
  color: ${({ theme }) => theme.palette.lightBlack};
  font-size: 20px;
`;

export const Severity = styled(Rating)`
  margin-left: auto;
  color: ${({ theme }) => theme.palette.red} !important;
`;

export const Date = styled.p`
  ${LabelSmall};
  color: ${({ theme }) => theme.palette.lightBlack};
`;

export const DeviceIp = styled.p`
  ${LabelSmallBold};
  color: ${({ theme }) => theme.palette.lightBlack};
  margin-bottom: ${({ theme }) => theme.spacing.tiny};
`;
export const DeviceMAC = styled.p`
  ${LabelSmallBold};
  color: ${({ theme }) => theme.palette.lightBlack};
  margin-bottom: ${({ theme }) => theme.spacing.tiny};
`;

export const Description = styled.p`
  ${Paragraph};
  color: ${({ theme }) => theme.palette.lightBlack};
  margin: ${({ theme }) => theme.spacing.medium} 0;
`;
