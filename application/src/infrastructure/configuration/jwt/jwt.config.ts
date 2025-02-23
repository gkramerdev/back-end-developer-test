import jwt from 'jsonwebtoken';

const JWT_SECRET = 'secrectkey';
const JWT_EXPIRATION = '1h';

export const generateToken = (userId: string) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Token inválido');
  }
};
