import express from 'express';

import { PinModel, getPins } from '../models/Pin';



export const createPin =async (req: express.Request, res: express.Response) => {
  
}

export const getAllPin = async (req: express.Request, res: express.Response) => {
  try {
    const pins = getPins();
    if(!pins) {
      return res.status(400).json({ message: "Something wrong!!"})
    }
    return res.status(200).json(pins);
  } catch (error) {
    return res.status(400).json(error)
  }
}
