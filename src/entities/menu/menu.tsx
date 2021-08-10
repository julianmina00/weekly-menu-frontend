import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Grid } from '@material-ui/core';
import {
  KeyboardDatePicker, MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import MealList from '../meal/meal-list';
import { Link } from 'react-router-dom';
import { IRootState } from '../../shared/reducers';

export type IMenuProps = StateProps;

const Menu = (props: IMenuProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const { meals } = props;

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

const mapStateToProps = ({ meal } : IRootState) => ({
  meals: meal.entities
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(Menu);