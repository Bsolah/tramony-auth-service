const otpExpiryDate = (expiryTime: number) => {
  const expiry = new Date();
  expiry.setMinutes(expiry.getMinutes() + expiryTime);
  return expiry.toISOString();
};

export default otpExpiryDate;
