import {configureStore} from '@reduxjs/toolkit';
import testRunDialogReducer from './testRunDialogSlice';
import dispatchedActionsReducer from './dispatchedActionsSlice';
import {createLogger} from 'redux-logger';

const logger = createLogger();

const store = configureStore({
    reducer: {
        testRunDialog: testRunDialogReducer,
        dispatchedActions: dispatchedActionsReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});

export default store;
