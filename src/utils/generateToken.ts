import jwt from 'jsonwebtoken';

export const generateToken = (id: string, email: string) => {
  return jwt.sign({ id, email }, process.env.JWT_SECRET!, {
    expiresIn: '30d',
  });
};

export const generateTokenWith2FA = (
  id: string,
  email: string,
  twoFA: boolean,
) => {
  return jwt.sign({ id, email, twoFA }, process.env.JWT_SECRET!, {
    expiresIn: '30d',
  });
};
