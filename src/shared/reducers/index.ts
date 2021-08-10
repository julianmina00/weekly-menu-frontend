import { combineReducers } from 'redux';

import meal, { MealState } from '../../entities/meal/meal.reducer';

export interface IRootState {
  readonly meal: MealState;
}

const rootReducer = combineReducers<IRootState>({
  meal
});

export default rootReducer;
