import '../utils/constants';

const TOGGLE_FILTER = "TOGGLE_FILTER";
const TOGGLE_FILTER_GROUP = 'TOGGLE_FILTER_GROUP';

export const initialState = {
    isOpen: false,
    data: {},
    filterGroup: {
        chemName: false,
        quantity: false,
        price: false,
        packaging: false
    }
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_FILTER: {
            return {
                ...state,
                isOpen: !state.isOpen
            }
        }
        case TOGGLE_FILTER_GROUP: {
            return {
                ...state,
                filterGroup: {
                    ...state.filterGroup,
                    [action.payload.name]: action.payload.value
                }
            }
        }

        default: {
            return state
        }
    }
}

export function toggleFilter() {
    return {
        type: TOGGLE_FILTER,
    }
}

export function toggleFilterGroup(name, value) {
    return {
        type: TOGGLE_FILTER_GROUP,
        payload: {name, value}
    }
}



