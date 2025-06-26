export interface DialogProps {
  visible: boolean;
  title?: string;
  draggable?: boolean;
  center: boolean;
}

export interface DialogEmits {
  (e: "visible-change", value: boolean): void;
  (e: "confirm"): void;
  (e: "cancel"): void;
}
