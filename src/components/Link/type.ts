export type linkProps = {
  type?: LinkType;
  disabled?: boolean;
  underline?: "always" | "hover" | "never" | boolean;
  href: string;
  target?: "_blank" | "_parent" | "_self" | "_top";
  onClick?: (e?: MouseEvent) => void;
  // icon:
};

export type LinkType = "primary" | "success" | "info" | "warning" | "danger";

export type LinkInstance = {
  ref: HTMLAnchorElement;
};
