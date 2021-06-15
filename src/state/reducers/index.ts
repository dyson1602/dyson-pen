import { combineReducers } from 'redux';
import cellsReducer from './cellsReducer';

const reducers = combineReducers({
  cells: cellsReducer,
});

export default reducers;

//Rewatch section on this in redux TS
export type RootState = ReturnType<typeof reducers>;
