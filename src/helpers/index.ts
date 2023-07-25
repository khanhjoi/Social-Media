import crypto from 'crypto';

const SECRET = process.env.SECRET || "";
export const random = () => {
 return crypto.randomBytes(128).toString('base64');
}

export const authentication = (salt: string | undefined, password: string) => {
  return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET).digest('hex');
}