import styled from "styled-components";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Button from "../../components/Button/Button";
import { H2, H3 } from "../../styles/typography";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.palette.black};
`;

export const InnerContainer = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 65vh;
  background-color: ${({ theme }) => theme.palette.lightBlack};
  border-radius: 5px;
`;

export const Header = styled.h2`
  ${H2};
  text-align: left;
`;

export const StyledOptions = styled(Tabs)`
  border-radius: 5px;
  background-color: ${({ theme }) => theme.palette.lightBlack};

  & .MuiTabs-indicator {
    background-color: ${({ theme }) => theme.palette.blueDarker};
  }
`;

export const StyledOption = styled(Tab)`
  align-items: flex-start !important;
  min-width: 150px !important;
  color: ${({ theme }) => theme.palette.white} !important;
  font-family: ${({ theme }) => theme.font.inter} !important;
  text-transform: none !important;
  letter-spacing: 0px !important;
  font-size: 12px !important;

  &.Mui-selected {
    background-color: ${({ theme }) => theme.palette.darkGray} !important;
  }
`;

type StyledSettingsTab = {
  $visible: boolean;
};

export const StyledSettingsTab = styled.div<StyledSettingsTab>`
  flex: 1;
  display: ${({ $visible }) => ($visible ? "flex" : "none")};
  flex-direction: column;
`;

export const SettingsTabName = styled.h3`
  ${H3};
  text-align: left;
  padding: ${({ theme }) => `${theme.spacing.small} ${theme.spacing.medium}`};
  background-color: ${({ theme }) => theme.palette.darkGray};
  border-radius: 0 5px 0 0;
`;

export const SettingsTabContent = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: ${({ theme }) =>
    `0 ${theme.spacing.medium} ${theme.spacing.medium}`};
`;

export const ConfirmButton = styled(Button)`
  position: absolute;
  bottom: 20px;
  right: 20px;
`;
