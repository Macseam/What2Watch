'use strict';

const initialState = {
  genre: null,
  currentStep: 1
};

export default function mainState(state = initialState, action) {
  switch (action.type) {

    case 'SET_GENRE_SUCCESS':
      return { ...state, genre: action.data };
      break;

    case 'SET_NEXT_STEP_SUCCESS':
      return { ...state, currentStep: ++initialState.currentStep };
      break;

    default:
      return state;
  }
}