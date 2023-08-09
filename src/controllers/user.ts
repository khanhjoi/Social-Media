import express from 'express';

import { getUserByEmail, getUserById } from '../models/Users';
import { findPinsSaveByIds, findPinsCreateById } from '../models/Pin';

export const getUser = async (req:express.Request, res: express.Response) => {
  try {
    
    const userId = req.params['id'];
    const type = req.params['type'];
    const checkMail = userId.indexOf("@");

    let user = null;
    let pins ;
    if(checkMail !== -1) {
       user = await getUserByEmail(userId);
    }else {
       user = await getUserById(userId);
    }

    if(!user) {
      return res.status(400).json({error: "can't get User"});
    }

    if(type === 'created') {
      pins = await findPinsCreateById(user._id.toString());
    } else {
      if(user?.Save.length > 0 ) {
        pins = await findPinsSaveByIds(user.Save);
       }   
    }  
    return res.status(200).json({user, pins: pins });
  } catch (error) {
    return res.status(400).json(error);
  }
}