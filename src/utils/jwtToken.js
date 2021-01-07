import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { config } from 'dotenv';

config();

export const jwtToken = {
  createToken({
    id, email, name
  }) {
    return jwt.sign({
      id, email, name
    },
    process.env.jwt_secret, { expiresIn: '24h' });
  },
};

export const verifyToken = (token) => {
  const decodedToken = jwt.verify(token, process.env.jwt_secret, {expiresIn: '24h'})
  return decodedToken
}

export const hashPassword = (password) => bcrypt.hashSync(password, 10);

export const comparePassword = (password, hash) => bcrypt.compareSync(password, hash)