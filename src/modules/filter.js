const TOGGLE_FILTER = "TOGGLE_FILTER";

export const initialState = {
    isOpen: false,
    data: {
        search: null,
        qntylb: null,
        qntyub: null,
        prclb: null,
        prcub: null,
        loc: null,
        cmpny: null,
        pckgs: {}
    }
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_FILTER: {
            return {
                ...state,
                isOpen: !state.isOpen
            }
        }
        default: {
            return state
        }
    }
}

export function toggleFilter() {
    return {
        type: TOGGLE_FILTER,
    }
}



