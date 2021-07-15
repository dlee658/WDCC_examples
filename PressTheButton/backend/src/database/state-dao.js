/**
 * This file contains functions which interact with MongoDB, via mongoose, to perform State-related
 * CRUD operations.
 */

 import { State } from "./schema";
 
//create state
async function createState(state) {
     const dbState = new State({state: state});
     await dbState.save();
     return dbState;
 }
 
 //retreieving state
async function retrieveState() {
     return await State.find();
 }
 
 //update state
async function updateState(state) {
     const result = await State.findByIdAndUpdate(state._id, state, { new: true, useFindAndModify: false });
     return result ? true : false;
 }
 
 //delete state
async function deleteState(id) {
     await State.deleteOne({ _id: id });
 }

 export {
    createState,
    retrieveState,
    updateState,
    deleteState
}