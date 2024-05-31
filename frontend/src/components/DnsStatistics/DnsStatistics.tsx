import { useEffect, useState } from "react";
import { getDnsStats } from "../../api";
import useAlert from "../../hooks/useAlert";
import {
  Container,
  Title,
  List,
  Field,
  Name,
  Value,
} from "./DnsStatistics.styled";
import CircularLoader from "../Loader/Loader";

type DnsStatisticsData = {
  protection_enabled: boolean;
  stats_period: number;
  dns_queries: number;
  blocked_queries: number;
  blocked_percentage: number;
  active_rules: number;
};

type StatisticProps = {
  name: string;
  value: number | string;
  warning?: boolean;
  ok?: boolean;
};

const Statistic = ({
  name,
  value,
  warning = false,
  ok = false,
}: StatisticProps) => {
  return (
    <Field>
      <Name>{name}</Name>
      <Value $warning={warning} $ok={ok}>
        {value}
      </Value>
    </Field>
  );
};

const statsFallback = {
  protection_enabled: false,
  stats_period: 0,
  dns_queries: 0,
  blocked_queries: 0,
  blocked_percentage: 0,
  active_rules: 0,
};

const DnsStatistics = () => {
  const [statistics, setStatistics] =
    useState<DnsStatisticsData>(statsFallback);
  const [showAlert, Alert] = useAlert({});
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const {
    protection_enabled,
    stats_period,
    dns_queries,
    blocked_queries,
    blocked_percentage,
    active_rules,
  } = statistics;

  const fetchDnsStats = () => {
    getDnsStats()
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setStatistics(data);
      })
      .catch((err) => {
        console.error("Error fetching dns stats", err);
        showAlert("Error fetching dns stats", "error");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const id = setInterval(fetchDnsStats, 5000);
    return () => clearInterval(id);
  }, []);

  useEffect(fetchDnsStats, []);

  return (
    <Container>
      <Title>DNS queries statistics</Title>
      {isLoading ? (
        <CircularLoader />
      ) : (
        <List>
          <Statistic
            name="Protection"
            value={protection_enabled ? "enabled" : "disabled"}
            ok={protection_enabled}
            warning={!protection_enabled}
          />
          <Statistic name="Period" value={stats_period} />
          <Statistic name="Queries" value={dns_queries} />
          <Statistic name="Blocked queries" value={blocked_queries} />
          <Statistic name="Blocked (%)" value={blocked_percentage} />
          <Statistic name="Rules" value={active_rules} />
        </List>
      )}
      {Alert}
    </Container>
  );
};

export default DnsStatistics;
