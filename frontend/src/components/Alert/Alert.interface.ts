import { SyntheticEvent } from "react";

export type AlertSeverity = "success" | "info" | "warning" | "error";

export type AlertProps = {
  open: boolean;
  handleClose: (event: SyntheticEvent<Element, Event>) => void;
  message: string;
  severity: AlertSeverity;
  horizontal: "center" | "left" | "right";
  vertical: "bottom" | "top";
  duration: number;
};
