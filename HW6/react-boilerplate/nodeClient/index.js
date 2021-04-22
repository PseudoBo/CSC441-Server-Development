const fetch = require('node-fetch')

async function postData(url = '', data = {}) {
    // Default options are marked with *
    try {
      const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      });
      const result = await response.json(); // parses JSON response into native JavaScript objects
      return result;
    } catch (e) {
      console.log('postData:Exception: ', e)
    }
  }

const result = postData('http://localhost:3000/signup', {username: 'murali', password: 'tmp123'})
const result = postData('http://localhost:3000/signup', {username: 'murali', password: 'tmp123'})
const result = postData('http://localhost:3000/signup', {username: 'murali', password: 'tmp123'})
const result = postData('http://localhost:3000/signup', {username: 'murali', password: 'tmp123'})
const result = postData('http://localhost:3000/signup', {username: 'murali', password: 'tmp123'})
const result = postData('http://localhost:3000/signup', {username: 'murali', password: 'tmp123'})
const result = postData('http://localhost:3000/signup', {username: 'murali', password: 'tmp123'})
const result = postData('http://localhost:3000/signup', {username: 'murali', password: 'tmp123'})
