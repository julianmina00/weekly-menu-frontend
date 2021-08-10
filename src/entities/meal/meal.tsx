import React from 'react';
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { TextField, Button, Grid } from '@material-ui/core';

import { addMeal } from './meal.reducer'

export type IMealProps = DispatchProps;

const Meal = (props: IMealProps) => {
  const [name, setName] = React.useState('');
  const [chef, setChef] = React.useState('');
  const history = useHistory();

  const handleClose = () => {
    setName('');
    setChef('');
    history.push('/menu/new');
  };

  const saveMeal = () => {
    const meal = {
      id: uuid(),
      name,
      chef
    };
    props.addMeal(meal);
    handleClose();
  }

  return (
    <form onSubmit={saveMeal}>
      <Grid container spacing={3} style={{padding: "40px"}}>
        <Grid item xs={12}>
          <TextField
            label="Comida"
            variant="filled"
            required
            value={name}
            style={{width: '100%'}}
            onChange={e => setName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Chef"
            variant="filled"
            required
            value={chef}
            style={{width: '100%'}}
            onChange={e => setChef(e.target.value)}
          />
        </Grid>        
        <Grid item xs={6}>
          <Button type="submit" variant="contained" fullWidth color="primary"> Crear </Button>
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" fullWidth onClick={handleClose}> Cancelar </Button>
        </Grid>
      </Grid>
    </form>
  );
}
const mapDispatchToProps = {
  addMeal
};

type DispatchProps = typeof mapDispatchToProps;

export default connect(undefined, mapDispatchToProps)(Meal);