import axios from "axios";
import origin from '../components/Dropdown/unitedStates';


const PACKAGE_OPTIONS = 'PACKAGE_OPTIONS';
const PACKAGE_OPTIONS_FULFILLED = 'PACKAGE_OPTIONS_FULFILLED';
const MANUFACTURER = 'MANUFACTURER';
const MANUFACTURER_FULFILLED = 'MANUFACTURER_FULFILLED';
const PRICING_UNITS = 'PRICING_UNITS';
const PRICING_UNITS_FULFILLED = 'PRICING_UNITS_FULFILLED';
export const initialState = {
    warehouse:{
        isPending: false,
        options: []
    },
    state:{
        isPending: false,
        options: []
    },
    package:{
        isPending: false,
        options: []
    },
    pricingUnits:{
        isPending: false,
        options: []
    },
    manufacturer:{
        isPending: false,
        options: []
    },
    origin:{
        isPending: false,
        options: origin
    },
    grade:{
        isPending: false,
        options: []
    },
    condition:{
        isPending: false,
        options: []
    },
    incrementalPricing:{
        isPending: false,
        options: []
    }
    };

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case PACKAGE_OPTIONS_FULFILLED: {
            return {
                ...state,
                package: {
                    ...state.package,
                    isPending: false,
                    options: action.payload.data.data.packageTypes
                }
            }
        }
        case MANUFACTURER_FULFILLED: {
            return {
                ...state,
                manufacturer: {
                    ...state.manufacturer,
                    isPending: false,
                    options: action.payload.data.data.merchants
                }
            }
        }
        case PRICING_UNITS_FULFILLED: {
            console.log(action.payload)
            return {
                ...state,
                pricingUnits: {
                    ...state.pricingUnits,
                    isPending: false,
                    options: action.payload.data.pricingUnits
                }
            }
        }
        default: {
            return state
        }
    }
}



export function getPackageOptions(productType) {
    return {
        type: PACKAGE_OPTIONS,
        payload: axios({
            method: 'get',
            url: "/api/v1/package-types/" + productType,
        })
    }
}

export function getManufacturer() {
    return {
        type: MANUFACTURER,
        payload: axios({
            method: 'get',
            url: "/api/v1/manufacturer/",
        })
    }
}

export function getPricingUnits() {

    return {
        type: PRICING_UNITS,
        // payload: axios({
        //     method: 'get',
        //     url: "/api/v1/manufacturer/",
        payload: Promise.resolve(
            {
                "data": {
                    "pricingUnits": [
                        {
                            "id": 1,
                            "name": "USD"
                        }
                    ]
                },
                "status": "success"
            })
        }
    }







