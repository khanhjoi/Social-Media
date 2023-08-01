import express from 'express';
import { getAllPin } from '../controllers/pin';

export default(router: express.Router) => {
  router.get('/pins', getAllPin);
}