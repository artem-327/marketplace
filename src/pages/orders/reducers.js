import * as AT from './action-types'

const initialState = {
    data: [],
    isFetching: false,
    selectedIndex: -1
}

export default function(state = initialState, action) {
    switch (action.type) {
        case AT.ORDERS_FETCH_REQUESTED:
            return {
                ...state,
                isFetching: true
            }
        case AT.ORDERS_FETCH_SUCCESS:
            return {
                ...state,
                isFetching: false,
                data: action.payload.data
            }
        case AT.ORDERS_FETCH_FAILURE:
            return {
                ...state,
                isFetching: false
            }
        case AT.ORDERS_SELECT_ROW:
            return {
                ...state,
                selectedIndex: action.payload.index
            }
        default:
            return state
    }
}