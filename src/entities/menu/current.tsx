import React from 'react';
import { Button, Grid} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import { IMeal } from '../../model/meal.model';
import MealList from '../meal/meal-list';
import { Link } from 'react-router-dom';

export interface IMenuCurrentProps {
  meals?: ReadonlyArray<IMeal>;
  date?: Date;
}

const currentMenu = [
  {
      "name": "Pizza",
      "chef": "Luigi"
  },
  {
      "name": "Mac & Chesse",
      "chef": "Mr Chef"
  },
  {
      "name": "Pollo Thai",
      "chef": "Thai Chef"
  },
  {
      "name": "Sushi",
      "chef": "Miyagi San"
  }
];

const MenuCurrent = (props: IMenuCurrentProps) => {

  const { meals } = props;

  const getMeals = (): ReadonlyArray<IMeal> => {
    return meals && meals.length > 0 ? meals : currentMenu;
  }


  return (
    <Grid container spacing={3} style={{padding: "40px"}}>
      <Grid item xs={12}>
        { true ? (
          <MealList meals={getMeals()} />
        ) : (
          <Grid container spacing={3} style={{padding: "40px"}}>
            <Grid item xs={12}>
              <Alert severity="error">Upssss... No existe ningún menú para esta semana :( </Alert>
            </Grid>
            <Grid item xs={12}>
              <Link to="/menu/view/create">
                <Button variant="outlined" fullWidth color="primary">Crear Menú</Button>
              </Link>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}

export default MenuCurrent;