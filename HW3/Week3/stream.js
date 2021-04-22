// all on https://nodejs.org/dist/latest-v14.x/docs/api/stream.html#-api-for-stream-consumers

const http = require('http');
const server = http.createServer((req, res) => {
    // req is an http.IncommingMessage, which is a readable stream
    // res is an http.ServerResponse, which is a writable stream
    let body = '';
    // get the data as utf* strings
    // If an encoding is not set, buffer objects will be received
    req.setEncoding('utf8');
    // Readable streams emit 'data' events once a listener is added
    req.on('data', (chunk) => {
        body += chunk;
    });
    // The 'end' event indicates that the entire body has been received
    req.on('end', () => {
        try {
            const data = JSON.parse(body);
            // Write back something interesting to the user:
            res.write(`${typeof data}\n`);
            res.end();
        }catch(err) {
            // uh oh! bad json!!
            res.statusCode = 400;
            return res.end(`error: ${err.message}`);
        };
    });

});