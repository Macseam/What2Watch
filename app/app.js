import '../style/common.less';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import AppRoutes from './routes';
import appStore from './store';

const store = appStore();

render(
  <Provider store={store} key="provider">
    <HashRouter>
      <AppRoutes/>
    </HashRouter>
  </Provider>, window.document.getElementById('app')
);