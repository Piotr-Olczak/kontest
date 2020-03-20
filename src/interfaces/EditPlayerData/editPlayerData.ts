export interface EditBasicDataInitialValuesShape {
  bankAccountNumber: string;
  city: string;
  country?: string;
  dateOfBirth?: string;
  birthYear?: string;
  birthMonth?: string;
  birthDay?: string;
  email?: string;
  firstName?: string;
  flatNr?: string;
  houseNr: string;
  idDocumentNumber?: string;
  lastName?: string;
  nationality?: string;
  pesel?: string;
  phoneNumber: string;
  postalCode: string;
  street: string;
}

export interface EditBasicDataFormShape {
  initialValues: EditBasicDataInitialValuesShape;
}

export interface PlayerChangeBasicDataByPlayer {
  newBasicData: EditBasicDataInitialValuesShape;
  password: string;
}
