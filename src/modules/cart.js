const CURRENT_ADDED = "CURRENT_ADDED";

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
        case CURRENT_ADDED: {
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
    }
}

