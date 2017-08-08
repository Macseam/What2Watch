'use strict';

import axios from 'axios';
import {
  requestData,
  receiveData,
  receiveError
} from './actionUtils';

const apiUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=8ee6a53f14c123b7f63f0523503a93e4&language=ru&include_adult=false&include_video=false&with_release_type=4|5&sort_by=vote_count.asc';

export function getMoviesList (action) {
  const actionName = 'GET_MOVIES_LIST';
  let finalUrl = apiUrl;
  if (action) {
    for (let key in action) {
      if (action.hasOwnProperty(key)) {
        finalUrl += '&' + key + '=' + action[key];
      }
    }
  }
  return (dispatch) => {
    dispatch(requestData(actionName));
    return axios.get(finalUrl)
      .then((response) => {
        dispatch(receiveData(actionName, response.data));
      }).catch((response) => {
        dispatch(receiveError(actionName, response.data));
      });
  };
}

export function getRandomMovies (action) {
  const actionName = 'GET_RANDOM_MOVIES';
  let finalUrl = apiUrl;
  if (action && action.params) {
    for (let key in action.params) {
      if (action.params.hasOwnProperty(key)) {
        finalUrl += '&' + key + '=' + action.params[key];
      }
    }
  }
  finalUrl += '&page=' + action.randomPage;
  return (dispatch) => {
    dispatch(requestData(actionName));
    return axios.get(finalUrl)
      .then((response) => {
        dispatch(receiveData(actionName, response.data));
      }).catch((response) => {
        dispatch(receiveError(actionName, response.data));
      });
  };
}

export function setGenre (action) {
  const actionName = 'SET_GENRE';
  return (dispatch) => {
    dispatch(receiveData(actionName, action));
  };
}

export function setDate (action) {
  const actionName = 'SET_DATE';
  return (dispatch) => {
    dispatch(receiveData(actionName, action));
  };
}

export function setFame (action) {
  const actionName = 'SET_FAME';
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