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
`;

export const Type = styled.p`
  ${LabelBold};
  margin-right: ${({ theme }) => theme.spacing.small};
  color: ${({ theme }) => theme.palette.lightBlack};
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
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;

export const Description = styled.p`
  ${Paragraph};
  color: ${({ theme }) => theme.palette.lightBlack};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;
