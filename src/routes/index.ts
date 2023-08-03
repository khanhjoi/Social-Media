// import external lib
import express from 'express';

// import router
import authentication from './authentication';
import Pins from './Pins';
import image from './image';

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  Pins(router);
  image(router);
  return router;
};