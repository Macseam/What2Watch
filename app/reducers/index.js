import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import mainState from './mainReducer';

// main reducers
const rootReducer = combineReducers({
  routerReducer,
  mainState
});

export default rootReducer;
