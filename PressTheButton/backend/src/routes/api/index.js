import express from 'express';

const router = express.Router();

import states from './states-routes';
router.use('/states', states);

export default router;