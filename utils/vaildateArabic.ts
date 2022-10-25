const validateTextArabic = (text: string) => {
  const regex = /^[\u0600-\u06FF\s]+$/;
  return regex.test(text);
};

export default validateTextArabic;
