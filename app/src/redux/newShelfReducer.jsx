import { createStore } from 'redux';

const INITIAL_STATE = { open: false, adding: false };

const ACTIONS = {
    OPEN_MENU: "open-menu",
    CLOSE_MENU: "close-menu",
    ADDING: "add"
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ACTIONS.OPEN_MENU:
            return { open: true, adding: false }
        case ACTIONS.CLOSE_MENU:
            return { open: false, adding: false }
        case ACTIONS.ADDING:
            return { open: true, adding: true }
        default:
            return state
    }
}
export const open = () => {
    store.dispatch({ type: ACTIONS.OPEN_MENU });
}

export const close = () => {
    store.dispatch({ type: ACTIONS.CLOSE_MENU });
}

export const add = () => {
    store.dispatch({ type: ACTIONS.ADDING });
}


export const store = createStore(reducer);
