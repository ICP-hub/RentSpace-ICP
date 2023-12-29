import { configureStore, combineReducers } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { userReducer } from './users/reducer';
import { hotelsReducer } from './hotels/reducer';
import { principleReducer } from './principle/reducer';
import { actorReducer } from './actor/reducer';
import {listingReducer} from './NewListing/reducer';
// import { agentReducer } from './agent/reducer';

const rootReducer = combineReducers({ 
  userReducer,
  hotelsReducer,
  principleReducer,
  actorReducer,
  listingReducer
});

export default Store= configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});