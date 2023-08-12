import express from 'express';
import { getAllPin, createPin, getPin, addComment, addSave, search, deletePin, updatePin } from '../controllers/pin';

export default(router: express.Router) => {
  router.get('/pins', getAllPin);
  router.get('/pin/:id', getPin);
  router.get('/pins/:search', search);
  router.patch('/pin/save', addSave);
  router.post('/pin/:id', addComment);
  router.post('/pins', getAllPin);
  router.post('/createPin', createPin);
  router.put('/pin/update', updatePin);
  router.delete('/deletePin', deletePin);
}