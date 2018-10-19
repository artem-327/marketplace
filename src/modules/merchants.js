import axios from 'axios';
import {
    MERCHANT_FETCH_REQUESTED, MERCHANT_FETCH_SUCCEEDED,
    MERCHANT_EDIT_REQUESTED,
    MERCHANTS_FETCH_REQUESTED, MERCHANTS_FETCH_SUCCEEDED,
} from "../constants/merchants";

const ACCEPT_MERCHANT = 'ACCEPT_MERCHANT';
const REJECT_MERCHANT = 'REJECT_MERCHANT';
const UPDATE_APPROVE = 'UPDATE_APPROVE';

export const initialState = {
    data:[],
    approvedMerchants:{},
    isFetching: false,
    detailIsFetching: false,
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
                detailIsFetching: true,
            }
        }
        case MERCHANT_FETCH_SUCCEEDED: {
            return {
                ...state,
                merchantDetail: action.payload,
                detailIsFetching: false,
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
          url: "api/v1/merchant/"+id+"/approved/"  
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

export function fetchMerchants() {
    return {type: MERCHANTS_FETCH_REQUESTED}
}

export function fetchMerchant(id){
    return {
        type: MERCHANT_FETCH_REQUESTED, payload: {id}
    }
}

export function editMerchant(merchant){
    return {
        type: MERCHANT_EDIT_REQUESTED, payload: {merchant}
    }
}
