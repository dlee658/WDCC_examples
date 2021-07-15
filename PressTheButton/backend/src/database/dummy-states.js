import dummyjson from 'dummy-json';
import fs from 'fs';

const myHelpers = false;

const template = fs.readFileSync('./src/database/states-template.hbs', { encoding: 'utf-8' });
const statesJson = dummyjson.parse(template, { helpers: myHelpers });
const dummyStates = JSON.parse(statesJson);

export { dummyStates };