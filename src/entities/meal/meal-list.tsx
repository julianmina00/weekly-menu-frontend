import React from 'react';
import { IMeal } from '../../model/meal.model';
import { Table, TableBody, TableRow, TableContainer, TableHead, TableCell, Paper } from '@material-ui/core';

export interface IMealListProps {
  meals: ReadonlyArray<IMeal>;
}

const MealList = (props: IMealListProps) => {

  const { meals } = props;

  return (
    <TableContainer component={Paper}>
      <Table aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Comida</TableCell>
            <TableCell>Chef</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {meals.map((meal) => (
            <TableRow key={meal.name}>
              <TableCell>{meal.name}</TableCell>
              <TableCell>{meal.chef}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>  
  );
}

export default MealList;