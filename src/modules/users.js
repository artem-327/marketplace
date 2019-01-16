import {
    OPERATORS_FETCH_REQUESTED, OPERATORS_FETCH_SUCCEEDED,
    PROMOTE_TO_MERCHANT_REQUESTED, PROMOTE_TO_OPERATOR_REQUESTED,
    USERS_FETCH_SUCCEEDED, USERS_FETCH_REQUESTED, OPERATOR_REMOVE_REQUESTED, OPERATOR_EDIT_REQUESTED
} from "../constants/users";

export const initialState = {
    usersNew: [],
    operators: [],
    isFetching: true,
    users: []
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case OPERATORS_FETCH_REQUESTED: {
            return {
                ...state,
                isFetching: true,
            }
        }

        case USERS_FETCH_REQUESTED: {
            return {
                ...state,
                isFetching: true,
            }
        }

        case USERS_FETCH_SUCCEEDED: {
            return {
                ...state,
                users: action.payload,
                isFetching: false
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

export function getUsers(){
    return {type: USERS_FETCH_REQUESTED}
}

export function putPromoteToMerchant(id, user){
    return {type: PROMOTE_TO_MERCHANT_REQUESTED, payload: {id, user}}
}

export function putPromoteToOperator(id, user){
    return {type: PROMOTE_TO_OPERATOR_REQUESTED, payload: {id, user}}
}

export function getOperators(){
    return {type: OPERATORS_FETCH_REQUESTED}
}

export function deleteOperator(id){
    return {type: OPERATOR_REMOVE_REQUESTED, payload: {id}}
}

export function putOperatorEdit(operator){
    return {type: OPERATOR_EDIT_REQUESTED, payload: {operator}}
}