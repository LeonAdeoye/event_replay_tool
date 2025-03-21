import {createSlice}  from '@reduxjs/toolkit'

const initialState = {
    actions: []
}

const dispatchedActionsSlice = createSlice({
    name: 'dispatchedActions',
    initialState,
    reducers: {
        add: (state, action) => {
            state.actions = [...state.actions, action.payload];
        },
        clear: (state) => {
            state.actions = [];
        },
    }
});

export default dispatchedActionsSlice.reducer;
export const {add, clear} = dispatchedActionsSlice.actions;
