import express from 'express';

import { getUser } from '../controllers/user';

export default(router: express.Router) => {
  router.get('/user/:type/:id', getUser)
}