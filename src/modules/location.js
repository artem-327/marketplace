import axios from "axios";

const FETCH_WAREHOUSE = 'FETCH_WAREHOUSE';
const FETCH_WAREHOUSE_FULFILLED = 'FETCH_WAREHOUSE_FULFILLED';


export const initialState = {
    isPending: false,
    isValid: false,
    hasError: false,
    warehouse: [],
    data:{}
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_WAREHOUSE_FULFILLED: {
            return {
                ...state,
                warehouse: action.payload
            }
        }

        default: {
            return state
        }
    }
}

export function fetchWarehouse(){
    return {
        type: FETCH_WAREHOUSE,
        payload: axios.get('/api/v1/locations/').then(result => {
            return result.data.data.locations.map((loc)=> {
                return {
                    ...loc,
                    name: loc.address
                }
            })
        })
    }
}

export function addLocation(country, state, city, address) {
}

export function editLocation(){

}



