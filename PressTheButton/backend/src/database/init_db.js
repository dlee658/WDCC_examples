import mongoose from 'mongoose';
import { State } from './schema';
import { dummyStates } from './dummy-states';

main();

async function main() {
    await mongoose.connect('mongodb://localhost:27017/pressthebutton', {
        useNewUrlParser: true
    });
    console.log('Connected to database!');
    console.log();

    //clear database
    await clearDatabase();
    console.log();

    await addState();
    console.log();

    // Disconnect when complete
    await mongoose.disconnect();
    console.log('Disconnected from database!');
}

async function clearDatabase() {
    const result = await State.deleteMany({});
    console.log(`Cleared database (removed ${result.deletedCount} states).`);
}

async function addState() {
    // add state
    await createState(dummyStates[0]);
    console.log(`Added states to the database.`);

}