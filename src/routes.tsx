import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from './shared/error/error-boundary-route';
import PageNotFound from './shared/error/page-not-found';
import Menu from './entities/menu/menu';
import MenuCurrent from './entities/menu/current';

const Routes = () => (
  <div>
    <Switch>
      <ErrorBoundaryRoute path="/menu/view/create" component={Menu} />
      <ErrorBoundaryRoute path="/menu/view/current" component={Menu} />
      <ErrorBoundaryRoute path="/" component={MenuCurrent} />
      <ErrorBoundaryRoute component={PageNotFound} />
    </Switch>
  </div>
);

export default Routes;
