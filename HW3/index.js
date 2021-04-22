const { EventEmitter } = require('events');
const fs = require('fs');
const Promise = require('bluebird');
const fetch = require('node-fetch');
const { RSA_NO_PADDING } = require('constants');

fetch.Promise = Promise;

const myEmitter = new EventEmitter();

const url1 = 'https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-continent.json';
const url2 = 'https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-abbreviation.json';
const url3 = 'https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-capital-city.json';

myEmitter.on('1', () => {
    const getData = async () => {
        const ws = fs.createWriteStream(`${__dirname}/data/country-by-continent.json`);
        const response = await fetch(url1);
        response.body.pipe(ws);
        ws.on('close', () => {
            console.log('country-by-continent.json is closed');
        });
    };
    getData();
});

myEmitter.on('2', () => {
    const getData = async () => {
        const ws = fs.createWriteStream(`${__dirname}/data/country-by-abbreviation.json`);
        const response = await fetch(url2);
        response.body.pipe(ws);
        ws.on('close', () => {
            console.log('country-by-abbreviation.json is closed');
        });
    };
    getData();
});
    
myEmitter.on('3', () => {
    const getData = async () => {
        const ws = fs.createWriteStream(`${__dirname}/data/country-by-capital-city.json`);
        const response = await fetch(url3);
        response.body.pipe(ws);
        ws.on('close', () => {
            console.log('country-by-capital-city.json is closed');
        });
    };
    getData();
});

myEmitter.emit('1');
myEmitter.emit('2');
myEmitter.emit('3');

let a = "./country-by-continent.json", b = "./country-by-abbreviation.json", c = "./country-by-capical-city.json";

const rs = fs.createReadStream(a);

rs.on('data', function(chunk) {
    console.log("New Chunk Received");
    console.log(chunk)
});
rs === fs.createReadStream(b);
rs.on('data', function(chunk) {
    console.log("New Chunk Received");
    console.log(chunk)
});
rs === fs.createReadStream(c);
rs.on('data', function(chunk) {
    console.log("New Chunk Received");
    console.log(chunk)
});