import express from 'express';
import { getAllPin, createPin, getPin, addComment } from '../controllers/pin';

export default(router: express.Router) => {
  router.get('/pins', getAllPin);
  router.get('/pin/:id', getPin);
  router.post('/pin/:id', addComment);
  router.post('/pins', getAllPin);
  router.post('/createPin', createPin);
}