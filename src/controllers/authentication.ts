import express from 'express';
import { getUserByEmail, createUser, getUserByIdAndUpdate } from '../models/Users';
import { authentication, random, verifyGoogleToken } from '../helpers';

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const {email, password} = req.body;
    if(!email || !password) {
     return res.status(400).json({error: "Lack of information!"});
    }

    const user = await getUserByEmail(email).select('+authentication.salt +authentication.password').exec();
    
    if(user != undefined) {
      
      const expectedHash = authentication(user?.authentication?.salt, password);
  
      if(user?.authentication?.password !== expectedHash) {
        return res.status(403).json({message: "Password is incorrect"})
      } 

      const salt = random();
      
      if(user.authentication) {
        user.authentication.sessionToken = authentication(salt, user._id.toString());
        await getUserByIdAndUpdate(user);  
        res.cookie('USER-AUTH', user.authentication.sessionToken);
      }
      
    } else {
      return res.status(400).json({message: "unregistered user, Please register!"});
    }
    return res.status(200).json({user: user});
  } catch (error) {
    return res.sendStatus(400);
  }
}

export const loginGoogle = async (req:express.Request, res: express.Response) => {
  try {
    if(req.body.credential) {

      const verificationResponse = await verifyGoogleToken(req.body.credential);

      if (verificationResponse.error) {
        return res.status(400).json({
          message: verificationResponse.error,
        });
      }

      const profile = verificationResponse?.payload;

      res.status(201).json({
        message: "Signup was successful",
        user: {
          firstName: profile?.given_name,
          lastName: profile?.family_name,
          picture: profile?.picture,
          email: profile?.email,
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "An error occurred. Registration failed.",
    });
  }
}

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const {  email, username, password, image } = req.body;

    
    if(!username || !password) {
      return res.status(400).json({error: "Username Or Password can't empty"});
    }
    
    const exitingUser = await getUserByEmail(email);

    if(exitingUser) {
      return res.status(400).json({error: "Email had exit!!!"});
    }
    

    const salt = random();
    const user = await createUser({
      email,
      username,
      image: image ? image : "https://res.cloudinary.com/dxkokmfiu/image/upload/v1691221086/Sosial%20Media/wkxjlekeuq2y2cvejvtr.jpg",
      authentication: {
        salt,
        password: authentication(salt, password)
      }
    })

    return res.status(200).json({ message: "register success"});
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}

