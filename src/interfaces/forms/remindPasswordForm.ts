export interface RemindPasswordFormPropsShape {
  requestSentStatus: boolean;
  changeRequestStatus: (value: boolean) => void;
}

export interface remindPasswordFormValuesShape {
  email: string;
}
