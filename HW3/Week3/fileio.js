

const fs = require('fs');

const ws = fs.createWriteStream(`${__dirname}/test.json`);
const obj = {'class': 'csc441', 'term': 'spring2021'};

ws.write(JSON.stringify(obj));
ws.end();

const rs = fs.createReadStream(`${__dirname}/test.json`);

let body = '';
rs.on('data', (str) => body += str);
rs.on('close', () => {
    console.log('body:', body);
    let o = JSON.parse(body);
    Object.keys(o).forEach((key, i) => {
        console.log(key, o[key]);
    });
});