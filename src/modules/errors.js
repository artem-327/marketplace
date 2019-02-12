import axios from "axios";

const CLOSE_MESSAGE = 'CLOSE_MESSAGE';
const ADD_MESSAGE = 'ADD_MESSAGE';
//register const for all axios endpoints
const ADD_PRODUCT_OFFER_REJECTED = 'ADD_PRODUCT_OFFER_REJECTED';
const SAVE_MAPPING_REJECTED = 'SAVE_MAPPING_REJECTED';
// const SAVE_MAPPING_REJECTED = 'SAVE_MAPPING_REJECTED';
// const FETCH_ORIGIN_REJECTED = 'FETCH_ORIGIN_REJECTED';
// const FETCH_RECENT_ADDED_PRODUCTS_REJECTED = 'FETCH_RECENT_ADDED_PRODUCTS_REJECTED';
// const FETCH_PRODUCT_GRADE_REJECTED = 'FETCH_PRODUCT_GRADE_REJECTED';
// const FETCH_PRODUCT_CONDITIONS_REJECTED = 'FETCH_PRODUCT_CONDITIONS_REJECTED';
// const FETCH_PRODUCT_FORMS_REJECTED = 'PRODUCT_FORMS_REJECTED';
// const GET_UNIT_OF_PACKAGING_REJECTED = 'GET_UNIT_OF_PACKAGING_REJECTED';
// const GET_UNIT_OF_MEASUREMENT_REJECTED = 'GET_UNIT_OF_MEASUREMENT_REJECTED';
// const GET_PRODUCT_OFFERS_REJECTED = 'GET_PRODUCT_OFFERS_REJECTED';
// const GET_PACKAGE_TYPES_REJECTED = 'GET_PACKAGE_TYPES_REJECTED';
// const VALIDATE_PACKAGE_TYPE_REJECTED = 'VALIDATE_PACKAGE_TYPE_REJECTED';
// const ACCEPT_MERCHANT_REJECTED = 'ACCEPT_MERCHANT_REJECTED';
// const REJECT_MERCHANT_REJECTED = 'REJECT_MERCHANT_REJECTED';
// const UPDATE_APPROVE_REJECTED = 'UPDATE_APPROVE_REJECTED';
// const FETCH_WAREHOUSE_FULFILLED_REJECTED = 'FETCH_WAREHOUSE_FULFILLED_REJECTED';
// const FETCH_LOCATIONS_FULFILLED_REJECTED = 'FETCH_LOCATIONS_FULFILLED_REJECTED';
// const SAVE_WAREHOUSE_REJECTED = 'SAVE_WAREHOUSE_REJECTED';
// const UPDATE_WAREHOUSE_REJECTED = 'UPDATE_WAREHOUSE_REJECTED';
// const GET_COMPANIES_REJECTED = 'GET_COMPANIES_REJECTED';
// const CURRENT_ADDED_REJECTED = "CURRENT_ADDED_REJECTED";
// const CHANGE_RULES_REJECTED = "CHANGE_RULES_REJECTED";
// const PACKAGE_OPTIONS_REJECTED = 'PACKAGE_OPTIONS_REJECTED';
// const MANUFACTURER_REJECTED = 'MANUFACTURER_REJECTED';


export const initialState = {
    messages: []
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        // case SAVE_MAPPING_REJECTED:
        // case FETCH_ORIGIN_REJECTED:
        // case FETCH_RECENT_ADDED_PRODUCTS_REJECTED:
        // case FETCH_PRODUCT_GRADE_REJECTED:
        // case FETCH_PRODUCT_CONDITIONS_REJECTED:
        // case FETCH_PRODUCT_FORMS_REJECTED:
        // case GET_UNIT_OF_PACKAGING_REJECTED:
        // case GET_UNIT_OF_MEASUREMENT_REJECTED:
        // case GET_PACKAGE_TYPES_REJECTED:
        // case VALIDATE_PACKAGE_TYPE_REJECTED:
        // case ACCEPT_MERCHANT_REJECTED:
        // case REJECT_MERCHANT_REJECTED:
        // case UPDATE_APPROVE_REJECTED:
        // case FETCH_WAREHOUSE_FULFILLED_REJECTED:
        // case FETCH_LOCATIONS_FULFILLED_REJECTED:
        // case SAVE_WAREHOUSE_REJECTED:
        // case UPDATE_WAREHOUSE_REJECTED:
        // case GET_COMPANIES_REJECTED:
        // case CURRENT_ADDED_REJECTED:
        // case CHANGE_RULES_REJECTED:
        // case PACKAGE_OPTIONS_REJECTED:
        // case MANUFACTURER_REJECTED:
        case ADD_PRODUCT_OFFER_REJECTED: {
            return {
                ...state,
                messages: [...state.messages, (
                    action.payload.response && action.payload.response.data.message ? action.payload.response.data.message : action.payload.message
                )]
            }
        }
        case SAVE_MAPPING_REJECTED: {
            return {
                ...state,
                messages: [...state.messages, action.payload.message]
            }
        }
        case CLOSE_MESSAGE: {
            return {
                ...state,
                messages: [...state.messages.slice(0, action.payload),
                    ...state.messages.slice(action.payload + 1)]
            }
        }
        case ADD_MESSAGE: {
            return {
                ...state,
                messages: [...state.messages, action.payload]
            }
        }
        default: {
            return state
        }
    }
}

export function closeMessage(index) {
    return {
        type: CLOSE_MESSAGE,
        payload: index
    }
}

export function addMessage(message) {
    return {
        type: ADD_MESSAGE,
        payload: message
    }
}
