import { Link } from "react-router-dom";
import Icon from "../Icon/Icon";
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
      <Link to="/settings" aria-label="Settings">
        <Icon name="settings" />
      </Link>
    </StyledHeader>
  );
};

export default Header;
