import styled from "styled-components";
import { LabelBold } from "../../styles/typography";
import { PaletteKeys } from "../../styles/theme/palette";

interface StyledPillProps {
  $color: PaletteKeys;
}

export const Pill = styled.span<StyledPillProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => `${theme.spacing.small} ${theme.spacing.small}`};
  background-color: ${({ theme }) => theme.palette.darkGray};
  border-radius: 50px;
  line-height: 0;

  i {
    color: ${({ theme, $color }) => theme.palette[$color]};
    font-size: 14px;
    margin-right: ${({ theme }) => theme.spacing.tiny};
    line-height: 0;
  }
`;

export const Text = styled.span`
  ${LabelBold};
`;
