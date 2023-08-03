import express from 'express';

import { PinModel, getPins, createPinModel } from '../models/Pin';

export const createPin = async (req: express.Request, res: express.Response) => {
  try {
    const {title, about, destination, imageAsset, category, userId, postedBy} = req.body;
    
    
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
      postedBy
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
