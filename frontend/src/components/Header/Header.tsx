import UserMenu from "../UserMenu/UserMenu";
import Notifications from "../NotificationIcon/NotificationIcon";
import { StyledHeader, StyledLink, Logo, Heading } from "./Header.styled";

const Header = () => {
  return (
    <StyledHeader>
      <StyledLink to="/">
        <Logo className="icon-dog" />
        <Heading>SNiFi</Heading>
      </StyledLink>
      <Notifications />
      <UserMenu />
    </StyledHeader>
  );
};

export default Header;
