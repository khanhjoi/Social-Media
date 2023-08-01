import express from 'express';

import { upload } from '../controllers/Image';

export default (router: express.Router) => {
  router.post('/upload-image', upload);
}