import styled from "styled-components";
import Alert from "@mui/material/Alert";
import Button from "../../components/Button/Button";
import { Paragraph, LabelSmallBold } from "../../styles/typography";

export const Header = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing.small} ${theme.spacing.medium}`};
  height: 60px;
  background-color: ${({ theme }) => theme.palette.lightBlack};
  margin-bottom: ${({ theme }) => theme.spacing.small};
  border-radius: 5px;

  & button {
    margin-left: auto;
  }
`;

export const FileAnnounce = styled.p`
  ${Paragraph};
  font-size: 16px;
  margin: 0 ${({ theme }) => theme.spacing.large} 0 0;
`;

export const FileName = styled.span`
  ${Paragraph};
  font-weight: ${({ theme }) => theme.weight.light};
`;

export const FileUploaderWrapper = styled.div`
  flex: 1;

  & * {
    box-sizing: border-box;
  }

  & > label {
    display: flex;

    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-width: 300px;
    height: 100%;
    padding: ${({ theme }) => theme.spacing.large};
    border: 2px dashed ${({ theme }) => theme.palette.darkBlue};
    border-radius: 5px;
  }
`;

export const StyledAlert = styled(Alert)`
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  border: 1px solid ${({ theme }) => theme.palette.red} !important;
  border-radius: 5px;

  .MuiAlert-message {
    color: ${({ theme }) => theme.palette.red};
  }
`;

export const Icon = styled.img`
  width: 80px;
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

export const Info = styled.p`
  ${Paragraph};
  font-size: 18px;
  font-weight: ${({ theme }) => theme.weight.light};
`;

export const InfoButton = styled.button`
  ${LabelSmallBold};
  display: inline;
  border: none;
  margin: 0;
  padding: 0;
  background-color: transparent;
  cursor: pointer;
  font-size: 18px;
`;

export const ConfirmButton = styled(Button)``;
