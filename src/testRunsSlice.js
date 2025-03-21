import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

const initialState = {
    testRuns: [],
    loading: false,
    error: ''
}

export const fetchTestRuns = createAsyncThunk('testRuns/fetch', async () => {
    const response = await fetch('http://localhost:7080/action-event');
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
            });
    }
});

export default testRunsSlice.reducer;

