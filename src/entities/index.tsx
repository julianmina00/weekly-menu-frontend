import React from 'react';
import { Switch, useRouteMatch } from 'react-router-dom';
import ErrorBoundaryRoute from '../shared/error/error-boundary-route';
import Meal from './meal';
import Menu from './menu';

const Routes = () => {
  const { url } = useRouteMatch();
  return (
    <Switch>
      <ErrorBoundaryRoute path={`${url}meal`} component={Meal} />
      <ErrorBoundaryRoute path={`${url}menu`} component={Menu} />
    </Switch>
  );
}

export default Routes;
