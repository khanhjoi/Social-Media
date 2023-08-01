// import external lib
import express from 'express';

// import router
import authentication from './authentication';
import Pins from './Pins';
import image from './Image';

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  image(router);
  Pins(router);
  return router;
};