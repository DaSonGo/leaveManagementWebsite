// import fs from 'fs';
import listLoader, { createAndAppendElement } from './listLoader.js';
import JSONFileFetcher from "./JSONFileFetcher.js";

// const existingData = fs.readFileSync('user.json', 'utf8');
const parsedData = JSON.parse(existingData);

export default modalJSONFileAdder;
