import * as AT from './action-types'

const initialState = {
    data: [],
    detail: [],
    isFetching: false,
    isDetailFetching: false,
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
        case AT.ORDERS_DETAIL_FETCH_REQUESTED:
            return {
                ...state,
                isDetailFetching: true
            }
        case AT.ORDERS_DETAIL_FETCH_SUCCESS:
            return {
                ...state,
                isDetailFetching: false,
                detail: action.payload.data
            }
        case AT.ORDERS_DETAIL_FETCH_FAILURE:
            return {
                ...state,
                isDetailFetching: false
            }
        default:
            return state
    }
}