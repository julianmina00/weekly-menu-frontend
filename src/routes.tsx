import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from './shared/error/error-boundary-route';
import PageNotFound from './shared/error/page-not-found';
import Menu from './entities/menu/menu';

const Routes = () => (
  <div>
    <Switch>
      <ErrorBoundaryRoute path="/menu/create" component={Menu} />
      <ErrorBoundaryRoute path="/menu/view/current" component={Menu} />
      <ErrorBoundaryRoute component={PageNotFound} />
    </Switch>
  </div>
);

export default Routes;
