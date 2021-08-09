import React from 'react';
import { Link } from 'react-router-dom'
import { defaultMeal, IMeal } from '../../model/meal.model';
import { TextField, Button, Grid } from '@material-ui/core';

export interface IMealProps {
  onCreate?(meal: IMeal): void;
}

const Meal = (props: IMealProps) => {
  const [meal, setMeal] = React.useState(defaultMeal);

  const { onCreate } = props;

  const setMealName = (name: string) => {
    const currentMeal = { ...meal, name };
    setMeal(currentMeal);
  }

  const setMealChef = (chef: string) => {
    const currentMeal = { ...meal, chef };
    setMeal(currentMeal);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(meal);
    if(onCreate){
      onCreate(meal);
    }
    console.log('submit...');
  }

  const handleClose = () => {
    console.log('Closing...');
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3} style={{padding: "40px"}}>
        <Grid item xs={12}>
          <TextField
            label="Comida"
            variant="filled"
            required
            value={meal.name}
            style={{width: '100%'}}
            onChange={e => setMealName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Chef"
            variant="filled"
            required
            value={meal.chef}
            style={{width: '100%'}}
            onChange={e => setMealChef(e.target.value)}
          />
        </Grid>        
        <Grid item xs={6}>
          <Button type="submit" variant="contained" fullWidth color="primary"> Crear </Button>
        </Grid>
        <Grid item xs={6}>
          <Link to="/menu/new">
            <Button variant="contained" fullWidth onClick={handleClose}> Cancelar </Button>
          </Link>
        </Grid>
      </Grid>
    </form>
  );
}

export default Meal;