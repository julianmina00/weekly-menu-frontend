import { IMeal } from "../../model/meal.model";
import { ReduxAction } from "../../shared/types/redux-action";

export const ACTION_TYPES = {
  ADD: 'meal/ADD',
  UPDATE: 'meal/UPDATE',
  REMOVE: 'meal/REMOVE',
  SET: 'meal/SET',
  RESET: 'meal/RESET',
};

const meals = [
  { id: 'id1', name: 'comida 1', chef: 'chef 1' },
  { id: 'id2', name: 'comida 2', chef: 'chef 2' },
  { id: 'id3', name: 'comida 3', chef: 'chef 3' },
  { id: 'id4', name: 'comida 4', chef: 'chef 4' }
] as IMeal[];

const initialState = {
  entities: [ ...meals ] as ReadonlyArray<IMeal>
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
    case ACTION_TYPES.SET: {
      const entities = action.payload as ReadonlyArray<IMeal>;
      console.log('entities in redux');
      console.log(entities);
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
export const setMeals = (meals: ReadonlyArray<IMeal>): ReduxAction<ReadonlyArray<IMeal>> => {
  console.log('Setting meals');
  return {
    type: ACTION_TYPES.SET,
    payload: meals
  };
}

export const resetMeals = () => {
  return {
    type: ACTION_TYPES.RESET
  };
};
