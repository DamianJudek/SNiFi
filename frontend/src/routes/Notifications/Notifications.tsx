import { useEffect, useState } from "react";
import useAlert from "../../hooks/useAlert";
import { getNotifications } from "../../api";
import {
  Notification,
  NotificationProps,
} from "../../components/Notification/Notification";
import {
  Wrapper,
  Header,
  NotificationsTab,
  NotificationsTabName,
  NotificationsTabContent,
  NoNotificationsInfo,
} from "./Notifications.styled";

const Notifications = () => {
  const [newNotifications, setNewNotifications] = useState<NotificationProps[]>(
    []
  );
  const [oldNotifications, setOldNotifications] = useState<NotificationProps[]>(
    []
  );
  const [showAlert, Alert] = useAlert({});

  const fetchNotifications = () => {
    getNotifications()
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        throw res.json();
      })
      .then((res) => {
        setNewNotifications(res.new);
        setOldNotifications(res.old);
      })

      .catch((err) => {
        console.error(err);
        showAlert("Error fetching notifications", "error");
      });
  };

  const handleSeenClick = (id: string) => {
    console.log("Notification ", id, " marked as seen");
    fetchNotifications();
  };
  useEffect(() => {
    const id = setInterval(fetchNotifications, 5000);
    return () => clearInterval(id);
  }, []);

  useEffect(fetchNotifications, []);

  const newTiles = newNotifications.map((props) => (
    <Notification key={props.id} {...props} handleSeenClick={handleSeenClick} />
  ));

  const oldTiles = oldNotifications.map((props) => (
    <Notification key={props.id} {...props} handleSeenClick={handleSeenClick} />
  ));

  return (
    <Wrapper>
      <Header>Notifications</Header>
      <NotificationsTab>
        <NotificationsTabName>New</NotificationsTabName>
        <NotificationsTabContent>
          {newTiles.length > 0 ? (
            newTiles
          ) : (
            <NoNotificationsInfo>No notifications</NoNotificationsInfo>
          )}
        </NotificationsTabContent>
      </NotificationsTab>
      <NotificationsTab>
        <NotificationsTabName>Old</NotificationsTabName>
        <NotificationsTabContent>
          {oldTiles.length > 0 ? (
            oldTiles
          ) : (
            <NoNotificationsInfo>No old notifications</NoNotificationsInfo>
          )}
        </NotificationsTabContent>
      </NotificationsTab>
      {Alert}
    </Wrapper>
  );
};

export default Notifications;
