import axios from 'axios';
import {transformRequestOptions, filterByUniqueProperty} from "../utils/functions";
import {
    PRODUCTOFFER_REMOVE_REQUESTED,
    PRODUCTOFFER_REMOVE_FAILED,
    PRODUCTOFFER_REMOVE_SUCCEEDED,
} from "../constants/productOffers";

const GET_PRODUCT_OFFERS_MY = 'GET_PRODUCT_OFFERS_MY';
const GET_PRODUCT_OFFERS_MY_FULFILLED = 'GET_PRODUCT_OFFERS_MY_FULFILLED';
const GET_PRODUCT_OFFERS_MY_PENDING = 'GET_PRODUCT_OFFERS_MY_PENDING';
const GET_PRODUCT_OFFERS_ALL = 'GET_PRODUCT_OFFERS_ALL';
const GET_PRODUCT_OFFERS_ALL_FULFILLED = 'GET_PRODUCT_OFFERS_ALL_FULFILLED';
const GET_PRODUCT_OFFERS_ALL_PENDING = 'GET_PRODUCT_OFFERS_ALL_PENDING';
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
const DELETE_PRODUCT_OFFERS_LIST = 'DELETE_PRODUCT_OFFERS_LIST';

export const initialState = {
    myProductOffers: [],
    allProductOffers: [],
    addProductOffer: {},
    isFetching: true,
    unitOfMeasurement: [],
    unitOfPackaging: [],
    productOffer: {},
    productOfferFetching: true,
    productOffersIsFetching: true
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case DELETE_PRODUCT_OFFERS_LIST: {
            return {
                ...state,
                isFetching: true,
                myProductOffers: [],
                allProductOffers: []
            }
        }
        case GET_PRODUCT_OFFERS_MY_PENDING: {
            return {
                ...state,
                myProductOffers: [],
                isFetching: true,
            }
        }
        case GET_PRODUCT_OFFERS_MY_FULFILLED: {
            return {
                ...state,
                myProductOffers: action.payload,
                isFetching: false
            }
        }
        case GET_PRODUCT_OFFERS_ALL_PENDING: {
            return {
                ...state,
                allProductOffers: [],
                productOffersIsFetching: true,
            }
        }
        case GET_PRODUCT_OFFERS_ALL_FULFILLED: {
            return {
                ...state,
                allProductOffers: action.payload,
                productOffersIsFetching: false
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

export function deleteProductOffersList(){
    return {type: DELETE_PRODUCT_OFFERS_LIST}
}

export function fetchMyProductOffers(filter = {}) {
    let mrchnt = true;
    return {
        type: GET_PRODUCT_OFFERS_MY,
        payload: axios.get("/prodex/api/product-offers", {params: {...filter, mrchnt}, 'paramsSerializer': params => transformRequestOptions(params)}).then(response => {
            const productOffers = response.data;
            return filterByUniqueProperty(productOffers, "id") //dont show product offers with same id (synonyms)
        })
    }
}

export function fetchAllProductOffers(filter = {}) {
    let mrchnt = false;

    return {
        type: GET_PRODUCT_OFFERS_ALL,
        payload: axios.get("/prodex/api/product-offers", {params: {...filter, mrchnt}, 'paramsSerializer': params => transformRequestOptions(params)}).then(response => {
            const productOffers = response.data;
            return filterByUniqueProperty(productOffers, "id")
        })
    }
}

export function fetchProductOffer(id) {
    return {
        type: GET_PRODUCT_OFFER,
        payload: axios.get(`/prodex/api/product-offers/${id}`).then(response => response.data.productOffer)
    }
}

export function editProductOffer(id, inputs) {
    return {
        type: EDIT_PRODUCT_OFFER,
        payload: axios.put(`/prodex/api/product-offers/${id}`, inputs)
    }
}

export function addProductOffer(inputs) {
    return {
        type: ADD_PRODUCT_OFFER,
        payload: axios.post('/prodex/api/product-offers', inputs)
    }
}

export function getUnitOfMeasurement() {
    return {
        type: GET_UNIT_OF_MEASUREMENT,
        payload: axios.get("/prodex/api/units").then(result => result.data)
    }
}

export function getUnitOfPackaging(pack) {
        return {
            type: GET_UNIT_OF_PACKAGING,
            payload: axios.get('/prodex/api/containers', {params: {...pack}}).then(response => response.data)
        }
    }
// unused
// export function saveIncrementalPricing(from, to, price, quantityDiscount = 1){
//     const data = {
//         quantityFrom:from,
//         quantityTo:to,
//         price:price,
//         quantityDiscount,
//     }
//     return {
//         type: SAVE_INCREMENTAL_PRICING,
//         payload: axios.post('/prodex/api/v1/discount-level/', data)
//     }
// }

export function removeProductOffer(id, onSuccess) {
    return {type: PRODUCTOFFER_REMOVE_REQUESTED, payload: {id, onSuccess}} //TODO: refactor all product offers to saga, then remove onSuccess
}
