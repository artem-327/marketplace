import axios from "axios";
import origin from '../components/Dropdown/unitedStates';


const PACKAGE_OPTIONS = 'PACKAGE_OPTIONS';
const PACKAGE_OPTIONS_FULFILLED = 'PACKAGE_OPTIONS_FULFILLED';
const MANUFACTURER = 'MANUFACTURER';
const MANUFACTURER_FULFILLED = 'MANUFACTURER_FULFILLED';
const PRICING_UNITS = 'PRICING_UNITS';
const PRICING_UNITS_FULFILLED = 'PRICING_UNITS_FULFILLED';
export const initialState = {
    units:{
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
    state:{
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
                units:{
                    ...state.units,
                    options: action.payload.units
                },
                package: {
                    ...state.package,
                    isPending: false,
                    options: action.payload.packageTypes
                }
            }
        }
        case MANUFACTURER_FULFILLED: {
            return {
                ...state,
                manufacturer: {
                    ...state.manufacturer,
                    isPending: false,
                    options: action.payload.data.data.manufacturers
                }
            }
        }
        case PRICING_UNITS_FULFILLED: {
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
        payload: axios.get("/api/v1/package-types/", {params:{productType}}).then(result => {
            let final = [{id: result.data.data.packageTypes[0].id, name: result.data.data.packageTypes[0].name, measureType: result.data.data.packageTypes[0].measureType}];
            let units = [{id: result.data.data.packageTypes[0].unit, name: result.data.data.packageTypes[0].unit,}];
            result.data.data.packageTypes.map((pck)=>{
                for(let i = 0; i < final.length; i++){
                    if(pck.name === final[i].name) break;
                    if(i === final.length-1){
                        final.push({id: pck.id, name: pck.name, measureType: pck.measureType})
                    }
                }
                for(let i = 0; i < units.length; i++){
                    if(pck.unit === units[i].name) break;
                    if(i === units.length-1){
                        units.push({id: pck.unit, name: pck.unit})
                    }
                }
            });
            return {packageTypes: final, units: units}
        })
    }
}

export function getManufacturer() {
    return {
        type: MANUFACTURER,
        payload: axios.get("/api/v1/manufacturers/")
    }
}

export function getPricingUnits() {

    return {
        type: PRICING_UNITS,
        payload: Promise.resolve(
            {
                "data": {
                    "pricingUnits": [
                        {
                            "id": "USD",
                            "name": "USD"
                        }
                    ]
                },
                "status": "success"
            })
        }
    }







