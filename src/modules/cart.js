import axios from "axios";

const CURRENT_ADDED = "CURRENT_ADDED";
const CURRENT_ADDED_FULFILLED = "CURRENT_ADDED_FULFILLED";

export const initialState = {
    addCart:{
        id: null,
        product: {
            id: null,
            primaryName: ""
        },
        manufacturer: {
            name: ""
        },
        packageAmount: "",
        location: {
            id: null,
            country: "",
            state: ""
        }
    }
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case CURRENT_ADDED_FULFILLED: {
            return {
                ...state,
                addCart: action.payload.data.data
            }
        }
        default: {
            return state
        }
    }
}

export function getCurrentAdded(id) {
    return {
        type: CURRENT_ADDED,
        payload: axios.get("/api/v1/product-offers/"+id+"/")
    }
}
