import { useState, SyntheticEvent } from "react";
import SettingsTab from "./SettingsTab";
import IntegrationSettings from "./SettingsViews/IntegrationSettings";
import { a11yProps } from "./Settings.functions";
import {
  Container,
  Header,
  InnerContainer,
  StyledOptions,
  StyledOption,
} from "./Settings.styled";

const Settings = () => {
  const [tabId, setTabId] = useState(0);

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setTabId(newValue);
  };

  return (
    <Container>
      <Header>Settings</Header>
      <InnerContainer>
        <StyledOptions
          orientation="vertical"
          variant="scrollable"
          value={tabId}
          onChange={handleChange}
          aria-label="Settings"
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          <StyledOption label="General" {...a11yProps(0)} />
          <StyledOption label="Integrations" {...a11yProps(1)} />
        </StyledOptions>
        <SettingsTab tabId={tabId} index={0} header="General">
          here we will put some general settings
        </SettingsTab>
        <SettingsTab tabId={tabId} index={1} header="Integrations">
          <IntegrationSettings />
        </SettingsTab>
      </InnerContainer>
    </Container>
  );
};

export default Settings;
