import { Pill } from "./Badge.styled";
import { BadgeProps } from "./Badge.interface";

const Header = ({ children, red, green, gray }: BadgeProps) => {
  return (
    <Pill $red={red} $green={green} $gray={gray}>
      {children}
    </Pill>
  );
};

export default Header;
