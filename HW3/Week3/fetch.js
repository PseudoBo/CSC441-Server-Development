const Promise = require('bluebird');
const fetch = require('node-fetch');
const fs = require('fs');

fetch.Promise = Promise;

const url = 'https//raw.githubusercontent.com/samayo/country-json/master/src/country-by-continent.json';

const main = async () => {
    const response = await fetch(url);
    // let str = '';
    // response.body.on('data', d => str += d);
    // response.body.on('end', () => {
        // console.log(str);
    const ws = fs.createWriteStream(`${__dirname}/test.json`);
        // ws.write(str);
        // ws.end();
    const response = await fetch(url);

    response.body.pipe(ws);
    // console.log(response.body);
    ws.on('close', () => {
            console.log('test.json is closed');
    });
};