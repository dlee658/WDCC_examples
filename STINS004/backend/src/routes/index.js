import express from 'express';
import api from './api/index.js';

const router = express.Router();

// all incoming requests with "localhost:3001/api" will go to "api" router 
router.use('/api', api);

export default router;