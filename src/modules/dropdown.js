import axios from "axios";

const PRODUCT_TYPE = 'PRODUCT_TYPE';
const PRODUCT_TYPE_FULFILLED = 'PRODUCT_TYPE_FULFILLED';

const FORM_OPTIONS = 'FORM_OPTIONS';
const FORM_OPTIONS_FULFILLED = 'FORM_OPTIONS_FULFILLED';
const CONDITION_OPTIONS = 'CONDITION_OPTIONS';
const CONDITION_OPTIONS_FULFILLED = 'CONDITION_OPTIONS_FULFILLED';
const PACKAGE_TYPE_OPTIONS = 'PACKAGE_TYPE_OPTIONS';
const PACKAGE_TYPE_OPTIONS_FULFILLED = 'PACKAGE_TYPE_OPTIONS_FULFILLED';

export const initialState = {
    productType:{
        isPending: false,
        data:{
            productTypes: [{
                id: "",
                name: "",
            }]
        }
    },
    form:{
        isPending: false,
        data:{
            productForms: [{
                id: "",
                name: "",
            }]
        }
    },
    condition:{
        isPending: false,
        data:{
            productConditions: [{
                id: "",
                name: "",
            }]
        }
    },
    package:{
        isPending: false,
        data:{
            packageTypes: [{
                id: "",
                name: "",
            }]
        }
    },
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case PRODUCT_TYPE: {
            return {
                ...state,
                productType: {
                    isPending: true
                }
            }
        }
        case PRODUCT_TYPE_FULFILLED: {
            return {
                ...state,
                productType: {
                    isPending: false
                }
            }
        }
        case FORM_OPTIONS: {
            return {
                ...state,
                form: {
                    isPending: true,
                }
            }
        }
        case FORM_OPTIONS_FULFILLED: {
            return {
                ...state,
                form: {
                    isPending: false,
                }
            }
        }
        case CONDITION_OPTIONS: {
            return {
                ...state,
                condition: {
                    isPending: true,
                }
            }
        }
        case CONDITION_OPTIONS_FULFILLED: {
            return {
                ...state,
                condition: {
                    isPending: false,
                }
            }
        }
        case PACKAGE_TYPE_OPTIONS: {
            return {
                ...state,
                package: {
                    isPending: true,
                }
            }
        }
        case PACKAGE_TYPE_OPTIONS_FULFILLED: {
            return {
                ...state,
                package: {
                    isPending: false,
                }
            }
        }
        default: {
            return state
        }
    }
}

export function getProduct(id) {
    return {
        type: PRODUCT_TYPE,
        // axios.get('/api/v1/package-type/?' +id)
        payload: axios({
            method: 'get',
            url: '/api/v1/package-type/' + id,
        })
    }
}

export function getFormOptions(id) {
    return {
        type: FORM_OPTIONS,
        payload: axios({
            method: 'get',
            url: "/api/v1/product-forms/" + id,
        })
    }
}

export function getConditionOptions(id) {
    return {
        type: CONDITION_OPTIONS,
        payload: axios({
            method: 'get',
            url: "/api/v1/product-conditions/" + id,
        })
    }
}

export function getPackageTypeOptions(id) {
    return {
        type: PACKAGE_TYPE_OPTIONS,
        payload: axios({
            method: 'get',
            url: "/api/v1/package-types/" + id,
        })
    }
}






