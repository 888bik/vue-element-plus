import type { FontAwesomeIconProps } from "@fortawesome/vue-fontawesome";

export interface IconProps extends FontAwesomeIconProps {
  color?: string;
  type?: "primary" | "success" | "warning" | "danger" | "info";
}
