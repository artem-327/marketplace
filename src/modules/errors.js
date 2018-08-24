const CLOSE_MESSAGE = 'CLOSE_MESSAGE';

//register const for all axios endpoints
const ADD_PRODUCT_OFFER_REJECTED = 'ADD_PRODUCT_OFFER_REJECTED';

export const initialState = {
    messages: []
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ADD_PRODUCT_OFFER_REJECTED: {
            return {
                ...state,
                messages: [...state.messages, action.payload.message]
            }
        }
        case CLOSE_MESSAGE:{
            return{
                ...state,
                messages: [...state.messages.slice(0, action.payload),
                ...state.messages.slice(action.payload + 1)]
            }
        }
        default: {
            return state
        }
    }
}

export function closeMessage(index){
    return{
        type: CLOSE_MESSAGE,
        payload: index
    }
}
