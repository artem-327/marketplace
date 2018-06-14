const TOGGLE_FILTER = "TOGGLE_FILTER";

export const initialState = {
    
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_FILTER: {
            return {
                ...state,
                isOpen: action.payload
            }
        }
        default: {
            return state
        }
    }
}

export function toggleFilter(state) {
    return {
        type: TOGGLE_FILTER,
        payload: state
    }
}



