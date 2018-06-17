import axios from 'axios';
import {filterNonEmptyAttributes} from "../utils/functions";


const GET_PRODUCT_OFFERS = 'GET_PRODUCT_OFFERS';
const GET_PRODUCT_OFFERS_FULFILLED = 'GET_PRODUCT_OFFERS_FULFILLED';
const GET_PRODUCT_OFFERS_PENDING = 'GET_PRODUCT_OFFERS_PENDING';

const ADD_PRODUCT_OFFER = 'ADD_PRODUCT_OFFER';
const ADD_PRODUCT_OFFER_FULFILLED = 'ADD_PRODUCT_OFFER_FULFILLED';


export const initialState = {
    data: [],
    isFetching: false,
    productType: null,
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
        default: {
            return state
        }
    }
}

export function fetchAll(filter = {}) {
    return {
        type: GET_PRODUCT_OFFERS,
        payload: axios.get("/api/v1/product-offers/", {params: {...filterNonEmptyAttributes(filter)}}).then(response => response.data.data.productOffers)
    }
}

export function addProductOffer(quantity, amount, expirationDate, price, product, manufacturer, productCondition, productForm) {
    return {
        type: ADD_PRODUCT_OFFER,
        payload: axios.post('/api/v1/product-offers/', {
            quantity,
            amount,
            expirationDate,
            price,
            product,
            manufacturer,
            productCondition,
            productForm
        })
    }
}


