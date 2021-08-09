import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { Grid, Paper } from '@material-ui/core';

import './App.css';
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
        <Paper variant="outlined" square style={{width: '400px', margin: '50px'}}>
          <AppRoutes />
        </Paper>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
