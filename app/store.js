import { createStore, compose, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

const NODE_ENV = process.env.NODE_ENV || 'production';

const logger = createLogger({
  diff: true,
  level: {
    prevState: () => `info`,
    action: () => `log`,
    nextState: () => `info`,
  },
  colors: {
    prevState: () => `#FFEB3B`,
    action: () => `red`,
    nextState: () => `#4CAF50`,
  },
  duration: true,
  collapsed: true
});

const enhancer = compose(
  NODE_ENV === 'development'
    ? applyMiddleware(thunk, logger)
    : applyMiddleware(thunk)
);

export default function appStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('./reducers', () =>
      store.replaceReducer(require('./reducers').default)
    );
  }

  return store;
}

