'use strict';
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import AppContainer from './containers/appContainer';

const AppRoutes = () => {
  return (
    <Switch>
      <Route exact path='/' component={AppContainer}/>
    </Switch>
  );
};

export default AppRoutes;