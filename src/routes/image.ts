import express from 'express';

import { upload,remove } from '../controllers/image';

export default (router: express.Router) => {
  router.post('/upload-image', upload);
  router.delete('/upload-image', remove);
}