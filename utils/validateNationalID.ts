export const validateNationalID = (nationalID: string) => {
  const regex = /^[0-9]{14}$/;
  return regex.test(nationalID);
};

// todo: this one is to validate national numbers