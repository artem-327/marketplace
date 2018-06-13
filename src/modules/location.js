import axios from "axios";

const ADD_LOCATION = 'ADD_LOCATION';
const ADD_LOCATION_PENDING = 'ADD_LOCATION_PENDING';
const ADD_LOCATION_FULFILLED = 'ADD_LOCATION_FULFILLED';
const ADD_LOCATION_REJECTED = 'ADD_LOCATION_REJECTED';


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



