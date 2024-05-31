import { useState, useEffect } from "react";
import useAlert from "../../../hooks/useAlert";
import Switch from "../../../components/Switch/Switch";
import { getDnsStats, postDnsProtection } from "../../../api";
import { Description, StatusText, StatusValue } from "./DnsSettings.styled";

const DnsSettings = () => {
  const [protectionEnabled, setProtectionEnabled] = useState<boolean>(false);

  const [showAlert, Alert] = useAlert({});

  const fetchDnsStats = () => {
    getDnsStats()
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setProtectionEnabled(data?.protection_enabled);
      })
      .catch((err) => {
        console.error("Error fetching dns stats", err);
        showAlert("Error fetching dns stats", "error");
      });
  };

  const handleSwitch = () => {
    postDnsProtection(!protectionEnabled)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        throw res.json();
      })
      .then(() => {
        if (!protectionEnabled) {
          showAlert("DNS protection enabled", "success");
        } else {
          showAlert("DNS protection disabled", "warning");
        }
      })
      .catch((err) => {
        console.error("Error switching dns protection", err);
        showAlert("Error switching dns protection", "error");
      })
      .finally(fetchDnsStats);
  };

  useEffect(fetchDnsStats, []);

  return (
    <>
      <Description>
        Here you can decide whether you want to enable detection of suspicious
        DNS queries.
      </Description>
      <StatusText>
        Protections is:
        <StatusValue $enabled={protectionEnabled}>
          {protectionEnabled ? "enabled" : "disabled"}
        </StatusValue>
        <Switch
          checked={protectionEnabled}
          setChecked={() => handleSwitch()}
          label="enable"
          disableLabel
        />
      </StatusText>

      {Alert}
    </>
  );
};

export default DnsSettings;
