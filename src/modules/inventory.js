import axios from "axios";

const ADD_LOCATION = 'ADD_LOCATION';
const ADD_LOCATION_PENDING = 'ADD_LOCATION_PENDING';
const ADD_LOCATION_FULFILLED = 'ADD_LOCATION_FULFILLED';
const ADD_LOCATION_REJECTED = 'ADD_LOCATION_REJECTED';
const ADD_PRODUCT_OFFER = 'ADD_PRODUCT_OFFER';
// const ADD_PRODUCT_OFFER_PENDING = 'ADD_PRODUCT_OFFER_PENDING';
const ADD_PRODUCT_OFFER_FULFILLED = 'ADD_PRODUCT_OFFER_FULFILLED';
// const ADD_PRODUCT_OFFER_REJECTED = 'ADD_PRODUCT_OFFER_REJECTED';


export const initialState = {
    location:{
        isPending: false,
        isValid: false,
        hasError: false,
        data:{
            warehouse: "",
            warehouseName: "",
            address: "",
            city: "",
            state: "",
            zip: "",
            contact: "",
            number: "",
            email: "",
        }
    },
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
    }
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ADD_LOCATION_PENDING: {
            return {
                ...state,
                location:{
                    isPending: true,
                    isValid: false,
                    hasError: false,
                }
            }
        }
        case ADD_LOCATION_FULFILLED: {
            return {
                ...state,
                location:{
                    isPending: false,
                    isValid: true,
                    hasError: false,
                }
            }
        }
        case ADD_LOCATION_REJECTED: {
            return {
                ...state,
                location:{
                    isPending: false,
                    isValid: false,
                    hasError: true,
                }
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

export function addLocation(country, state, city, address) {
    return {
        type: ADD_LOCATION,
        payload: axios({
            method: 'post',
            url: "/api/v1/locations/",
            data: {
                country,
                state,
                city,
                address
            }
        })
    }
}

export function addProductOffer(quantity, amount, expirationDate, price, product, manufacturer, productCondition, productForm) {
    return {
        type: ADD_PRODUCT_OFFER,
        payload: axios({
            method: 'post',
            url: "/api/v1/product-offer/",
            data: {
                quantity,
                amount,
                expirationDate,
                price,
                product,
                manufacturer,
                productCondition,
                productForm
            }
        })
    }
}


