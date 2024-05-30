import Badge from "@mui/material/Badge";
import Icon from "../Icon/Icon";
import { Wrapper } from "./Notifications.styled";

const Notifications = () => {
  return (
    <Wrapper>
      <Badge badgeContent={4} color="primary">
        <Icon name="flag" />
      </Badge>
    </Wrapper>
  );
};

export default Notifications;
