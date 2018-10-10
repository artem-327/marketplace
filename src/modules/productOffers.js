import axios from 'axios';

const GET_PRODUCT_OFFERS = 'GET_PRODUCT_OFFERS';
const GET_PRODUCT_OFFERS_FULFILLED = 'GET_PRODUCT_OFFERS_FULFILLED';
const GET_PRODUCT_OFFERS_PENDING = 'GET_PRODUCT_OFFERS_PENDING';
const GET_PRODUCT_OFFER = 'GET_PRODUCT_OFFER';
const GET_PRODUCT_OFFER_FULFILLED = 'GET_PRODUCT_OFFER_FULFILLED';
const GET_PRODUCT_OFFER_PENDING = 'GET_PRODUCT_OFFER_PENDING';
const EDIT_PRODUCT_OFFER = 'EDIT_PRODUCT_OFFER';
const GET_UNIT_OF_MEASUREMENT = 'GET_UNIT_OF_MEASUREMENT';
const GET_UNIT_OF_MEASUREMENT_FULFILLED = 'GET_UNIT_OF_MEASUREMENT_FULFILLED';
const GET_UNIT_OF_PACKAGING = 'GET_UNIT_OF_PACKAGING';
const GET_UNIT_OF_PACKAGING_FULFILLED = 'GET_UNIT_OF_PACKAGING_FULFILLED';
const ADD_PRODUCT_OFFER = 'ADD_PRODUCT_OFFER';
const ADD_PRODUCT_OFFER_FULFILLED = 'ADD_PRODUCT_OFFER_FULFILLED';
const RESET_PRODUCT_OFFER = 'RESET_PRODUCT_OFFER';
const SAVE_INCREMENTAL_PRICING = 'SAVE_INCREMENTAL_PRICING';

export const initialState = {
    data: [],
    addProductOffer: {},
    isFetching: false,
    unitOfMeasurement: [],
    unitOfPackaging: [],
    productOffer: {},
    productOfferFetching: true,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCT_OFFERS_PENDING: {
            return {
                ...state,
                isFetching: true,
            }
        }
        case GET_PRODUCT_OFFERS_FULFILLED: {
            return {
                ...state,
                data: action.payload,
                isFetching: false
            }
        }
        case GET_PRODUCT_OFFER_PENDING: {
            return {
                ...state,
                productOfferFetching: true,
            }
        }
        case GET_PRODUCT_OFFER_FULFILLED: {
            return {
                ...state,
                productOfferFetching: false,
                productOffer: action.payload
            }
        }
        case ADD_PRODUCT_OFFER_FULFILLED: {
            return {
                ...state,
                products:{
                    isPending: false,
                    isValid: true,
                    hasError: false,
                }
            }
        }
        case GET_UNIT_OF_MEASUREMENT_FULFILLED: {
            return {
                ...state,
                unitOfMeasurement: action.payload
            }
        }
        case GET_UNIT_OF_PACKAGING_FULFILLED: {
            return {
                ...state,
                unitOfPackaging: action.payload
            }
        }
        case RESET_PRODUCT_OFFER: {
            return {
                ...state,
                addProductOffer: {}
            }
        }

        default: {
            return state
        }
    }
}

export function fetchAll(filter = {}, mrchnt=true) {
    return {
        type: GET_PRODUCT_OFFERS,
        payload: axios.get("/api/v1/product-offers/", {params: {...filter, mrchnt}}).then(response => response.data.data.productOffers)
    }
}

export function fetchProductOffer(id) {
    return {
        type: GET_PRODUCT_OFFER,
        payload: axios.get(`/api/ux92h9/product-offers/${id}/`).then(response => response.data.data.productOffer)
    }
}

export function editProductOffer(id, inputs) {
    return {
        type: EDIT_PRODUCT_OFFER,
        payload: axios.put(`/api/96knjR/product-offers/${id}/`, inputs)
    }
}

export function addProductOffer(inputs) {
    return {
        type: ADD_PRODUCT_OFFER,
        payload: axios.post('/api/v1/product-offers/', inputs)
    }
}

export function getUnitOfMeasurement() {
    return {
        type: GET_UNIT_OF_MEASUREMENT,
        payload: axios.get("/api/v1/units/").then(result => result.data.data.units)
    }
}

export function getUnitOfPackaging(pack) {
        return {
            type: GET_UNIT_OF_PACKAGING,
            payload: axios.get('/api/v1/containers/', {params: {...pack}}).then(response => response.data.data.containers)
        }
    }

export function saveIncrementalPricing(from, to, price, quantityDiscount = 1){
    const data = {
        quantityFrom:from,
        quantityTo:to,
        price:price,
        quantityDiscount,
    }
    return {
        type: SAVE_INCREMENTAL_PRICING,
        payload: axios.post('/api/v1/discount-level/', data)
    }
}


