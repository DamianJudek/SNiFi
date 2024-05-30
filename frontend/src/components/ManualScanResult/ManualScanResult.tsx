import { ManualScanResultProps } from "./ManualScanResult.interface";
import {
  Container,
  Header,
  Content,
  Name,
  Value,
  Button,
} from "./ManualScanResult.styled";

const ManualScanResult = ({
  averageConfidenceAttack,
  averageConfidenceBenign,
  finalDecision,
  totalPredictions,
  reset,
}: ManualScanResultProps) => {
  const isAttack = finalDecision === "Attack";
  const message = isAttack
    ? "Our AI model found suspicious packages"
    : "Scanned file looks safe";

  const toPercent = (num: number) => `${(num * 100).toFixed(2)}%`;

  return (
    <Container $isAttack={isAttack}>
      <Header $isAttack={isAttack}>{message}</Header>
      <Content>
        <Name>
          Attack confidence: <Value>{toPercent(averageConfidenceAttack)}</Value>
        </Name>
        <Name>
          Begin confidence: <Value>{toPercent(averageConfidenceBenign)}</Value>
        </Name>
        <Name>
          Scanned packages: <Value>{totalPredictions}</Value>
        </Name>
      </Content>
      <Button onClick={reset}>Scan other file</Button>
    </Container>
  );
};

export default ManualScanResult;
