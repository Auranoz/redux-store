import { legacy_createStore as createStore, compose } from 'redux';

import reducer from './reducers';

// Enhancers are not using in real practice! Below are examples just for learning...
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

// MONKEY-PATCHING. BAD PRACTICE
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

const store = createStore(reducer, compose(stringEnhancer, logEnhancer));

store.dispatch("HELLO WORLD!");

export default store;
