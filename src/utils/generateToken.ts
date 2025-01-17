import jwt from 'jsonwebtoken';

export const generateToken = (id: string, phone: string) => {
  return jwt.sign({ id, phone, compleeted: false }, process.env.JWT_SECRET!, {
    expiresIn: '30d',
  });
};

export const generateCompletedToken = (id: string, phone: string) => {
  return jwt.sign({ id, phone, compleeted: true }, process.env.JWT_SECRET!, {
    expiresIn: '30d',
  });
};