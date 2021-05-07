/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectNavBar = state => state.navbar || initialState;

const makeSelectTokenReceived = () =>
  createSelector(
    selectNavBar,
    navBarState => navBarState.token,
  );

export { selectNavBar, makeSelectTokenReceived };
