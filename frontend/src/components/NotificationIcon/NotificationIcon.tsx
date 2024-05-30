import Badge from "@mui/material/Badge";
import Icon from "../Icon/Icon";
import { Wrapper } from "./NotificationIcon.styled";
import { Link } from "react-router-dom";

const Notifications = () => {
  return (
    <Wrapper>
      <Link to="/notifications">
        <Badge badgeContent={4} color="primary">
          <Icon name="flag" />
        </Badge>
      </Link>
    </Wrapper>
  );
};

export default Notifications;
