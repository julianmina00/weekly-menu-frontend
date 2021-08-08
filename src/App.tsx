import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Button, Grid } from '@material-ui/core';

import Menu from './entities/menu/menu';
import './App.css';

function App() {
  const [showCreate, setShowCreate] = React.useState(false);
  
  const createToggle = () => {
    setShowCreate(!showCreate);
  };

  return (
    <Router>
      <div>
        {showCreate ? (
          <Menu />
        ) : (        
          <div>
            <Grid container spacing={3} style={{padding: "40px"}}>
              <Grid item xs={12}>
                <Button variant="outlined" color="primary" onClick={createToggle}>Crear Menu</Button>
              </Grid>
              <Grid item xs={12}>
                <Button variant="outlined" color="primary">Ver Menu</Button>
              </Grid>        
            </Grid>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
