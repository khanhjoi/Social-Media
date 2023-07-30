import crypto from 'crypto';
import { OAuth2Client } from 'google-auth-library';

const SECRET = process.env.SECRET || "";
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

export const random = () => {
 return crypto.randomBytes(128).toString('base64');
}

export const authentication = (salt: string | undefined, password: string) => {
  return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET).digest('hex');
}


export const verifyGoogleToken = async (token: string) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });
    return { payload: ticket.getPayload() };
  } catch (error) {
    return { error: "Invalid user detected. Please try again" };
  }
};