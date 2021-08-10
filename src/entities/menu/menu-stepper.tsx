import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import { TextField, Checkbox, TableContainer, Table, TableBody, TableRow, TableCell, Paper, IconButton } from '@material-ui/core';
import { Button, Grid } from '@material-ui/core';
import {
  KeyboardDatePicker, MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import MealList from '../meal/meal-list';
import { IRootState } from '../../shared/reducers';

function getSteps() {
  return ['Añadir comidas', 'Ordenar', 'Guardar'];
}

interface StepRender {
  title: string;
  render(): JSX.Element;
}

export type IMenuProps = StateProps;

const MenuStepper = (props: IMenuProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState(new Set<number>());
  const steps = getSteps();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const { meals } = props;

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };


  const renders: StepRender[] = [
    {title: "Crear", render: () => {
      return (
        <div>
          Hola Mundo;
        </div>
      );
    }}
  ];

  const mealTable  = () => {
    return (
      <TableContainer component={Paper}>
        <Table aria-label="a dense table">
          <TableBody>
            {meals.map((meal) => (
              <TableRow key={meal.name}>
                <TableCell>{`${meal.name} (${meal.chef})`}</TableCell>
                <TableCell align="right" >
                  <IconButton color="primary">
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton color="secondary">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>  
    );
  }

  const createMenu = () => {
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
          {mealTable()}
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
  

  const totalSteps = () => {
    return getSteps().length;
  };

  const completedSteps = () => {
    return completed.size;
  };

  const handleNext = () => {
    const newActiveStep = activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = new Set(completed);
    newCompleted.add(activeStep);
    setCompleted(newCompleted);

    /**
     * Sigh... it would be much nicer to replace the following if conditional with
     * `if (!this.allStepsComplete())` however state is not set when we do this,
     * thus we have to resort to not being very DRY.
     */
    if (completed.size !== totalSteps()) {
      handleNext();
    }
  };

  function isStepComplete(step: number) {
    return completed.has(step);
  }

  const stepRender = (index: number) => {
    switch (index) {
      case 0:
        return createMenu();
      case 1:
        return(
          <TextField>Step 2</TextField>
        );    
      case 2:
        return(
          <Checkbox name="Step 3" />
        );    
      default:
        break;
    }
  }

  return (
    <Grid container spacing={3} style={{padding: "40px"}}>
      <Grid item xs={12}>
        <Stepper alternativeLabel nonLinear activeStep={activeStep}>
          {steps.map((label, index) => {
            return (
              <Step key={label}>
                <StepButton onClick={handleStep(index)} completed={isStepComplete(index)}>
                  {label}
                </StepButton>
              </Step>
            );
          })}
        </Stepper>
      </Grid>
      <Grid item xs={12}>
        {stepRender(activeStep)}
      </Grid>
      <Grid item xs={4}>
        <Button variant="outlined" color="primary" disabled={activeStep === 0} onClick={handleBack}>Back</Button>
      </Grid>
      <Grid item xs={4}>
        <Button variant="outlined" color="primary" onClick={handleBack}>Aditional</Button>
      </Grid>
      <Grid item xs={4}>
        <Button variant="outlined" color="primary" onClick={handleComplete}>
          {completedSteps() === totalSteps() - 1 ? 'Finish' : 'Title'}
        </Button>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = ({ meal } : IRootState) => ({
  meals: meal.entities
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(MenuStepper);