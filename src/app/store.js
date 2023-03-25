import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../features/api/apiSlice';
import teamsSliceReducer from "../features/teams/teamsSlice"
import projectsSliceReducer from "../features/projects/projectsSlice"
import taskSliceReducer from '../features/tasks/taskSlice';
import filterSliceReducer from '../features/FilterSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    projects: projectsSliceReducer,
    teams: teamsSliceReducer,
    tasks: taskSliceReducer,
    filter: filterSliceReducer
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddlewares) =>
      getDefaultMiddlewares().concat(apiSlice.middleware),
});
