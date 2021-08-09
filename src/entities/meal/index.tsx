import React from 'react';
import { Switch, useRouteMatch } from 'react-router-dom';
import ErrorBoundaryRoute from '../../shared/error/error-boundary-route';
import MealList from './meal-list';
import Meal from './meal';

const Routes = () => {
  const { url } = useRouteMatch();
  return (  
    <Switch>
      <ErrorBoundaryRoute exact path={`${url}/new`} component={Meal} />
      <ErrorBoundaryRoute path={url} component={MealList} />
    </Switch>
  );
}

export default Routes;
