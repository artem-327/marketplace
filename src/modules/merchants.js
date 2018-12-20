import axios from 'axios';
import {
    MERCHANT_FETCH_REQUESTED, MERCHANT_FETCH_SUCCEEDED,
    MERCHANT_EDIT_REQUESTED,
    MERCHANTS_FETCH_REQUESTED, MERCHANTS_FETCH_SUCCEEDED,
    MERCHANT_REMOVE_REQUESTED,
} from "../constants/merchants";

const ACCEPT_MERCHANT = 'ACCEPT_MERCHANT';
const REJECT_MERCHANT = 'REJECT_MERCHANT';
const UPDATE_APPROVE = 'UPDATE_APPROVE';

export const initialState = {
    data:[],
    approvedMerchants:{},
    isFetching: false,
    merchantDetail: {}
};

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case MERCHANTS_FETCH_REQUESTED: {
            return {
                ...state,
                isFetching: true,
            }
        }
        case MERCHANTS_FETCH_SUCCEEDED: {
            return {
                ...state,
                data: action.payload,
                isFetching: false,
            }
        }
        case MERCHANT_FETCH_REQUESTED: {
            return {
                ...state,
                isFetching: true,
            }
        }
        case MERCHANT_FETCH_SUCCEEDED: {
            return {
                ...state,
                merchantDetail: action.payload,
                isFetching: false,
            }
        }

        default: {
            return state
        }
    }
}

export function approveMerchant(id){
    return {
        type: UPDATE_APPROVE,
        payload: axios({
          method: 'post',
          url: "api/v1/merchant/"+id+"/approved"
        })
    }
}

export function acceptMerchant(id) {
    return {
        type: ACCEPT_MERCHANT,
        payload: axios({
            method: 'get',
            url: "/prodex/api/operator/approve-merchant/" + id,
        })
    }
}

export function rejectMerchant(id) {
    return {
        type: REJECT_MERCHANT,
        payload: axios({
            method: 'get',
            url: "/prodex/api/operator/reject-merchant/" + id,
        })
    }
}

export function getMerchants() {
    return {type: MERCHANTS_FETCH_REQUESTED}
}

export function getMerchant(id, resolve){
    return {
        type: MERCHANT_FETCH_REQUESTED,
        payload: {id},
        resolve: resolve
    }
}

export function putMerchantEdit(merchant){
    return {
        type: MERCHANT_EDIT_REQUESTED, payload: {merchant}
    }
}

export function deleteMerchant(id) {
    return {type: MERCHANT_REMOVE_REQUESTED, payload: {id}}
}
