import styled from "styled-components";
import { Paragraph, LabelBold, Label } from "../../../styles/typography";

export const Description = styled.p`
  ${Paragraph};
`;

export const StatusText = styled.p`
  ${LabelBold};
`;

type StatusValueProps = {
  $enabled: boolean;
};

export const StatusValue = styled.span<StatusValueProps>`
  ${Label};
  padding: ${({ theme }) =>
    ` 0 ${theme.spacing.tiny} 0 ${theme.spacing.small}`};

  color: ${({ theme, $enabled }) =>
    $enabled ? theme.palette.green : theme.palette.gold};
`;
