import express from 'express';
import * as statesDao from '../../database/state-dao';
import mongoose from 'mongoose';

// const HTTP_OK = 200; // Not really needed; this is the default if you don't set something else.
const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;
const HTTP_BAD_REQUEST = 400;

const router = express.Router();

// Retrieve state list, there will be only one state in the states list, so just retreive the list
router.get('/', async (req, res) => {
    res.json(await statesDao.retrieveState());
});

// Create intial state
router.post('/', async (req, res) => {
    if (req.body.state === undefined) {
        res.status(HTTP_BAD_REQUEST)
            .contentType('text/plain').send('Error occured');
        return;
    }
        const newState = await statesDao.createState(req.body.state);
        res.status(HTTP_CREATED)
        .header('location', `/api/states/`)
        .json(newState);
    
});

// Update state
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const state = {
        ...req.body,
        _id: id
    };
    const success = await statesDao.updateState(state);
    res.sendStatus(success ? HTTP_NO_CONTENT : HTTP_NOT_FOUND);
});

export default router;