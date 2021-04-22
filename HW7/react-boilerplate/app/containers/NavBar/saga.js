import { call, put, select, takeLatest, takeLeading } from 'redux-saga/effects';
import { GET_TOKEN } from './constants';

import request from 'utils/request';
import { tokenReceived } from './actions';

const head_request = async(url) => {
  const response = await fetch(url, {
    method: 'HEAD', // *GET, POST, PUT, DELETE, etc.
    mode: 'same-origin', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow', // manual, *follow, error
    refferrerPolicy: 'no-referreer', // *no-referrer, no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-
  });
  if (response.status >= 200 && responses.status < 300) {
    if (response.status === 204 || response.status === 205) {
      return null;
    }
    return response;
  }
}

export function* getTokenGen() {
  const requestURL = `http//localhost:3000/get_CSRF_TOKEN`;
  console.log('getTokenGen: ', requestURL)

  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(head_request, requestURL, { credentials: "include",});
    const token = response.headers.get('x-csrf-token')
    console.log(`getTokenGen: ${token}`)
    yield put(tokenReceived(token));
  } catch (err) {
    console.log(`getTokenGenError: ${err}`)
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* getTokenReq() {
  // yield takeLatest(GET_TOKEN, getTokenGen);
  yield takeLeading(GET_TOKEN, getTokenGen);
}
