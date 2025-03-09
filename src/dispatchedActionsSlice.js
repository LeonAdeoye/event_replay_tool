import { createSlice }  from '@reduxjs/toolkit'

const initialState = {
    actions: [],
}

const dispatchedActionsSlice = createSlice({
    name: 'dispatchedActions',
    initialState: initialState,
    reducers: {
        add: (state, action) =>
        {
            state.actions = action.payload;
        },
        clear: (state) => {
            state.actions = [];
        },
        save: (state, action) => {
            console.log(action.payload);
        }
    }
});

export default dispatchedActionsSlice.reducer;
export const { add, clear, save} = dispatchedActionsSlice.actions;
