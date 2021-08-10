import { IMeal } from "../../model/meal.model";
import { ReduxAction } from "../../shared/types/redux-action";

export const ACTION_TYPES = {
  ADD: 'meal/ADD',
  UPDATE: 'meal/UPDATE',
  REMOVE: 'meal/REMOVE',
  RESET: 'meal/RESET',
};

const initialState = {
  entities: [] as ReadonlyArray<IMeal>
};

export type MealState = Readonly<typeof initialState>;

// Reducer
export default (state: MealState = initialState, action: ReduxAction<any>): MealState => {
  switch (action.type) {
    case ACTION_TYPES.ADD: {
      const entities = [ ...state.entities, action.payload ];
      return {
        ...state,
        entities
      };
    }
    case ACTION_TYPES.UPDATE: {
      const toUpdate = action.payload as IMeal;
      const entities = state.entities.filter((meal) => meal.id !== toUpdate.id);
      entities.push(toUpdate);
      return {
        ...state,
        entities
      };
    }
    case ACTION_TYPES.REMOVE: {
      const id = action.payload as string;
      const entities = state.entities.filter((meal) => meal.id !== id);
      return {
        ...state,
        entities
      };
    }
    case ACTION_TYPES.RESET: {
      return {
        ...initialState
      };
    }
    default:
      return state;
  }
};

// Actions
export const addMeal = (meal: IMeal): ReduxAction<IMeal> => {
  return {
    type: ACTION_TYPES.ADD,
    payload: meal
  };
}

export const updateMeal = (meal: IMeal): ReduxAction<IMeal> => {
  return {
    type: ACTION_TYPES.UPDATE,
    payload: meal
  };
}

export const removeMeal = (id: string): ReduxAction<string> => {
  return {
    type: ACTION_TYPES.REMOVE,
    payload: id
  };
}

export const resetMeals = () => {
  return {
    type: ACTION_TYPES.RESET
  };
};
