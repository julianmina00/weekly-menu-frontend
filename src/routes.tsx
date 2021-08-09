import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from './shared/error/error-boundary-route';
import PageNotFound from './shared/error/page-not-found';
import Entities from './entities';
import MenuCurrent from './entities/menu/current';


const Routes = () => (
  <div>
    <Switch>
      <ErrorBoundaryRoute path="/" exact component={MenuCurrent} />
      <ErrorBoundaryRoute path="/" component={Entities} />
      <ErrorBoundaryRoute component={PageNotFound} />
    </Switch>
  </div>
);

export default Routes;
