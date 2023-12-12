import { configureStore, combineReducers } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import userReducer from './reducers';

const rootReducer = combineReducers({ userReducer });

export default Store= configureStore({
  reducer: rootReducer,
});