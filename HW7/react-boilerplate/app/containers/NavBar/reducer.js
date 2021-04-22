/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { TOKEN_RECD } from './constants';

// The initial state of the App
export const initialState = {
  token: '',
};

/* eslint-disable default-case, no-param-reassign */
const navBarReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case TOKEN_RECD:
        // Delete prefixed '@' from the github username
        draft.token = action.token;
        break;
    }
  });

export default navBarReducer;
