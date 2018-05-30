import axios from 'axios';

//Veškeré konstanty pro tento reducer
const GET_PRODUCTOFF = 'GET_PRODUCTOFF';
const GET_PRODUCTOFF_FULFILLED = 'GET_PRODUCTOFF_FULFILLED';
const GET_PRODUCTOFF_PENDING = 'GET_PRODUCTOFF_PENDING';

export const initialState = {
    data:[],
    isFetching: true,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCTOFF_PENDING: {
            return {
                ...state,
                isFetching: true,
            }
        }
        case GET_PRODUCTOFF_FULFILLED: {
            return {
                ...state,
                data: action.payload.data,
                isFetching: false
            }
        }
        default: {
            return state
        }
    }
}

export function getData() {
    return {
        type: GET_PRODUCTOFF,
        payload: axios({
            method: 'get',
            url: "/api/v1/product-offer/allMerchantProductOffer/",
        })
    }
}
