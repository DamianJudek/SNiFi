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
  stats_period: number;
  dns_queries: number;
  blocked_percentage: number;
  active_rules: number;
};

type StatisticProps = { name: string; value: number };

const Statistic = ({ name, value }: StatisticProps) => {
  return (
    <Field>
      <Name>{name}</Name>
      <Value>{value}</Value>
    </Field>
  );
};

const statsFallback = {
  stats_period: 0,
  dns_queries: 0,
  blocked_percentage: 0,
  active_rules: 0,
};

const DnsStatistics = () => {
  const [statistics, setStatistics] =
    useState<DnsStatisticsData>(statsFallback);
  const [showAlert, Alert] = useAlert({});
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { stats_period, dns_queries, blocked_percentage, active_rules } =
    statistics;

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
      .finally(() => setIsLoading(false));
  };

  useEffect(fetchDnsStats, []);

  if (isLoading) {
    return (
      <Container>
        <CircularLoader />
      </Container>
    );
  }

  return (
    <Container>
      <Title>DNS queries statistics</Title>
      {isLoading ? (
        <CircularLoader />
      ) : (
        <List>
          <Statistic name="Period" value={stats_period} />
          <Statistic name="Queries" value={dns_queries} />
          <Statistic name="Blocked" value={blocked_percentage} />
          <Statistic name="Rules" value={active_rules} />
        </List>
      )}
      {Alert}
    </Container>
  );
};

export default DnsStatistics;
