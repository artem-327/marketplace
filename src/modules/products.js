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
const FETCH_ORIGIN = 'FETCH_ORIGIN';
const FETCH_ORIGIN_PENDING = 'FETCH_ORIGIN_PENDING';
const FETCH_ORIGIN_FULFILLED = 'FETCH_ORIGIN_FULFILLED';
const SEARCH_PRODUCT = 'SEARCH_PRODUCT';
const SEARCH_PRODUCT_PENDING = 'SEARCH_PRODUCT_PENDING';
const MAP_PRODUCT = 'MAP_PRODUCT';
const MAP_PRODUCT_PENDING = 'MAP_PRODUCT_PENDING';
const MAP_PRODUCT_REJECTED = 'MAP_PRODUCT_REJECTED';
const MAP_PRODUCT_FULFILLED = 'MAP_PRODUCT_FULFILLED';
const SEARCH_PRODUCT_FULFILLED = 'SEARCH_PRODUCT_FULFILLED';
const SEARCH_PRODUCT_REJECTED = 'SEARCH_PRODUCT_REJECTED';
const SAVE_MAPPING = 'SAVE_MAPPING';
const SAVE_MAPPING_FULFILLED = 'SAVE_MAPPING_FULFILLED';
const FETCH_ALTERNATIVE_NAMES = 'FETCH_ALTERNATIVE_NAMES';
const FETCH_ALTERNATIVE_NAMES_FULFILLED = 'FETCH_ALTERNATIVE_NAMES_FULFILLED';
const FETCH_MANUFACTURER = 'FETCH_MANUFACTURER';
const FETCH_MANUFACTURER_PENDING = 'FETCH_MANUFACTURER_PENDING';
const FETCH_MANUFACTURER_FULFILLED = 'FETCH_MANUFACTURER_FULFILLED';
const FETCH_PACKAGING_TYPES = 'FETCH_PACKAGING_TYPES';
const FETCH_PACKAGING_TYPES_FULFILLED = 'FETCH_PACKAGING_TYPES_FULFILLED';

export const initialState = {
    productsMapping: {},
    productOffering: {},
    data: [],
    mappedData: [],
    productForms: [],
    productConditions: [],
    productGrade: [],
    productAge: [],
    location: [],
    recentProducts: [],
    origin: [],
    manufacturer:[],
    packagingTypes:[],
    isFetchingManufacturer: false,
    isFetching: false,
    isMapFetching: false,
    alternativeNames: [],
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_PRODUCT_FORMS_FULFILLED: {
            return {
                ...state,
                productForms: action.payload
            }
        }
        case FETCH_MANUFACTURER_PENDING:{
            return {
                ...state,
                isFetchingManufacturer: true
            }
        }
        case FETCH_MANUFACTURER_FULFILLED:{
            return {
                ...state,
                isFetchingManufacturer: false,
                manufacturer: action.payload
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
        case FETCH_ORIGIN_PENDING: {
            return {
                ...state,
                isFetchingOrigin: true,
            }
        }
        case FETCH_ORIGIN_FULFILLED: {
            return {
                ...state,
                isFetchingOrigin: false,
                origin: action.payload
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
        case SAVE_MAPPING_FULFILLED: {
            return{
                ...state,
                products: {
                    isFetching: false,
                }
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
        case FETCH_ALTERNATIVE_NAMES_FULFILLED:{
            return{
                ...state,
                alternativeNames: action.payload
            }
        }
        case FETCH_PACKAGING_TYPES_FULFILLED:{
            return{
                ...state,
                packagingTypes: action.payload
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
        payload: axios.get('/api/726euu/products/', {params:{search}}).then(response => response.data.data.products)
    }
}

export function mapProducts(map) {
    return {
        type: MAP_PRODUCT,
        payload: axios.get('/api/7e2kk2/product-templates/', {params:{map}}).then(response => response.data.data.productTemplates)
    }
}

export function fetchManufacturer(filter = "") {
    return {
        type: FETCH_MANUFACTURER,
        payload: axios.get('/api/pu3wz7/manufacturers/', {params: {search: filter}}).then(result => result.data.data.manufacturers)
    }
}

export function fetchProductForms(filter = {}) {
    return {
        type: FETCH_PRODUCT_FORMS,
        payload: axios.get('/api/424dvx/product-forms/', {params: {...filter}}).then(result => result.data.data.productForms)
    }
}

export function fetchProductConditions(filter = {}) {
    return {
        type: FETCH_PRODUCT_CONDITIONS,
        payload: axios.get('/api/1tgusy/product-conditions/', {params: {...filter}}).then(result => result.data.data.productConditions)
    }
}

export function fetchProductGrade(filter = {}) {
    return {
        type: FETCH_PRODUCT_GRADE,
        payload: axios.get('/api/f33eq0/product-grades/', {params: {...filter}}).then(result => result.data.data.productGrades)
    }
}

export function fetchOrigin(filter = "") {
    return {
        type: FETCH_ORIGIN,
        payload: axios.get('/api/la9pxl/origins/', {params: {search: filter}}).then(result => result.data.data.origins)
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
        payload: axios.get('/api/726euu/products/', {params:{
            srtb: 'updatedAt', lmt: limit
        }}).then(result => result.data.data.products)
    }
}

export function saveMapping(values) {
    return {
        type: SAVE_MAPPING,
        payload: axios.post("/api/h5g8qn/product-templates/", values)
    }
}

export function fetchAlternativeNames(id){
    return {
        type: FETCH_ALTERNATIVE_NAMES,
        payload: Promise.resolve({
            "data": {
                "alternativeNames": [
                    {
                        "id": 1,
                        "alternativeName": "Elon"
                    },
                    {
                        "id": 2,
                        "alternativeName": "Musk"
                    },
                    {
                        "id": 3,
                        "alternativeName": "Must"
                    },
                    {
                        "id": 4,
                        "alternativeName": "Sleep"
                    },
                ]
            },
            "status": "success"
        }).then(result => result.data.alternativeNames)
    }
}

export function fetchPackagingTypes(filter = {}){
    return {
        type: FETCH_PACKAGING_TYPES,
        payload: axios.get('/api/e49sy3/containers/', {params: {...filter}}).then(result => result.data.data.containers)
    }
}