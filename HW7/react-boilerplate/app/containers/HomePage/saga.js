/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest, takeLeading } from 'redux-saga/effects';
import { SUBMIT_USER_CREDS } from './constants';
import { makeSelectUsername, makeSelectPassword } from './selectors';
import {makeSelectTokenReceived } from 'containers/NavBar/selectors';

const post_request = async(url, data, token) => {
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'same-origin', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': token
    },
    redirect: 'follow', // manual, *follow, error
    refferrerPolicy: 'no-referreer', // *no-referrer, no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-
    body: JSON.stringify(data), // body data type must match "Content-Type" header
    credentials: "include",
  });
  if (response.status >= 200 && responses.status < 300) {
    if (response.status === 204 || response.status === 205) {
      return null;
    }
    return response.json();
  }
}

export function* submitUserCredsGen() {
  // Select username from store
  console.log('in submitUserCredsGen')
  const username = yield select(makeSelectUsername());
  const password = yield select(makeSelectPassword());
  const token = yield select(makeSelectTokenReceived());
  const requestURL = `http://localhost:3000/signin`;
  console.log('username: ', username)
  console.log('password: ', password)
  console.log('token: ', token)
  try {
    // Call our request helper (see 'utils/request')
    const result = yield call(post_request, requestURL, {username, password}, token);
    console.log(`result: ${JSON.stringify(result)}`)
  } catch (err) {
    console.log(`submitUserCredsGenError: ${err}`)
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* githubData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLeading(SUBMIT_USER_CREDS, submitUserCredsGen);
}
