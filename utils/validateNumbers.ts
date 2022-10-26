export const validateNumbers = (numbers: string) => {
  const regex = /^[0-9]+$/;
  return regex.test(numbers);
};
