import { createSlice }  from '@reduxjs/toolkit'

const initialState = {
    isOpen: false
}

const testRunDialogSlice = createSlice({
    name: 'testRunDialog',
    initialState: initialState,
    reducers: {
        open: (state, action) =>
        {
            state.isOpen = true;
        },
        close: (state) => {
            state.isOpen = false;
        }
    }
});

export default testRunDialogSlice.reducer;
export const { open, close } = testRunDialogSlice.actions;
