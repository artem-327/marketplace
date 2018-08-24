const CLOSE_MESSAGE = 'CLOSE_MESSAGE';

//register const for all axios endpoints
const ADD_PRODUCT_OFFER_REJECTED = 'ADD_PRODUCT_OFFER_REJECTED';
const SAVE_MAPPING_REJECTED = 'SAVE_MAPPING_REJECTED';
const FETCH_ORIGIN_REJECTED = 'FETCH_ORIGIN_REJECTED';
const FETCH_RECENT_ADDED_PRODUCTS_REJECTED = 'FETCH_RECENT_ADDED_PRODUCTS_REJECTED';
const FETCH_PRODUCT_GRADE_REJECTED = 'FETCH_PRODUCT_GRADE_REJECTED';
const FETCH_PRODUCT_CONDITIONS_REJECTED = 'FETCH_PRODUCT_CONDITIONS_REJECTED';
const FETCH_PRODUCT_FORMS_REJECTED = 'PRODUCT_FORMS_REJECTED';
const GET_UNIT_OF_PACKAGING_REJECTED = 'GET_UNIT_OF_PACKAGING_REJECTED';
const GET_UNIT_OF_MEASUREMENT_REJECTED = 'GET_UNIT_OF_MEASUREMENT_REJECTED';
const GET_PRODUCT_OFFERS_REJECTED = 'GET_PRODUCT_OFFERS_REJECTED';





export const initialState = {
    messages: []
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ADD_PRODUCT_OFFER_REJECTED:
        case SAVE_MAPPING_REJECTED:
        case FETCH_ORIGIN_REJECTED:
        case FETCH_RECENT_ADDED_PRODUCTS_REJECTED:
        case FETCH_PRODUCT_GRADE_REJECTED:
        case FETCH_PRODUCT_CONDITIONS_REJECTED:
        case FETCH_PRODUCT_FORMS_REJECTED:
        case GET_UNIT_OF_PACKAGING_REJECTED:
        case GET_UNIT_OF_MEASUREMENT_REJECTED:
        case GET_PRODUCT_OFFERS_REJECTED: {
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
