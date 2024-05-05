import UserMenu from "../UserMenu/UserMenu";
import { StyledHeader, Logo, Heading } from "./Header.styled";

const Header = () => {
  return (
    <StyledHeader>
      <Logo className="icon-dog" />
      <Heading>SNiFi</Heading>
      <UserMenu />
    </StyledHeader>
  );
};

export default Header;
