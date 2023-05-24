import { configureStore } from "@reduxjs/toolkit";
import skillsReducer from "./slices/skillsSlice";
import createSagaMiddleware from "redux-saga";
import saga from "./saga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    skills: skillsReducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(saga);
