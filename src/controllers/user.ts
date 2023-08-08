import express from 'express';

import { getUserByEmail, getUserById } from '../models/Users';

export const getUser = async (req:express.Request, res: express.Response) => {
  try {
    
    const userId = req.params['id'];

    const checkMail = userId.indexOf("@");
    var user = null
    if(checkMail) {
       user = await getUserByEmail(userId);
    }else {
       user = await getUserById(userId);
    }

    if(!user) {
      return res.status(400).json({error: "can't get User"});
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json(error);
  }
}