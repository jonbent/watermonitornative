import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import rootReducer from './reducers/RootReducer';



let middleware: any[] = [thunk];
if (process.env.NODE_ENV === "development") middleware.push(logger);

const configureStore = (preloadedState = {}) => {
    return createStore(
        rootReducer,
        preloadedState,
        applyMiddleware(...middleware)
    );
};

export default configureStore;