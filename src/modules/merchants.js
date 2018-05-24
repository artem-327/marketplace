import axios from 'axios';

//Veškeré konstanty pro tento reducer
const GET_MERCHANT = 'GET_MERCHANT';
const GET_MERCHANT_FULFILLED = 'GET_MERCHANT_FULFILLED';
const GET_MERCHANT_PENDING = 'GET_MERCHANT_PENDING';
const ACCEPT_MERCHANT = 'ACCEPT_MERCHANT';
const ACCEPT_MERCHANT_FULFILLED = 'ACCEPT_MERCHANT_FULFILLED';
const ACCEPT_MERCHANT_PENDING = 'ACCEPT_MERCHANT_PENDING';
const REJECT_MERCHANT = 'REJECT_MERCHANT';
const REJECT_MERCHANT_FULFILLED = 'REJECT_MERCHANT_FULFILLED';
const REJECT_MERCHANT_PENDING = 'REJECT_MERCHANT_PENDING';

export const initialState = {
    data:[],
    isFetching: true,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_MERCHANT_PENDING: {
            return {
                ...state,
                isFetching: true,
            }
        }
        case GET_MERCHANT_FULFILLED: {
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
        type: GET_MERCHANT,
        payload: axios({
            method: 'get',
            url: "/api/v1/merchant/",
        })
    }
}

export function acceptMerchant(id) {
    return {
        type: ACCEPT_MERCHANT,
        payload: axios({
            method: 'get',
            url: "/api/v1/operator/approve-merchant/" + id,
        })
    }
}

export function rejectMerchant(id) {
    return {
        type: REJECT_MERCHANT,
        payload: axios({
            method: 'get',
            url: "/api/v1/operator/reject-merchant/" + id,
        })
    }
}

