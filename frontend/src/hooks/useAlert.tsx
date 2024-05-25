import { useState, ReactNode } from "react";
import { AlertSeverity } from "../components/Alert/Alert.interface";
import Alert from "../components/Alert/Alert";

export type UseAlertProps = {
  horizontal?: "center" | "left" | "right";
  vertical?: "bottom" | "top";
  duration?: number;
};

type UseAlertReturnType = [
  (msg: string, type: AlertSeverity) => void,
  ReactNode,
];

export const useAlert = ({
  vertical = "top",
  horizontal = "center",
  duration = 4000,
}: UseAlertProps): UseAlertReturnType => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [severity, setSeverity] = useState<AlertSeverity>("info");

  const showAlert = (msg: string, type: AlertSeverity = "info") => {
    setMessage(msg);
    setIsOpen(true);
    setSeverity(type);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return [
    showAlert,
    <Alert
      open={isOpen}
      message={message}
      severity={severity}
      vertical={vertical}
      horizontal={horizontal}
      handleClose={handleClose}
      duration={duration}
    />,
  ];
};

export default useAlert;
