import styled from "styled-components";
import { LabelSmallBold } from "../../styles/typography";

export const Pill = styled.span<StyledPillProps>`
  ${LabelSmallBold};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => `${theme.spacing.small} ${theme.spacing.small}`};
  background-color: ${({ theme }) => theme.palette.green};
  border-radius: 50px;
  line-height: 0;

  ${({ theme, $green }) =>
    $green &&
    `
    background-color: ${theme.palette.green};
    color: ${theme.palette.black};

  `};

  ${({ theme, $red }) =>
    $red &&
    `
    background-color: ${theme.palette.lightRed};
    color: ${theme.palette.white};

  `};

  ${({ theme, $gray }) =>
    $gray &&
    `
    background-color: ${theme.palette.gray};
    color: ${theme.palette.darkWhite};

  `};
`;

interface StyledPillProps {
  $red?: boolean;
  $green?: boolean;
  $gray?: boolean;
}

interface BadgeProps {
  children: string;
  red?: boolean;
  green?: boolean;
  gray?: boolean;
}

const Header = ({ children, red, green, gray }: BadgeProps) => {
  return (
    <Pill $red={red} $green={green} $gray={gray}>
      {children}
    </Pill>
  );
};

export default Header;
