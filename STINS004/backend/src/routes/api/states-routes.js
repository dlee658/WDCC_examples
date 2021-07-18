import express from 'express';

const HTTP_OK = 200;
const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;
const HTTP_BAD_REQUEST = 400;

const router = express.Router();

// GET localhost:3001/api/states/
router.get('/', (req,res) => {
    res.status(200).json('localhost:3001/api/states - Hello World!');
})

export default router;