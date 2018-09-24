import {
    PROMOTE_TO_MERCHANT_REQUESTED, PROMOTE_TO_OPERATOR_REQUESTED, USERS_FETCH_NEW_REQUESTED,
    USERS_FETCH_NEW_SUCCEEDED
} from "../constants/users";

export const initialState = {
    usersNew: [],
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case USERS_FETCH_NEW_SUCCEEDED: {
            return {
                ...state,
                usersNew: action.payload,
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

export function promoteToMerchant(id){
    return {type: PROMOTE_TO_MERCHANT_REQUESTED, payload: {id}}
}

export function promoteToOperator(id){
    return {type: PROMOTE_TO_OPERATOR_REQUESTED, payload: {id}}
}
