import { useEffect, useState } from "react";
import Badge from "@mui/material/Badge";
import { Link } from "react-router-dom";
import { getNotifications } from "../../api";
import Icon from "../Icon/Icon";
import { Wrapper } from "./NotificationIcon.styled";

const Notifications = () => {
  const [notificationsCount, setNotificationsCount] = useState<number>(0);

  const fetchNotifications = () => {
    getNotifications()
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        throw res.json();
      })
      .then((res) => {
        setNotificationsCount(res?.new?.length || 0);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    const id = setInterval(fetchNotifications, 10000);
    return () => clearInterval(id);
  }, []);

  useEffect(fetchNotifications, []);

  return (
    <Wrapper>
      <Link to="/notifications">
        <Badge badgeContent={notificationsCount} color="primary">
          <Icon name="flag" />
        </Badge>
      </Link>
    </Wrapper>
  );
};

export default Notifications;
