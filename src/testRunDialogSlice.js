import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

const initialState = {
    isOpen: false
}

const saveActionEvent = (testRun) => {
    return fetch('http://localhost:7080/action-event', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(testRun)
    });
}

const deleteTestRunId = (testRunId) => {
    return fetch(`http://localhost:7080/action-event?testRunId=${testRunId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }});
}

export const saveTestRun = createAsyncThunk('testRuns/save', async (actionEvents) => {
    actionEvents.forEach(actionEvent => {
        saveActionEvent(actionEvent).then(response => {
            if(response.ok) return response.json();
            throw new Error(`Failed to save action event. Response status: ${response.status}, Response msg: ${response.statusText}`);
        }).catch(error => {
            console.log('Save action event error: ', error);
        })
    })
    console.log("Saved action events: ", JSON.stringify(actionEvents));
});

export const deleteTestRun = createAsyncThunk('testRun/delete', async (testRunId) => {

    deleteTestRunId(testRunId).then(response => {
        if(response.ok) return response.json();
        throw new Error(`Failed to delete test run. Response status: ${response.status}, Response msg: ${response.statusText}`);
    }).catch(error => {
        console.log('Delete test run error: ', error);
    })

    console.log("Delete all action events with test Run Id: ", JSON.stringify(testRunId));
});

const testRunDialogSlice = createSlice({
    name: 'testRunDialog',
    initialState,
    reducers: {
        openTestRunDialog: (state) => {
            state.isOpen = true;
        },
        closeTestRunDialog: (state) => {
            state.isOpen = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(saveTestRun.pending, (state) => {
                state.loading = true;
            })
            .addCase(saveTestRun.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.error.message || 'something went wrong when saving action events';
            })
            .addCase(deleteTestRun.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteTestRun.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.error.message || 'something went wrong when deleting action events';
            });
    }
});

export default testRunDialogSlice.reducer;
export const { openTestRunDialog, closeTestRunDialog } = testRunDialogSlice.actions;
