import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { Button, Grid } from '@material-ui/core';

import './App.css';
import Menu from './entities/menu/menu';
import ErrorBoundary from './shared/error/error-boundary';
import AppRoutes from './routes';

function App() {
  const buttons = () => {
    return (
      <div>
        <Grid container spacing={3} style={{padding: "40px"}}>
          <Grid item xs={12}>
            <Link to="/menu/view/create">Crear Menu</Link>
          </Grid>
          <Grid item xs={12}>
            <Link to="/menu/view/current">Ver menu</Link>
          </Grid>        
        </Grid>
      </div>
    );
  }

  return (
    <Router>
      <ErrorBoundary>
        {buttons()}
        <AppRoutes />
      </ErrorBoundary>
    </Router>
  );
}

export default App;
