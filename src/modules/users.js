import {
    OPERATORS_FETCH_REQUESTED, OPERATORS_FETCH_SUCCEEDED,
    PROMOTE_TO_MERCHANT_REQUESTED, PROMOTE_TO_OPERATOR_REQUESTED, USERS_FETCH_NEW_REQUESTED,
    USERS_FETCH_NEW_SUCCEEDED, OPERATOR_REMOVE_REQUESTED, OPERATOR_EDIT_REQUESTED
} from "../constants/users";

export const initialState = {
    usersNew: [],
    operators: [],
    isFetching: true,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case OPERATORS_FETCH_REQUESTED: {
            return {
                ...state,
                isFetching: true,
            }
        }
        case USERS_FETCH_NEW_SUCCEEDED: {
            return {
                ...state,
                usersNew: action.payload,
            }
        }
        case OPERATORS_FETCH_SUCCEEDED: {
            return {
                ...state,
                isFetching: false,
                operators: action.payload
            }
        }
        default: {
            return state
        }
    }
}

export function fetchUsersNew(){
    return {type: USERS_FETCH_NEW_REQUESTED}
}

export function promoteToMerchant(id, user){
    return {type: PROMOTE_TO_MERCHANT_REQUESTED, payload: {id, user}}
}

export function promoteToOperator(id, user){
    return {type: PROMOTE_TO_OPERATOR_REQUESTED, payload: {id, user}}
}

export function fetchOperators(){
    return {type: OPERATORS_FETCH_REQUESTED}
}

export function removeOperator(id){
    return {type: OPERATOR_REMOVE_REQUESTED, payload: {id}}
}

export function editOperator(operator){
    return {type: OPERATOR_EDIT_REQUESTED, payload: {operator}}
}