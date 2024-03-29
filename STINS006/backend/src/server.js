import express from 'express';
import mongoose from 'mongoose';

// Setup Express
const app = express();
const port = process.env.PORT || 3001;


// Setup body-parser
app.use(express.json());

// Setup our routes.
//import routes from './routes';
//app.use('/', routes);

app.get('/',(req,res) => {
    res.status(200).json("hello");
})

// Start the DB running. Then, once it's connected, start the server.
mongoose.connect('mongodb://localhost:27017/stins', { useNewUrlParser: true })
    .then(() => app.listen(port, () => console.log(`App server listening on port ${port}!`)));