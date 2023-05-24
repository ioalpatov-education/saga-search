import { configureStore } from "@reduxjs/toolkit";
import skillsReducer from "./slices/skillsSlice";
import { combineEpics, createEpicMiddleware } from "redux-observable";
import { changeSearchEpic, searchSkillsEpic } from "./epics";

const epicMiddleware = createEpicMiddleware();

export const store = configureStore({
  reducer: {
    skills: skillsReducer,
  },
  middleware: [epicMiddleware],
});

const epic = combineEpics(changeSearchEpic, searchSkillsEpic);

epicMiddleware.run(epic);
