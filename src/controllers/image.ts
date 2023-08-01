import express from 'express';

import cloudinary from '../helpers/upload';

export const upload =async (req:express.Request, res:express.Response) => {
  try {
    const { image } = req.body;
    const uploadResponse = await cloudinary.uploader.upload(image,{
      upload_preset: 'Sosial Media'
    })
    
    if(uploadResponse) {
      return res.status(200).json({ 
        asset_id: uploadResponse.asset_id,
        url: uploadResponse.url
      })
    }else {
      return res.status(400).json({ message: "Upload image false"})
    }

  } catch (error) {
   return res.status(400).json(error);
  }
};
