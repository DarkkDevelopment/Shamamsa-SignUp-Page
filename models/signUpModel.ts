export type SignUpModel = {
  code: number | null;
  status: string;
  mobileNumber: string;
  email: string;
  fixedData: fixedData;
  learningAndStatus: learningAndStatus;
  address: address;
  spritualData: spirtualData;
  ShammasData?: ShammasData;
};

export type fixedData = {
  nationalId: string;
  firstName: string;
  secondName: string;
  thirdName: string;
  fourthName: string;
  dob: string | Date;
  gender: number;
};

export type learningAndStatus = {
  mar7la: number;
  sana: number;
};

export type address = {
  apartmentNumber: number;
  buildingNumber: number;
  streetName: string;
  mohafza: number;
  manteqa: number;
  country: number;
  landmark?: string;
};

export type spirtualData = {
  abE3trafChurchId: number;
  abE3trafName: string;
  abE3trafMobile: string;
  abElosraChurchId: number;
  abElosraName: string;
  abElosraMobile: string;
};

export type ShammasData = {
  studentRotbaShamasyalId: number;
  oskofElResamaId: number;
  resamaYear: number;
  studentResamaChuruchId: number;
};
