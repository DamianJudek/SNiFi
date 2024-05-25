export type AlertSeverity = "success" | "info" | "warning" | "error";

export type AlertProps = {
  open: boolean;
  handleClose: () => void;
  message: string;
  severity: AlertSeverity;
  horizontal: "center" | "left" | "right";
  vertical: "bottom" | "top";
  duration: number;
};
