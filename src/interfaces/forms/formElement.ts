export type ValidationStatusShape =
  | 'not-validated'
  | 'valid'
  | 'invalid'
  | undefined;

export interface FormElementShape {
  extraClasses?: string;
  children?: any;
  validationStatus?: ValidationStatusShape;
  validationMessage?: string;
}
