import { legacy_createStore as createStore, /*compose,*/ applyMiddleware } from 'redux';

import reducer from './reducers';

// MONKEY-PATCHING INSTEAD OF STORE-ENHANCERS. BAD PRACTICE
/*
const originalDispatch = store.dispatch;
store.dispatch = (action) => {
    if (typeof action === 'string') {
        return originalDispatch({
            type: action
        })
    }
    return originalDispatch(action);
};
*/

// Store-Enhancers are not using in real practice! Below are examples just for learning...
/*
const stringEnhancer = (createStore) => (...args) => {
    const store = createStore(...args);

    const originalDispatch = store.dispatch;
    store.dispatch = (action) => {
        if (typeof action === 'string') {
            return originalDispatch({
                type: action
            })
        }
        return originalDispatch(action);
    };

    return store;
};

const logEnhancer = (createStore) => (...args) => {
    const store = createStore(...args);

    const originalDispatch = store.dispatch;
    store.dispatch = (action) => {
        console.log(action.type);
        return originalDispatch(action);
    };

    return store;
};
*/

const stringMiddleware = () => (dispatch) => (action) => {
    if (typeof action === 'string') {
        return dispatch({
            type: action
        })
    }
    return dispatch(action);
};

const logMiddleware = ({ getState }) => (next) => (action) => {
    console.log(action.type, getState());
    return next(action);
};

const store = createStore(
    reducer,
    // Connecting store enhancers:
    /*compose(stringEnhancer, logEnhancer)*/
    // Connecting middlewares:
    applyMiddleware(stringMiddleware, logMiddleware)
);

store.dispatch("HELLO WORLD!");

export default store;
