import axios from "axios";

const FETCH_WAREHOUSE = 'FETCH_WAREHOUSE';
const FETCH_WAREHOUSE_FULFILLED = 'FETCH_WAREHOUSE_FULFILLED';

const SAVE_WAREHOUSE = 'SAVE_WAREHOUSE';
const UPDATE_WAREHOUSE = 'UPDATE_WAREHOUSE';

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
        payload: axios.get('/api/v1/warehouses/').then(result => {return result.data.data.warehouses})
    }
}

export function saveWarehouse(name, address, city, state, contactName, contactNumber, contactEmail, zip) {
    return {
        type: SAVE_WAREHOUSE,
        payload: axios.post('/api/v1/warehouses/', {name, address, city, state, contactName, contactNumber, contactEmail, zip})
    }
}

export function updateWarehouse(id, name, address, city, state, contactName, contactNumber, contactEmail, zip){
    return {
        type: UPDATE_WAREHOUSE,
        payload: axios.put('/api/v1/warehouses/' + id, {name, address, city, state, contactName, contactNumber, contactEmail, zip})
    }
}



