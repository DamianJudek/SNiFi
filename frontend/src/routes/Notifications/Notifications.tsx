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

const notificationObj = {
  id: "1",
  type: "new_device",
  severity: 3,
  device: {
    name: "device name",
    mac: "mac1:23:23:@3:@3:@3::@3:24",
    ip: "192.168.8.1",
  },
  scanId: "adad adadadsa dasd ad",
  timestamp: "2024-01-03",
  seen: true,
};

const mockedApiResponse = [
  notificationObj,
  { ...notificationObj, severity: 1, id: "2" },
  { ...notificationObj, severity: 2, id: "3", seen: true },
];

const Notifications = () => {
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);
  const [showAlert, Alert] = useAlert({});

  const fetchNotifications = () => {
    setNotifications(mockedApiResponse);
    return;
    getNotifications()
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        throw res.json();
      })
      .then((res) => {
        console.log("notifications", res);
        setNotifications(res);
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

  useEffect(fetchNotifications, []);

  const newTiles = notifications
    .map((props) => {
      if (!props.seen) {
        return (
          <Notification
            key={props.id}
            {...props}
            handleSeenClick={handleSeenClick}
          />
        );
      }
      return null;
    })
    .filter((e) => e !== null);

  const oldTiles = notifications.map((props) => {
    if (props.seen) {
      return (
        <Notification
          key={props.id}
          {...props}
          handleSeenClick={handleSeenClick}
        />
      );
    }
    return null;
  });
  console.log(newTiles);

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
        <NotificationsTabContent>{oldTiles}</NotificationsTabContent>
      </NotificationsTab>
      {Alert}
    </Wrapper>
  );
};

export default Notifications;
