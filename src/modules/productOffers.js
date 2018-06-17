import axios from 'axios';
import {filterNonEmptyAttributes} from "../utils/functions";

const GET_PRODUCTOFF = 'GET_PRODUCTOFF';
const GET_PRODUCTOFF_FULFILLED = 'GET_PRODUCTOFF_FULFILLED';
const GET_PRODUCTOFF_PENDING = 'GET_PRODUCTOFF_PENDING';

export const initialState = {
    data: [],
    isFetching: false,
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
                data: action.payload,
                isFetching: false
            }
        }
        default: {
            return state
        }
    }
}

export function fetchAll(filter = {}) {
    return {
        type: GET_PRODUCTOFF,
        payload: axios.get("/api/v1/product-offers/", {params: {...filterNonEmptyAttributes(filter)}}).then(response => response.data.data.productOffers)
    }
}
