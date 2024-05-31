import { SettingsTabProps } from "./Settings.interface";
import {
  StyledSettingsTab,
  SettingsTabName,
  SettingsTabContent,
} from "./Settings.styled";

const SettingsTab = ({ children, tabId, index, header }: SettingsTabProps) => {
  return (
    <StyledSettingsTab
      role="tabpanel"
      hidden={tabId !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      $visible={tabId === index}
    >
      <SettingsTabName>{header}</SettingsTabName>
      <SettingsTabContent>{children}</SettingsTabContent>
    </StyledSettingsTab>
  );
};

export default SettingsTab;
