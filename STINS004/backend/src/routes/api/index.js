import express from 'express';
import states from './states-routes.js';

const router = express.Router();

// all incoming requests with "localhost:3001/api/states" will go to "states" router 
router.use('/states', states);

export default router;