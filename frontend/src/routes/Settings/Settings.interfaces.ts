import { ReactNode } from "react";

export interface SettingsTabProps {
  children?: ReactNode;
  index: number;
  tabId: number;
  header: string;
}
