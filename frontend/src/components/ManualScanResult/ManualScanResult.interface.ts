export interface ManualScanResulResponse {
  attackRatio: number;
  averageConfidenceAttack: number;
  averageConfidenceBenign: number;
  finalDecision: string;
  scanId: string;
  totalPredictions: number;
}

export interface ManualScanResultProps extends ManualScanResulResponse {
  reset: () => void;
}
