import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

const initialState = {
    testRuns: [],
    loading: false,
    error: '',
    differences: {}
}

export const fetchTestRuns = createAsyncThunk('testRuns/fetch', async () => {
    const response = await fetch('http://localhost:7080/action-event');
    return await response.json();
});

export const compareTestRuns = createAsyncThunk('testRun/compare', async ({firstTestRunId, secondTestRunId}) => {
    const response = await fetch(`http://localhost:7080/action-event/compare?firstTestRunId=${firstTestRunId}&secondTestRunId=${secondTestRunId}`);
    return await response.json();
});

export const deleteTestRun = createAsyncThunk('testRun/delete', async (testRunId) => {
    const response = await fetch(`http://localhost:7080/action-event?testRunId=${testRunId}`, {method: 'DELETE'});
    return await response.json();
});

const testRunsSlice = createSlice({
    name: 'testRuns',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTestRuns.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTestRuns.fulfilled, (state, action) => {
                state.testRuns = action.payload;
                state.loading = false;
                state.error = '';
            })
            .addCase(fetchTestRuns.rejected, (state, action) => {
                state.testRuns = [];
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteTestRun.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteTestRun.fulfilled, (state, action) => {
                state.testRuns = action.payload;
                state.loading = false;
                state.error = '';
            })
            .addCase(deleteTestRun.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.error.message || 'something went wrong when deleting action events';
            })
            .addCase(compareTestRuns.pending, (state) => {
                state.loading = true;
            })
            .addCase(compareTestRuns.fulfilled, (state, action) => {
                state.differences = action.payload;
                console.log("differences: ", state.differences);
                state.loading = false;
                state.error = '';
            })
            .addCase(compareTestRuns.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.error.message || 'something went wrong when comparing two test runs';
            });
    }
});

export default testRunsSlice.reducer;

