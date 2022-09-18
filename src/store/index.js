import {
  configureStore,
  getDefaultMiddleware
} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import saga from "../saga";
import sortReducer from './sortReducer';
import graphReducer from './graphReducer';
import pieReducer from './pieReducer';


let sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

const store = configureStore({
  reducer: {
    item: sortReducer,
    graph: graphReducer,
    pie: pieReducer
  },
  middleware
});

sagaMiddleware.run(saga);

export default store;
