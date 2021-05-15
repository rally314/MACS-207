import fs from "fs";
import { data } from "./data"

/**
 * Given the input data set as a CSV file, parse it into an array of JS objects
 * @returns Array of JS objects
 */
export const csvToObjs = () => {
    const lines = data.split('\n');

    // Get each row
    const parsedData = []
    for (const line of lines) {
        const cells = line.split(',');
        parsedData.push(cells);
    }

    // For each line, parse each column
    const dataObjs = []
    for (let i = 1; i < parsedData.length; i++) {
        const dataObj = {}
        dataObj['Film'] = parsedData[i][0];
        dataObj['Director'] = parsedData[i][1];
        dataObj['CastMember'] = parsedData[i][2];
        dataObjs.push(dataObj)
    }

    console.log(dataObjs)
    return dataObjs
}