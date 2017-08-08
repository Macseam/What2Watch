'use strict';

const initialState = {
  genre: null,
  date: null,
  fame: null,
  moviesList: {},
  randomMoviesList: {},
  currentStep: 1,
  loading: false
};

export default function mainState(state = initialState, action) {
  switch (action.type) {

    case 'GET_MOVIES_LIST_REQUEST':
      return { ...state, moviesList: initialState.moviesList, loading: true };
      break;
    case 'GET_MOVIES_LIST_SUCCESS':
      return { ...state, moviesList: action.data, loading: false };
      break;
    case 'GET_MOVIES_LIST_FAILURE':
      return { ...state, moviesList: initialState.moviesList, loading: false };
      break;

    case 'GET_RANDOM_MOVIES_REQUEST':
      return { ...state, randomMoviesList: initialState.randomMoviesList, loading: true };
      break;
    case 'GET_RANDOM_MOVIES_SUCCESS':
      return { ...state, randomMoviesList: action.data, loading: false };
      break;
    case 'GET_RANDOM_MOVIES_FAILURE':
      return { ...state, randomMoviesList: initialState.randomMoviesList, loading: false };
      break;

    case 'SET_GENRE_SUCCESS':
      return { ...state, genre: action.data };
      break;

    case 'SET_DATE_SUCCESS':
      return { ...state, date: action.data };
      break;

    case 'SET_FAME_SUCCESS':
      return { ...state, fame: action.data };
      break;

    case 'SET_NEXT_STEP_SUCCESS':
      return { ...state, currentStep: ++initialState.currentStep };
      break;

    default:
      return state;
  }
}