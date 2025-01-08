const generateRandomNumber = (length: number) => {
  const number = Math.floor(Math.random() * Math.pow(10, length));
  if (number.toString().length === length) {
    return number;
  } else {
    return generateRandomNumber(length);
  }
};

export default generateRandomNumber;
