const RESET_TAGS = "RESET_TAGS";
const TOGGLE_FILTER = "TOGGLE_FILTER";
const TOGGLE_FILTER_GROUP = 'TOGGLE_FILTER_GROUP';
const ADD_FILTER_TAG = 'ADD_FILTER_TAG';
const CLOSE_FILTER_TAG = 'CLOSE_FILTER_TAG';
const CLOSE_FILTER_TAG_FULFILLED = 'CLOSE_FILTER_TAG_FULFILLED';

export const initialState = {
    isOpen: false,
    data: {},
    filterGroup: {
        chemName: true,
        quantity: true,
        price: true,
        packaging: false,
        chemSearch: false,
        productAge: false,
        location: false,
        date: false,
        condition: false,
        form: false
    },
    filterTags: []
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
        case ADD_FILTER_TAG: {
            return {
                ...state,
                filterTags: action.payload
            }
        }
        case CLOSE_FILTER_TAG_FULFILLED: {
            return {
                ...state,
                filterTags: [...state.filterTags.slice(0,action.payload), ...state.filterTags.slice(action.payload+1)]
            }
        }
        case RESET_TAGS: {
            return {
                ...state,
                filterTags: []
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
export function addFilterTag(data) {
    return {
        type: ADD_FILTER_TAG,
        payload: data
    }
}
export function closeFilterTag(index) {
    return {
        type: CLOSE_FILTER_TAG,
        payload: Promise.resolve(index)
    }
}

export function resetFilterTags(){
    return {
        type: RESET_TAGS
    }
}



