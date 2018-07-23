import axios from "axios";

const CURRENT_ADDED = "CURRENT_ADDED";
const CURRENT_ADDED_FULLFILLED = "CURRENT_ADDED_FULLFILLED";


export const initialState = {
    addCart:{
        name: 'Test product',
        merchant: 'Test Merchant',
        availableProducts: '30pck / 3000lbs',
        packageSize: '100 lbs',
        quantity: [
            {
                name: '20pcks / $3200',
                count: 20,
                price: 3200,
                id: 1,
            },
            {
                name: '30pcks / $2500',
                count: 30,
                price: 2500,
                id: 2,
            }
        ]
    }
    
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case CURRENT_ADDED_FULLFILLED: {
            return {
                ...state,
            }
        }
        default: {
            return state
        }
    }
}

export function getCurrentAdded() {
    return {
        type: CURRENT_ADDED,
        action: axios.get("/api/v1/product-offers/1/")
    }
}



