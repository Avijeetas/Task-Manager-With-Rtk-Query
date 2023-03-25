import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    projectIds: [],
    search:''
    // other filter properties
  },
  reducers: {
    addProjectIds(state, action) {
        console.log(action);
        state.projectIds=[...state.projectIds,...action.payload]
    },
    addProjectId(state, action) {
        console.log(action);
        state.projectIds.push(parseInt(action.payload));
    },

    deleteId(state, action){
        console.log(action);
        state.projectIds = state.projectIds.filter(id => id!=action.payload);
    },
    searched(state, action){
        state.search = action.payload;
    }
    // other filter reducers
  },
});

export const { addProjectIds, deleteId,addProjectId, searched } = filterSlice.actions;
export default filterSlice.reducer;
