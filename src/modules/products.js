import axios from "axios";

const FETCH_PRODUCT_FORMS = 'PRODUCT_FORMS';
const FETCH_PRODUCT_FORMS_FULFILLED = 'PRODUCT_FORMS_FULFILLED';

const FETCH_PRODUCT_CONDITIONS = 'FETCH_PRODUCT_CONDITIONS';
const FETCH_PRODUCT_CONDITIONS_FULFILLED = 'FETCH_PRODUCT_CONDITIONS_FULFILLED';

const FETCH_PRODUCT_GRADE = 'FETCH_PRODUCT_GRADE';
const FETCH_PRODUCT_GRADE_FULFILLED = 'FETCH_PRODUCT_GRADE_FULFILLED';

const FETCH_PRODUCT_AGE = 'FETCH_PRODUCT_AGE';
const FETCH_PRODUCT_AGE_FULFILLED = 'FETCH_PRODUCT_AGE_FULFILLED';

const FETCH_RECEANT_ADDED_PRODUCTS = 'FETCH_RECEANT_ADDED_PRODUCTS';
const FETCH_RECEANT_ADDED_PRODUCTS_FULFILLED = 'FETCH_RECEANT_ADDED_PRODUCTS_FULFILLED';

const SEARCH_PRODUCT = 'SEARCH_PRODUCT';
const SEARCH_PRODUCT_PENDING = 'SEARCH_PRODUCT_PENDING';

const MAP_PRODUCT = 'MAP_PRODUCT';
const MAP_PRODUCT_PENDING = 'MAP_PRODUCT_PENDING';
const MAP_PRODUCT_REJECTED = 'MAP_PRODUCT_REJECTED';
const MAP_PRODUCT_FULFILLED = 'MAP_PRODUCT_FULFILLED';

const SEARCH_PRODUCT_FULFILLED = 'SEARCH_PRODUCT_FULFILLED';
const SEARCH_PRODUCT_REJECTED = 'SEARCH_PRODUCT_REJECTED';

export const initialState = {
    data: [],
    mappedData: [],
    productForms: [],
    productConditions: [],
    productGrade: [],
    productAge: [],
    location: [],
    recentProducts: [],
    isFetching: false,
    isMapFetching: false
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
        case FETCH_PRODUCT_GRADE_FULFILLED: {
            return {
                ...state,
                productGrade: action.payload
            }
        }
        case FETCH_PRODUCT_AGE_FULFILLED: {
            return {
                ...state,
                productAge: action.payload
            }
        }
        case FETCH_RECEANT_ADDED_PRODUCTS_FULFILLED: {
            return {
                ...state,
                recentProducts: action.payload
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
        case MAP_PRODUCT_PENDING: {
            return{
                ...state,
                isMapFetching: true,
            }
        }
        case MAP_PRODUCT_REJECTED: {
            return{
                ...state,
                isMapFetching: false,
            }
        }
        case MAP_PRODUCT_FULFILLED: {
            return{
                ...state,
                isMapFetching: false,
                mappedData: action.payload
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
export function mapProducts(map) {
    return {
        type: MAP_PRODUCT,
        payload: axios.get('/api/v1/product-templates/', {params:{map}}).then(response => response.data.data.productTemplates)
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

export function fetchProductGrade(filter = {}) {
    return {
        type: FETCH_PRODUCT_GRADE,
        payload: axios.get('/api/v1/product-grades/', {params: {...filter}}).then(result => result.data.data.productGrades)
    }
}

export function fetchProductAge() {
    return {
        type: FETCH_PRODUCT_AGE,
        payload: [
            {
                id:1,
                name:'0 - 3 months'
            },
            {
                id:2,
                name:'3 - 6 months'
            },
            {
                id:3,
                name:'6 - 9 months'
            },
            {
                id:4,
                name:'9 - 12 months'
            },
            {
                id:5,
                name:'12+ months'
            },
            {
                id:6,
                name:'Custom Product Age'
            }
        ]
    }
}

export function fetchRecentAddedProducts(limit = 3) {
    return {
        type: FETCH_RECEANT_ADDED_PRODUCTS,
        payload: axios.get('/api/v1/products/', {params:{
            srtb: 'updatedAt', lmt: limit
        }}).then(result => result.data.data.products)
    }
}
