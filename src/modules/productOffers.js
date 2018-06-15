import axios from 'axios';

//Veškeré konstanty pro tento reducer
const GET_PRODUCT_OFFER = 'GET_PRODUCT_OFFER';
const GET_PRODUCT_OFFER_FULFILLED = 'GET_PRODUCT_OFFER_FULFILLED';
const GET_PRODUCT_OFFER_PENDING = 'GET_PRODUCT_OFFER_PENDING';
const ADD_PRODUCT_OFFER = 'ADD_PRODUCT_OFFER';
const ADD_PRODUCT_OFFER_FULFILLED = 'ADD_PRODUCT_OFFER_FULFILLED';
const GET_PRODUCT = 'GET_PRODUCT';
const GET_PRODUCT_FULFILLED = 'GET_PRODUCT_FULFILLED';

export const initialState = {
    data: [],
    isFetching: true,
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
        case GET_PRODUCT_OFFER_PENDING: {
            return {
                ...state,
                isFetching: true,
            }
        }
        case GET_PRODUCT_OFFER_FULFILLED: {
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
        case GET_PRODUCT_FULFILLED: {
            return {
                ...state,
                productType: 'ProductType'
            }
        }
        default: {
            return state
        }
    }
}

export function fetchAll(filter = {}) {
    return {
        type: GET_PRODUCT_OFFER,
        payload: axios({
            method: 'get',
            url: "/api/v1/product-offers/",
            params: {
                search: filter.search,
                qntylb: filter.qntylb,
                qntyub: filter.qntyub,
                prclb: filter.prclb,
                prcub: filter.prcub,
                loc: filter.loc,
                pckgs: filter.pckgs
            }
        }).then((response) => {
            return response.data.data.productOffers
        })
    }
}

export function addProductOffer(quantity, amount, expirationDate, price, product, manufacturer, productCondition, productForm) {
    return {
        type: ADD_PRODUCT_OFFER,
        payload: axios({
            method: 'post',
            url: "/api/v1/product-offers/",
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

export function getProduct(id) {
    return {
        type: GET_PRODUCT,
        payload: axios({
            method: 'get',
            url: "/api/v1/product-types/",
            params: {
                id
            }
        })
    }
}
