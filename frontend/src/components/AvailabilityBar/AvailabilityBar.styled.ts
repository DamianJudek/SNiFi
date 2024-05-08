import styled from "styled-components";

interface StyledStickPropss {
  $red?: boolean;
  $green?: boolean;
  $gray?: boolean;
}

export const Bar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.small};
`;

export const Stick = styled.span<StyledStickPropss>`
  display: block;
  width: 3px;
  height: 30px;
  cursor: pointer;
  ${({ theme, $gray }) => $gray && `background-color: ${theme.palette.gray};`}
  ${({ theme, $green }) =>
    $green && `background-color: ${theme.palette.green};`}
  ${({ theme, $red }) => $red && `background-color: ${theme.palette.red};`}
`;
