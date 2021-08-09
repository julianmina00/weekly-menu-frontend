import React, { useEffect, useState } from 'react';
import { Button, Grid } from '@material-ui/core';
import {
  KeyboardDatePicker, MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { IMeal } from '../../model/meal.model';
import MealList from '../meal/meal-list';
import Meal from '../meal/meal';
import { Link } from 'react-router-dom';


export interface IMenuProps {}

const Menu = (props: IMenuProps) => {
  const [meals, setMeals] = useState([] as ReadonlyArray<IMeal>);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  useEffect(() => {
    console.log(meals);
  }, [meals]);

  const addMeal = (meal: IMeal) => {
    const currentMeals = [ ...meals ];
    currentMeals.push(meal);
    setMeals(currentMeals);
  }
  
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  return (
    <Grid container spacing={3} style={{padding: "40px"}}>
      <Grid item xs={12}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Dia inicial"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
        </MuiPickersUtilsProvider>
      </Grid>
      <Grid item xs={12}>
        {meals?.length > 0 && (
          <MealList meals={meals} />
        )}
      </Grid>
      <Grid item xs={6}>
        <Link to="/meal/new">
          <Button variant="outlined" color="primary">Añadir comida</Button>
        </Link>
      </Grid>
      <Grid item xs={6}>
        <Button variant="outlined" color="primary">Guardar Menú</Button>
      </Grid>
    </Grid>
  );
}

export default Menu;