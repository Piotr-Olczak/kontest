export interface AntStatusesShape {
  [key: string]: AntStatusShape;
}

export interface AntStatusShape {
  type: 'success' | 'info' | 'warning' | 'error' | undefined;
  message: string;
}
