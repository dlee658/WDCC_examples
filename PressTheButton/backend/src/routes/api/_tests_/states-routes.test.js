import routes from '../states-routes';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import express from 'express';
import axios from 'axios';
import { State } from '../../../database/schema';
import connectToDatabase from '../../../database/db-connect';
let mongod, app, server;

// Some dummy data to test with
const stateFalse = {
    _id: new mongoose.mongo.ObjectId('000000000000000000000002'),
    state: false
};

const stateTrue = {
    _id: new mongoose.mongo.ObjectId('000000000000000000000003'),
    state: true
};


const dummyStates = [stateFalse, stateTrue];

// Start database and server before any tests run
beforeAll(async done => {
    mongod = new MongoMemoryServer();
    
    await mongod.getUri()
    .then(cs => connectToDatabase(cs));
    app = express();
    app.use(express.json());
    app.use('/api/states', routes);
    server = app.listen(3000, done);
});

// Populate database with dummy data before each test
beforeEach(async () => {
    await State.insertMany(dummyStates);
});

// Clear database after each test
afterEach(async () => {
    await State.deleteMany({});
});

// Stop db and server before we finish
afterAll(done => {
    server.close(async () => {
        await mongoose.disconnect();
        await mongod.stop();
        done();
    });
});

//check retrieving states working 
it('retrieves all states successfully', async () => {
    const response = await axios.get('http://localhost:3000/api/states');
    expect(response.status).toBe(200);
    const responseStates = response.data;
    expect(responseStates.length).toBe(2);

    for (let i = 0; i < responseStates.length; i++) {
        const responseState = responseStates[i];
        const expectedState = dummyStates[i];
        expect(responseState._id.toString()).toEqual(expectedState._id.toString());
        expect(responseState.state).toEqual(expectedState.state);
    }
});

//check if create state is working
it('Creates a new state', async () => {
    const newState = {
        state: true
    }
    const response = await axios.post('http://localhost:3000/api/states', newState);

    // Check response is as expected
    expect(response.status).toBe(201);
    expect(response.data).toBeDefined();
    const rState = response.data;
    expect(rState.state).toBe(true);


    // Check that the state was actually added to the database
    const dbState = await State.findById(rState._id);
    expect(dbState.state).toBe(true);
});

//check if gives correct error message
it('Gives a 400 when trying to create a state with no state', async () => {
    try {
    const newState = undefined;
    await axios.post('http://localhost:3000/api/states',newState);
    fail('Should have thrown an exception.');
    } catch (err) {

    // Ensure response is as expected
    const { response } = err;
    expect(response).toBeDefined();
    expect(response.status).toBe(400);

    // Ensure DB wasn't modified
    expect(await State.countDocuments()).toBe(2);
    }
});

//check if update state to false working
it('updates a state to false successfully', async () => {

    const toUpdateFalse = {
        _id: new mongoose.mongo.ObjectId('000000000000000000000003'),    
        state: false,
    }

    const response = await axios.put('http://localhost:3000/api/states/000000000000000000000003', toUpdateFalse);

    // Check response
    expect(response.status).toBe(204);

    // Ensure DB was updated
    const dbState = await State.findById('000000000000000000000003');
    expect(dbState.state).toBe(false);
});

//check if update state to true working
it('updates a state to true successfully', async () => {

    const toUpdateFalse = {
        _id: new mongoose.mongo.ObjectId('000000000000000000000002'),    
        state: true,
    }

    const response = await axios.put('http://localhost:3000/api/states/000000000000000000000002', toUpdateFalse);

    // Check response
    expect(response.status).toBe(204);

    // Ensure DB was updated
    const dbState = await State.findById('000000000000000000000002');
    expect(dbState.state).toBe(true);
});

//check if gives correct error message
it('Gives a 404 when updating a nonexistant state', async () => {

    try {
        const toUpdate = {
            _id: new mongoose.mongo.ObjectId('000000000000000000000010'),
            state: false
        }
        await axios.put('http://localhost:3000/api/states/000000000000000000000010', toUpdate);
        fail('Should have returned a 404');
    } catch (err) {
        const { response } = err;
        expect(response).toBeDefined();
        expect(response.status).toBe(404);
        // Make sure something wasn't added to the db
        expect(await State.countDocuments()).toBe(2);
    }
})
