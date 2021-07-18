import express from 'express';

// Setup Express
const app = express();
const port = process.env.PORT || 3001;

// Setup body-parser
app.use(express.json());

// Setup our routes.
//This is called router, when client send request by url, the url will be /api/states then something ;check routes/index.js; then check routes/api/index.js
// All incoming requests will go to the router called "routes"
import routes from './routes/index.js';
app.use('/', routes);


app.listen(port, () => console.log(`App server listening on port ${port}!`));