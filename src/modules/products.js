import axios from "axios";

const SEARCH_PRODUCT = 'SEARCH_PRODUCT';
const SEARCH_PRODUCT_PENDING = 'SEARCH_PRODUCT_PENDING';
const SEARCH_PRODUCT_FULFILLED = 'SEARCH_PRODUCT_FULFILLED';
const SEARCH_PRODUCT_REJECTED = 'SEARCH_PRODUCT_REJECTED';

export const initialState = {
    results: [],
    isFetching: false
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SEARCH_PRODUCT_PENDING: {
            return{
                ...state,
                isFetching: true,
            }
        }
        case SEARCH_PRODUCT_REJECTED: {
            return{
                ...state,
                isFetching: false,
            }
        }
        case SEARCH_PRODUCT_FULFILLED: {
            return{
                ...state,
                isFetching: false,
                results: action.payload.data.data.products
            }
        }
        default: {
            return state
        }
    }
}


export function searchProduct(fulltext) {
    return {
        type: SEARCH_PRODUCT,
        payload: axios.get('/api/v1/products/?search=' + fulltext)
    }
}


