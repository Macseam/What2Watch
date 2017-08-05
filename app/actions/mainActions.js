'use strict';

import {
  requestData,
  receiveData,
  receiveError
} from './actionUtils';

export function setGenre (action) {
  const actionName = 'SET_GENRE';
  return (dispatch) => {
    dispatch(receiveData(actionName, action));
  };
}

export function setNextStep (action) {
  const actionName = 'SET_NEXT_STEP';
  return (dispatch) => {
    dispatch(receiveData(actionName, action));
  };
}