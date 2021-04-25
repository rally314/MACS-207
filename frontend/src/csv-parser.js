import fs from "fs";
import { data } from "./data"

export const csvToObjs = () => {
    const lines = data.split('\n');

    const parsedData = []
    for (const line of lines) {
        const cells = line.split(',');
        parsedData.push(cells);
    }

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