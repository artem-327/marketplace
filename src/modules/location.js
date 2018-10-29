import axios from "axios";
import {
    REGIONS_FETCH_SUCCEEDED, REGIONS_FETCH_REQUESTED,
    STATES_FETCH_REQUESTED, STATES_FETCH_SUCCEEDED,
    STATEDETAIL_FETCH_REQUESTED, STATEDETAIL_FETCH_SUCCEEDED,
} from "../constants/locations";

const FETCH_WAREHOUSE = 'FETCH_WAREHOUSE';
const FETCH_WAREHOUSE_FULFILLED = 'FETCH_WAREHOUSE_FULFILLED';

const FETCH_LOCATIONS = 'FETCH_LOCATIONS';
const FETCH_LOCATIONS_PENDING = 'FETCH_LOCATIONS_PENDING';
const FETCH_LOCATIONS_FULFILLED = 'FETCH_LOCATIONS_FULFILLED';

const SAVE_WAREHOUSE = 'SAVE_WAREHOUSE';
const UPDATE_WAREHOUSE = 'UPDATE_WAREHOUSE';

export const initialState = {
    isPending: false,
    isValid: false,
    hasError: false,
    warehouse: [],
    locations: [],
    regions: [],
    states: [],
    stateDetail: {},
    isFetching: false,
    locationFetching: false,
    data:{}
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_LOCATIONS_PENDING: {
            return {
                ...state,
                locationFetching: true
            }
        }
        case FETCH_WAREHOUSE_FULFILLED: {
            return {
                ...state,
                warehouse: action.payload
            }
        }

        case FETCH_LOCATIONS_FULFILLED: {
            return {
                ...state,
                locationFetching: false,
                locations: action.payload
            }
        }


        case STATEDETAIL_FETCH_REQUESTED: 
        case STATES_FETCH_REQUESTED: 
        case REGIONS_FETCH_REQUESTED: {
            return {
                ...state,
                isFetching: true,
            }
        }
        case REGIONS_FETCH_SUCCEEDED: {
            return {
                ...state,
                regions: action.payload,
                isFetching: false
            }
        }
        case STATES_FETCH_SUCCEEDED: {
            return {
                ...state,
                states: action.payload,
                isFetching: false
            }
        }

        case STATEDETAIL_FETCH_SUCCEEDED: {
            return {
                ...state,
                stateDetail: action.payload,
                isFetching: false
            }
        }
        default: {
            return state
        }
    }
}

export function fetchLocations(filter = {}){
    return {
        type: FETCH_LOCATIONS,
        payload: axios.get('/api/t7r1bn/locations/', {params: {...filter}}).then(result => {
            return result.data.data.locations.map((loc)=> {
                return {
                    id: loc.id,
                    name: loc.state
                }
            })
        })
    }
}

export function fetchWarehouse(){
    return {
        type: FETCH_WAREHOUSE,
        payload: axios.get('/api/smg5uw/warehouses/').then(result => {return result.data.data.warehouses})
    }
}

export function saveWarehouse(name, address, city, location, contactName, contactNumber, contactEmail, zip) {
    return {
        type: SAVE_WAREHOUSE,
        payload: axios.post('/api/mvz5k1/warehouses/', {name, address, city, location, contactName, contactNumber, contactEmail, zip})
    }
}

export function updateWarehouse(id, name, address, city, location, contactName, contactNumber, contactEmail, zip){
    return {
        type: UPDATE_WAREHOUSE,
        payload: axios.put(`/api/105e6h/warehouses/${id}/`, {name, address, city, location, contactName, contactNumber, contactEmail, zip})
    }
}

export function fetchRegions(){
    return {type: REGIONS_FETCH_REQUESTED}
}

export function fetchStates(){
    return {type: STATES_FETCH_REQUESTED}
}

export function fetchStateDetail(id) {
    return {type: STATEDETAIL_FETCH_REQUESTED, payload: {id}}
}