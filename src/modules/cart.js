const CURRENT_ADDED = "CURRENT_ADDED";
const CURRENT_ADDED_FULFILLED = "CURRENT_ADDED_FULFILLED";

export const initialState = {
    addCart:{
        name: '',
        merchant: '',
        availableProducts: '',
        packageSize: '',
        quantity: []
    }

};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case CURRENT_ADDED_FULFILLED: {
            return {
                ...state,
                addCart: action.payload
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
        payload: Promise.resolve({
            
                name: 'Isopropyl Alcohol',
                merchant: 'ABC Chemical',
                availableProducts: '60 pck / 3000 lbs',
                packageSize: '50 lbs',
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
        })
    }
}



