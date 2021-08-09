import React from 'react';
import { Switch, useRouteMatch } from 'react-router-dom';
import ErrorBoundaryRoute from '../../shared/error/error-boundary-route';
import MenuCurrent from './current';
import Menu from './menu';

const Routes = () => {
  const { url } = useRouteMatch();
  return (  
    <Switch>
      <ErrorBoundaryRoute exact path={`${url}/current`} component={MenuCurrent} />
      <ErrorBoundaryRoute exact path={`${url}/new`} component={Menu} />
    </Switch>
  );
}

export default Routes;
