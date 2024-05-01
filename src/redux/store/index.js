// store/index.js

import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk"; // Import redux-thunk
import authReducer from "../reducers/authReducer";

const rootReducer = combineReducers({
  auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk)); // Apply redux-thunk middleware

export default store;
