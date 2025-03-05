import { configureStore} from '@reduxjs/toolkit';
import testRunDialogReducer from '../testRunDialogSlice';
import reduxLogger from 'redux-logger';

const logger = reduxLogger.createLogger();

const store = configureStore({
    reducer: {
        testRunDialog: testRunDialogReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});

export default store;
