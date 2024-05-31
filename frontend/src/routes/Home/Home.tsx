import { Container } from "./Home.styled";
import DnsStatistics from "../../components/DnsStatistics/DnsStatistics";
import ConnectedDevices from "../../components/ConnectedDevices/ConnectedDevices";
import ManualScan from "../../components/ManualScan/ManualScan";
import DnsBlockedList from "../../components/DnsBlockedList/DnsBlockedList";
import { FullGrid, HalfGrid } from "./Home.styled";

const Home = () => {
  return (
    <Container>
      <FullGrid>
        <DnsStatistics />
      </FullGrid>
      <HalfGrid>
        <ConnectedDevices />
        <ManualScan />
      </HalfGrid>
      <FullGrid>
        <DnsBlockedList />
      </FullGrid>
    </Container>
  );
};

export default Home;
