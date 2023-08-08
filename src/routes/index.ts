// import external lib
import express from 'express';

// import router
import authentication from './authentication';
import Pins from './Pins';
import image from './image';
import user from './user';

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  Pins(router);
  image(router);
  user(router);
  return router;
};