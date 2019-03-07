import axios from 'axios';
import {transformRequestOptions, filterByUniqueProperty} from "../utils/functions";
import {
    PRODUCTOFFER_REMOVE_REQUESTED
} from "../constants/productOffers";
import FormData from 'form-data'

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
const LOAD_FILE = 'LOAD_FILE';
const ADD_ATTACHMENT = 'ADD_ATTACHMENT';
const ADD_ATTACHMENT_FULFILLED = 'ADD_ATTACHMENT_FULFILLED';
const REMOVE_ATTACHMENT = 'REMOVE_ATTACHMENT';
const REMOVE_ATTACHMENT_FULFILLED = 'REMOVE_ATTACHMENT_FULFILLED';
const REMOVE_ATTACHMENT_LINK = 'REMOVE_ATTACHMENT_LINK';
const REMOVE_ATTACHMENT_LINK_FULFILLED = 'REMOVE_ATTACHMENT_LINK_FULFILLED';
const LINK_ATTACHMENT = 'LINK_ATTACHMENT';
const ADD_PRODUCT_OFFER = 'ADD_PRODUCT_OFFER';
const ADD_PRODUCT_OFFER_FULFILLED = 'ADD_PRODUCT_OFFER_FULFILLED';
const RESET_PRODUCT_OFFER = 'RESET_PRODUCT_OFFER';
//const SAVE_INCREMENTAL_PRICING = 'SAVE_INCREMENTAL_PRICING';
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
    productOffersIsFetching: true,
    attachmentAdded: false
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
        case ADD_ATTACHMENT_FULFILLED: {
            return {
                ...state,
                attachmentAdded: true
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
    return {
        type: GET_PRODUCT_OFFERS_MY,
        payload: axios.get(
            "/prodex/api/product-offers/own/all",//! !
            //"/prodex/api/product-offers",
            {
                params: {
                    ...filter
                },
                'paramsSerializer': params => transformRequestOptions(params)}).then(response => {
                    const productOffers = response.data;
                    return filterByUniqueProperty(productOffers, "id") //dont show product offers with same id (synonyms)
                })
    }
}

export function fetchAllProductOffers(filter = {}) {
    return {
        type: GET_PRODUCT_OFFERS_ALL,
        payload: axios.get("/prodex/api/product-offers/broadcasted/all", {params: {...filter}, 'paramsSerializer': params => transformRequestOptions(params)}).then(response => {
            const productOffers = response.data;
            return filterByUniqueProperty(productOffers, "id")
        })
    }
}

export function fetchProductOffer(id) {
    return {
        type: GET_PRODUCT_OFFER,
        payload: axios.get(`/prodex/api/product-offers/${id}`).then(response => response.data)
    }
}

export function editProductOffer(id, inputs) {
    return {
        type: EDIT_PRODUCT_OFFER,
        payload: axios.patch(`/prodex/api/product-offers/${id}`, inputs)
    }
}

export function addProductOffer(inputs) {
    return {
        type: ADD_PRODUCT_OFFER,
        payload: axios.post('/prodex/api/product-offers', inputs)
    }
}

export function loadFile(attachment) {
    return {
        type: LOAD_FILE,
        payload: axios({
            baseURL: '',
            url: attachment.preview,
            method: "GET",
            responseType: "blob"
        }).then(r => new File([r.data], attachment.name, {type: attachment.type}))
    }
}

export function addAttachment(file, docType) {
    let data = new FormData()

    if (file)
        data.append('file', file, file.name);
    else
        return false

    return {
        type: ADD_ATTACHMENT,
        payload: axios.post(`/prodex/api/attachments?type=${docType}&isTemporary=true`, data, {headers: {
                'accept': 'application/json',
                'Accept-Language': 'en-US,en;q=0.8',
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`
            }})
    }
}

export function linkAttachment(isLot, itemId, aId) {
    return {
        type: LINK_ATTACHMENT,
        payload: axios.post(`/prodex/api/attachment-links/to-${isLot ? 'lot' : 'product-offer'}?attachmentId=${aId}&${isLot ? 'lotId' : 'productOfferId'}=${itemId}`)
    }
}

export function removeAttachmentLink(isLot, itemId, aId) {
    return {
        type: REMOVE_ATTACHMENT_LINK,
        payload: axios.delete(`/prodex/api/attachment-links/to-${isLot ? 'lot' : 'product-offer'}?attachmentId=${aId}&${isLot ? 'lotId' : 'productOfferId'}=${itemId}`)
    }
}

export function removeAttachment(aId) {
    return {
        type: REMOVE_ATTACHMENT,
        payload: axios.delete('/prodex/api/attachments/'+aId)
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
            payload: axios.get('/prodex/api/packaging-types', {params: {...pack}}).then(response => response.data)
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

export function deleteProductOffer(id, onSuccess) {
    return {type: PRODUCTOFFER_REMOVE_REQUESTED, payload: {id, onSuccess}} //TODO: refactor all product offers to saga, then remove onSuccess
}
