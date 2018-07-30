import axios from 'axios';

const GET_PRODUCT_OFFERS = 'GET_PRODUCT_OFFERS';
const GET_PRODUCT_OFFERS_FULFILLED = 'GET_PRODUCT_OFFERS_FULFILLED';
const GET_PRODUCT_OFFERS_PENDING = 'GET_PRODUCT_OFFERS_PENDING';

const ADD_PRODUCT_OFFER = 'ADD_PRODUCT_OFFER';
const ADD_PRODUCT_OFFER_FULFILLED = 'ADD_PRODUCT_OFFER_FULFILLED';

const RESET_PRODUCT_OFFER = 'RESET_PRODUCT_OFFER';

const SEARCH_ORIGIN = 'SEARCH_ORIGIN';
const SEARCH_ORIGIN_PENDING = 'SEARCH_ORIGIN_PENDING';
const SEARCH_ORIGIN_FULFILLED = 'SEARCH_ORIGIN_FULFILLED';
const SEARCH_ORIGIN_REJECTED = 'SEARCH_ORIGIN_REJECTED';


export const initialState = {
    data: [],
    addProductOffer: {},
    isFetching: false,
    products:{
        isPending: false,
        isValid: false,
        hasError: false,
        data:{
            totalPackages: "",
            packaging: "",
            packageSize: "",
            price: "",
            pricingUnits: "",
            manufacturer: "",
            origin: "",
            form: "",
            assayMin: "",
            assayMax: "",
            grade: "",
            condition: "",
            rulesSplitPackages: "",
            rulesMinimumPackages: "",
            rulesIncrementalPricing: "",
            broadcastSplitPackages: "",
            broadcastMinimumPackages: "",
            broadcastIncrementalPricing: "",
        }
    },
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
        case RESET_PRODUCT_OFFER: {
            return {
                ...state,
                addProductOffer: {}
            }
        }
        case SEARCH_ORIGIN_PENDING: {
            return{
                ...state,
                isFetching: true,
            }
        }
        case SEARCH_ORIGIN_REJECTED: {
            return{
                ...state,
                isFetching: false,
            }
        }
        case SEARCH_ORIGIN_FULFILLED: {
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

export function fetchAll(filter = {}, mrchnt=true) {
    return {
        type: GET_PRODUCT_OFFERS,
        payload: axios.get("/api/v1/product-offers/", {params: {...filter, mrchnt}}).then(response => response.data.data.productOffers)
    }
}

export function searchOrigin(origin) {
    return {
        type: SEARCH_ORIGIN,
        payload: axios.get("/api/v1/product-offers/", {params: {...origin}}).then(response => response.data.data.productOffers)
    }
}

export function addProductOffer(inputs) {
    return {
        type: ADD_PRODUCT_OFFER,
        payload: axios.post('/api/v1/product-offers/', inputs)
    }
}

export function resetForm() {
    return {
        type: RESET_PRODUCT_OFFER,
    }
}


