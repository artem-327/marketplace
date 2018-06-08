const ADD_POPUP = "ADD_POPUP";
const REMOVE_POPUP = "REMOVE_POPUP";
const REMOVE_ALL = "REMOVE_ALL";

export const initialState = {
    components: []
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ADD_POPUP: {
            return {
                ...state,
                components: [...state.components, action.payload]
            }
        }
        case REMOVE_POPUP: {
            return {
                ...state,
                components: [
                    ...state.components.slice(0, action.payload),
                    ...state.components.slice(action.payload + 1)
                ]
            }
        }
        case REMOVE_ALL: {
            return {
                ...state,
                components: []
            }
        }
        default: {
            return state
        }
    }
}

export function addPopup(component) {
    return {
        type: ADD_POPUP,
        payload: component
    }
}

export function removePopup(index) {
    return {
        type: REMOVE_POPUP,
        payload: index
    }
}



