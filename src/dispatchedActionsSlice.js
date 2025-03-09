import { createSlice }  from '@reduxjs/toolkit'

const initialState = {
    dispatchedActions: [],
}

const dispatchedActionsSlice = createSlice({
    name: 'dispatchedActions',
    initialState: initialState,
    reducers: {
        add: (state, action) =>
        {
            state.dispatchedActions = action.payload;
        },
        clear: (state) => {
            state.dispatchedActions = [];
        }
    }
});

export default dispatchedActionsSlice.reducer;
export const { add, clear } = dispatchedActionsSlice.actions;
