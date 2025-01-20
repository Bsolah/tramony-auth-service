import jwt from 'jsonwebtoken';

export const generateToken = (id: string, phone: string) => {
  return jwt.sign({ id, phone }, process.env.JWT_SECRET!, {
    expiresIn: '30d',
  });
};

export const generateCompletedToken = (id: string, phone: string) => {
  return jwt.sign({ id, phone }, process.env.JWT_SECRET!, {
    expiresIn: '30d',
  });
};

export const generateEmailVerificationToken = (id: string, email: string) => {
  return jwt.sign({ id, email }, process.env.JWT_SECRET!, {
    expiresIn: '15m',
  });
};