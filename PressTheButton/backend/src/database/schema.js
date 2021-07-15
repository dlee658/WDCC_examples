import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// State schema with state for button pressed or not. True for pressed, false for unpressed
const stateSchema = new Schema({
    state: Boolean,
}, {
    timestamps: {}
});

const State = mongoose.model('State', stateSchema);

export { State };