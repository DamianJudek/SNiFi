import { Container } from "./Home.styled";
import DnsStatistics from "../../components/DnsStatistics/DnsStatistics";
import ConnectedDevices from "../../components/ConnectedDevices/ConnectedDevices";
import ManualScan from "../../components/ManualScan/ManualScan";
import { StatisticsWrapper, HalfContainer } from "./Home.styled";

const Home = () => {
  return (
    <Container>
      <StatisticsWrapper>
        <DnsStatistics />
      </StatisticsWrapper>
      <HalfContainer>
        <ConnectedDevices />
        <ManualScan />
      </HalfContainer>
    </Container>
  );
};

export default Home;
