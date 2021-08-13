import React, { useState, useEffect } from 'react';
import { 
  Button, 
  Grid, 
  Stepper, 
  Step, 
  StepLabel, 
  StepContent 
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import { IMeal } from '../../model/meal.model';
import { Link } from 'react-router-dom';
import { weekday } from '../../shared/utils/date-helper';

export interface IMenuCurrentProps {
  meals?: ReadonlyArray<IMeal>;
  date?: Date;
}

const currentMenu = [
  {
      "name": "Pizza",
      "chef": "Luigi",
      "date": new Date('2021-08-08T00:00:00')
  },
  {
      "name": "Mac & Chesse",
      "chef": "Mr Chef",
      "date": new Date('2021-08-09T00:00:00')
  },
  {
      "name": "Pollo Thai",
      "chef": "Thai Chef",
      "date": new Date('2021-08-10T00:00:00')
  },
  {
      "name": "Sushi",
      "chef": "Miyagi San",
      "date": new Date('2021-08-11T00:00:00')
  }
];

const MenuCurrent = (props: IMenuCurrentProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const { meals } = props;
  
  useEffect(() => {
    const index = getMeals().findIndex((meal) => meal.date && meal.date.getDate() >= (new Date()).getDate());
    setActiveStep(index);
  }, [meals]);

  const getMeals = (): ReadonlyArray<IMeal> => {
    return meals && meals.length > 0 ? meals : currentMenu;
  }

  const stepper = () => {
    return (
      <Stepper activeStep={activeStep} orientation="vertical">
        {getMeals().map((meal, index) => (
          <Step key={meal.name}>
            <StepLabel>{`${weekday(meal.date)}: ${meal.name}`}</StepLabel>
            <StepContent>{meal.chef}</StepContent>
          </Step>
        ))}
      </Stepper>
    );
  }

  return (
    <Grid container spacing={3} style={{padding: "40px"}}>
      <Grid item xs={12}>
        { true ? stepper() : (
          <Grid container spacing={3} style={{padding: "40px"}}>
            <Grid item xs={12}>
              <Alert severity="error">Upssss... No existe ningún menú para esta semana :( </Alert>
            </Grid>
            <Grid item xs={12}>
              <Link to="/menu/new">
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