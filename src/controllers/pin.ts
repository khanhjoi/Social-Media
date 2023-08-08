import express from 'express';

import { savePin, removeSavePin, getPins, createPinModel, getPinById, uploadComment } from '../models/Pin';
import { saveUser, removeSaveUser, getUserById, getUserByEmail } from '../models/Users';

export const createPin = async (req: express.Request, res: express.Response) => {
  try {
    const {title, about, destination, imageAsset, category, userId, postedBy, userImg} = req.body;
    
    
    if(!imageAsset) {
      return res.status(400).json({ message: "Pin must have a Image!!!"});
    }
    
    if(!title || !category) {
      return res.status(400).json({ message: "lack of title or category"});
    }
    
    const pin = await createPinModel({
      title,
      about,
      destination,
      category,
      image: imageAsset,
      userId,
      postedBy,
      userImg
    });
    
    if(!pin) {
      return res.status(400).json({ message: "Something Wrong!!"})
    }

    return res.status(200).json(pin);

  } catch (error) {
    return res.status(400).json(error);
  }
}

export const getAllPin = async (req: express.Request, res: express.Response) => {
  try {
    const { categoryId } = req.body;
    const pins = await getPins(categoryId);

    if(!pins) {
      return res.status(400).json({ message: "Something wrong!!"})
    }
    
    return res.status(200).json(pins);
  } catch (error) {
    return res.status(400).json(error)
  }
}

export const getPin = async (req: express.Request, res: express.Response) => {
  try {
    
    const pinId = req.params['id'];

    const pin = await getPinById(pinId);

    if(!pin) {
      return res.status(400).json({ messsage: "Not found!!"})
    }

    return res.status(200).json(pin)

  } catch (error) {
    return res.status(400).json(error);
  }
}

export const addComment = async (req:express.Request, res: express.Response) => {
  try {
    const pinId = req.params['id'];
    
    const { comment } = req.body;

    const userComment = await uploadComment(pinId, comment);

    if(!userComment) {
      return res.status(400).json({message: "comment error!!!"});
    }

    return res.status(200).json(userComment);

  } catch (error) {
    return res.status(400).json(error);
  }
}

export const addSave = async (req:express.Request, res: express.Response) => {
  try {
    const {idUser, idPin} = req.body;

    if(!idUser || !idPin) {
      return res.status(400).json({error: "some thing wrong!!"})
    }

    const checkIdUser: boolean = idUser.includes("@");
    let user;
    let result = null;
    let alreadySaved: boolean = false;
    // get user to check
    if(checkIdUser) {
      user = await getUserByEmail(idUser);  
    }else {
      user = await getUserById(idUser);
    }

    // search pin in user field
    let index = -1;
    user?.Save.forEach((pin, i) => {
      if(pin === idPin) {
        index = i;
      }
    })

    // push or remove pin 
    if(index !== -1) {
      result = await removeSaveUser(idUser, idPin);
      alreadySaved = false;
      await removeSavePin(idPin, idUser);
    }else {
      result = await saveUser(idUser, idPin);
      alreadySaved = true;
      await savePin(idPin, idUser);
    }

    return res.status(200).json({result, alreadySaved});
  } catch (error) {
    return res.status(400).json(error);
  }
}