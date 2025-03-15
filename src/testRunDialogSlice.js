import {createSlice}  from '@reduxjs/toolkit'

const initialState = {
    isOpen: false
}

const saveAction = (testRun) => {
    return fetch('http://localhost:7080/action-event', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(testRun)
    });
}

const testRunDialogSlice = createSlice({
    name: 'testRunDialog',
    initialState: initialState,
    reducers: {
        openTestRunDialog: (state) => {
            state.isOpen = true;
        },
        closeTestRunDialog: (state) => {
            state.isOpen = false;
        },
        saveTestRun: (state, action) => {
            action.payload.forEach(action => {
                saveAction(action).then(response => {
                    console.log('Saved action event response: ', response.json());
                }).catch(error => {
                    console.log('Save action event error: ', error);
                })
            })
            console.log("Saved action events: ", JSON.stringify(action.payload));
        }
    }
});

export default testRunDialogSlice.reducer;
export const { openTestRunDialog, closeTestRunDialog, saveTestRun } = testRunDialogSlice.actions;
