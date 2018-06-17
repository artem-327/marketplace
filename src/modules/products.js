import axios from "axios";

const FETCH_PRODUCT_FORMS = 'PRODUCT_FORMS';
const FETCH_PRODUCT_FORMS_FULFILLED = 'PRODUCT_FORMS_FULFILLED';

const FETCH_PRODUCT_CONDITIONS = 'FETCH_PRODUCT_CONDITIONS';
const FETCH_PRODUCT_CONDITIONS_FULFILLED = 'FETCH_PRODUCT_CONDITIONS_FULFILLED';

const SEARCH_PRODUCT = 'SEARCH_PRODUCT';
const SEARCH_PRODUCT_PENDING = 'SEARCH_PRODUCT_PENDING';
const SEARCH_PRODUCT_FULFILLED = 'SEARCH_PRODUCT_FULFILLED';
const SEARCH_PRODUCT_REJECTED = 'SEARCH_PRODUCT_REJECTED';

export const initialState = {
    data: [],
    productForms: [],
    productConditions: [],
    isFetching: false
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_PRODUCT_FORMS_FULFILLED: {
            return {
                ...state,
                productForms: action.payload
            }
        }
        case FETCH_PRODUCT_CONDITIONS_FULFILLED: {
            return {
                ...state,
                productConditions: action.payload
            }
        }
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
                data: action.payload
            }
        }
        default: {
            return state
        }
    }
}


export function searchProducts(search) {
    return {
        type: SEARCH_PRODUCT,
        payload: axios.get('/api/v1/products/', {params:{search}}).then(response => response.data.data.products)
    }
}

export function fetchProductForms(filter = {}) {
    return {
        type: FETCH_PRODUCT_FORMS,
        payload: axios.get('/api/v1/product-forms/', {params: {...filter}}).then(result => result.data.data.productForms)
    }
}

export function fetchProductConditions(filter = {}) {
    return {
        type: FETCH_PRODUCT_CONDITIONS,
        payload: axios.get('/api/v1/product-conditions/', {params: {...filter}}).then(result => result.data.data.productConditions)
    }
}